import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile, ProfileResponse } from "@/lib/userApi";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (token: string) => {
    const res = await getProfile(token);

    // ⭐ Save to localStorage for instant reload later
    localStorage.setItem("user_profile", JSON.stringify(res));

    return res;
  }
);

export const patchProfile = createAsyncThunk(
  "profile/patchProfile",
  async (payload: {
    token: string;
    data: Partial<
      Pick<ProfileResponse, "first_name" | "last_name" | "phone_number">
    >;
  }) => {
    const res = await updateProfile(payload.token, payload.data);

    // ⭐ Save updated profile to localStorage
    localStorage.setItem("user_profile", JSON.stringify(res));

    return res;
  }
);

// export const fetchProfile = createAsyncThunk(
//   "profile/fetchProfile",
//   async (accessToken: string) => {
//     return await getProfile(accessToken);
//   }
// );

const saved =
  typeof window !== "undefined" ? localStorage.getItem("user_profile") : null;

interface ProfileState {
  data: ProfileResponse | null;
  loading: boolean;
  error: string | null;
}

// const initialState: ProfileState = {
//   data: null,
//   loading: false,
//   error: null,
// };

const initialState: ProfileState = {
  data: saved ? JSON.parse(saved) : null, // ⭐ hydrate redux from localStorage
  loading: false,
  error: null as string | null,
};

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     clearProfile: (state) => {
//       state.data = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchProfile.rejected, (state) => {
//         state.loading = false;
//         state.error = "Failed to load profile";
//       });
//   },
// });

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("user_profile");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load profile";
      })
      .addCase(patchProfile.fulfilled, (state, action) => {
        state.data = action.payload; // update redux instantly
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
