// src/store/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  refreshApi,
  registerApi,
  verifyEmailApi,
  resendVerificationEmailApi,
  saveTokens,
  clearTokens,
} from "@/lib/authClient";

type AuthState = {
  access?: string | null;
  refresh?: string | null;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;

  isAuthenticated: boolean;

  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;

  registerStatus: "idle" | "loading" | "succeeded" | "failed";
  registerMessage?: string | null;

  verifyStatus: "idle" | "loading" | "succeeded" | "failed";
  verifyMessage?: string | null;

  resendStatus: "idle" | "loading" | "succeeded" | "failed";
  resendMessage?: string | null;
};

const initialState: AuthState = {
  access: null,
  refresh: null,
  email: null,
  first_name: null,
  last_name: null,

  isAuthenticated: false,

  status: "idle",
  error: null,

  registerStatus: "idle",
  registerMessage: null,

  verifyStatus: "idle",
  verifyMessage: null,

  resendStatus: "idle",
  resendMessage: null,
};

/* ------------------------------------
 * LOGIN
 * -----------------------------------*/
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const tokens = await loginApi(email, password);
      saveTokens(
        tokens.access,
        tokens.refresh,
        email,
        tokens.first_name,
        tokens.last_name
      );
      return { ...tokens, email };
    } catch (err: any) {
      return rejectWithValue(err); // Keep JSON
    }
  }
);

/* ------------------------------------
 * REFRESH TOKEN
 * -----------------------------------*/
export const refreshAccess = createAsyncThunk(
  "auth/refreshAccess",
  async ({ refresh }: { refresh: string }, { rejectWithValue }) => {
    try {
      const res = await refreshApi(refresh);
      saveTokens(res.access, refresh);
      return { access: res.access };
    } catch (err: any) {
      clearTokens();
      return rejectWithValue(err.message || "Refresh failed");
    }
  }
);

/* ------------------------------------
 * REGISTER USER
 * -----------------------------------*/
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await registerApi(payload);
      return res.detail;
    } catch (err: any) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

/* ------------------------------------
 * VERIFY EMAIL
 * (GET endpoint)
 * -----------------------------------*/
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await verifyEmailApi(token);
      return res.detail;
    } catch (err: any) {
      return rejectWithValue(err.message || "Email verification failed");
    }
  }
);

/* ------------------------------------
 * RESEND VERIFICATION EMAIL
 * -----------------------------------*/
export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await resendVerificationEmailApi(email);
      return res.detail;
    } catch (err: any) {
      return rejectWithValue(err.message || "Resend failed");
    }
  }
);

export const hydrateAuth = createAsyncThunk("auth/hydrate", async () => {
  return {
    access: localStorage.getItem("ecom_access"),
    refresh: localStorage.getItem("ecom_refresh"),
    email: localStorage.getItem("ecom_user_email"),
    first_name: localStorage.getItem("ecom_user_first_name"),
    last_name: localStorage.getItem("ecom_user_last_name"),
  };
});

/* ------------------------------------
 * SLICE
 * -----------------------------------*/
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadFromStorage(state) {
      if (typeof window === "undefined") return;
      state.access = localStorage.getItem("ecom_access");
      state.refresh = localStorage.getItem("ecom_refresh");
      state.email = localStorage.getItem("ecom_user_email");
      state.first_name = localStorage.getItem("ecom_user_first_name");
      state.last_name = localStorage.getItem("ecom_user_last_name");

      state.isAuthenticated = !!state.access;
    },
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.email = null;
      state.first_name = null;
      state.last_name = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },

  extraReducers: (builder) => {
    /* LOGIN */
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.access = action.payload.access;
        state.refresh = action.payload.refresh ?? null;
        state.email = action.payload.email ?? null;
        state.first_name = action.payload.first_name ?? null;
        state.last_name = action.payload.last_name ?? null;
        state.isAuthenticated = true;
      })
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        if (action.payload.access) {
          state.access = action.payload.access;
          state.refresh = action.payload.refresh;
          state.email = action.payload.email;
          state.first_name = action.payload.first_name;
          state.last_name = action.payload.last_name;

          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      });

    /* REFRESH */
    builder
      .addCase(refreshAccess.fulfilled, (state, action: PayloadAction<any>) => {
        state.access = action.payload.access;
      })
      .addCase(refreshAccess.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload ?? "Refresh failed";
      });

    /* REGISTER */
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
        state.registerMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.registerMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerMessage = action.payload as string;
      });

    /* VERIFY EMAIL */
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verifyStatus = "loading";
        state.verifyMessage = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyStatus = "succeeded";
        state.verifyMessage = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyStatus = "failed";
        state.verifyMessage = action.payload as string;
      });

    /* RESEND VERIFICATION */
    builder
      .addCase(resendVerification.pending, (state) => {
        state.resendStatus = "loading";
        state.resendMessage = null;
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.resendStatus = "succeeded";
        state.resendMessage = action.payload;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.resendStatus = "failed";
        state.resendMessage = action.payload as string;
      });
  },
});

export const { loadFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
