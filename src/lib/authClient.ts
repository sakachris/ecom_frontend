// src/lib/authClient.ts
import { buildUrl } from "./apiClient";

type TokenResponse = {
  access: string;
  refresh?: string;
};

const LOGIN_PATH = "/auth/token/";
const REFRESH_PATH = "/auth/token/refresh/";
const REGISTER_PATH = "/auth/register/";
const RESEND_EMAIL_PATH = "/auth/resend-email/";
const VERIFY_EMAIL_PATH = "/auth/verify-email/";

// localStorage keys
const ACCESS_KEY = "ecom_access";
const REFRESH_KEY = "ecom_refresh";
const USER_EMAIL_KEY = "ecom_user_email";
const USER_FIRST_NAME_KEY = "ecom_user_first_name";
const USER_LAST_NAME_KEY = "ecom_user_last_name";

/** -----------------------------
 * LOGIN
 * ------------------------------*/
// export async function loginApi(
//   email: string,
//   password: string
// ): Promise<TokenResponse> {
//   const url = buildUrl(LOGIN_PATH);
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Login failed: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as TokenResponse;
// }
export async function loginApi(
  email: string,
  password: string
): Promise<TokenResponse> {
  const url = buildUrl(LOGIN_PATH);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errorJson: any = null;

    try {
      errorJson = await res.json();
    } catch {
      throw { detail: "Login failed. Unexpected server error." };
    }

    throw errorJson; // Throw usable JSON
  }

  return (await res.json()) as TokenResponse;
}

/** -----------------------------
 * REFRESH TOKEN
 * ------------------------------*/
export async function refreshApi(refresh: string): Promise<{ access: string }> {
  const url = buildUrl(REFRESH_PATH);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Refresh failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as { access: string };
}

/** -----------------------------
 * REGISTER (SIGN UP)
 * endpoint: /auth/register/
 * ------------------------------*/
export async function registerApi(data: {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  password: string;
}): Promise<{ detail: string }> {
  const url = buildUrl(REGISTER_PATH);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Register failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as { detail: string };
}

/** -----------------------------
 * VERIFY EMAIL
 * endpoint: /auth/verify-email/?token=123
 * BEST approach: GET
 * ------------------------------*/
export async function verifyEmailApi(
  token: string
): Promise<{ detail: string }> {
  const url = buildUrl(
    `${VERIFY_EMAIL_PATH}?token=${encodeURIComponent(token)}`
  );

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Verify failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as { detail: string };
}

/** -----------------------------
 * RESEND EMAIL VERIFICATION
 * endpoint: /auth/resend-email/
 * ------------------------------*/
export async function resendVerificationEmailApi(
  email: string
): Promise<{ detail: string }> {
  const url = buildUrl(RESEND_EMAIL_PATH);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as { detail: string };
}

/** -----------------------------
 * STORAGE HELPERS
 * ------------------------------*/
export function saveTokens(
  access?: string,
  refresh?: string,
  email?: string,
  first_name?: string,
  last_name?: string
) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  if (email) localStorage.setItem(USER_EMAIL_KEY, email);
  if (first_name) localStorage.setItem(USER_FIRST_NAME_KEY, first_name);
  if (last_name) localStorage.setItem(USER_LAST_NAME_KEY, last_name);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(USER_FIRST_NAME_KEY);
  localStorage.removeItem(USER_LAST_NAME_KEY);
}

export function getAccessToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem(ACCESS_KEY)
    : null;
}

/** -----------------------------
 * AUTH FETCH WRAPPER
 * ------------------------------*/
export async function authFetch(input: RequestInfo, init?: RequestInit) {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0",
    "Content-Type": "application/json",
    ...(init && (init.headers as Record<string, string>)),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(input, { ...init, headers });
}

// // src/lib/authClient.ts
// import { buildUrl } from "./apiClient";

// type TokenResponse = {
//   access: string;
//   refresh?: string;
// };

// const LOGIN_PATH = "/auth/token/";
// const REFRESH_PATH = "/auth/token/refresh/";
// const REGISTER_PATH = "/auth/register/";
// const RESEND_EMAIL_PATH = "/auth/resend-email/";

// // localStorage keys
// const ACCESS_KEY = "ecom_access";
// const REFRESH_KEY = "ecom_refresh";
// const USER_EMAIL_KEY = "ecom_user_email";

// /** -----------------------------
//  * LOGIN
//  * ------------------------------*/
// export async function loginApi(
//   email: string,
//   password: string
// ): Promise<TokenResponse> {
//   const url = buildUrl(LOGIN_PATH);
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Login failed: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as TokenResponse;
// }

// /** -----------------------------
//  * REFRESH TOKEN
//  * ------------------------------*/
// export async function refreshApi(refresh: string): Promise<{ access: string }> {
//   const url = buildUrl(REFRESH_PATH);
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refresh }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Refresh failed: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as { access: string };
// }

// /** -----------------------------
//  * REGISTER (SIGN UP)
//  * endpoint: /auth/register/
//  * ------------------------------*/
// export async function registerApi(data: {
//   email: string;
//   first_name: string;
//   last_name: string;
//   phone_number?: string | null;
//   password: string;
// }): Promise<{ detail: string }> {
//   const url = buildUrl(REGISTER_PATH);

//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Register failed: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as { detail: string };
// }

// /** -----------------------------
//  * RESEND EMAIL VERIFICATION
//  * endpoint: /auth/resend-email/
//  * ------------------------------*/
// export async function resendVerificationEmailApi(
//   email: string
// ): Promise<{ detail: string }> {
//   const url = buildUrl(RESEND_EMAIL_PATH);

//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Resend failed: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as { detail: string };
// }

// /** -----------------------------
//  * STORAGE HELPERS
//  * ------------------------------*/
// export function saveTokens(access?: string, refresh?: string, email?: string) {
//   if (access) localStorage.setItem(ACCESS_KEY, access);
//   if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
//   if (email) localStorage.setItem(USER_EMAIL_KEY, email);
// }

// export function clearTokens() {
//   localStorage.removeItem(ACCESS_KEY);
//   localStorage.removeItem(REFRESH_KEY);
//   localStorage.removeItem(USER_EMAIL_KEY);
// }

// export function getAccessToken() {
//   return typeof window !== "undefined"
//     ? localStorage.getItem(ACCESS_KEY)
//     : null;
// }

// /** -----------------------------
//  * AUTH FETCH WRAPPER
//  * ------------------------------*/
// export async function authFetch(input: RequestInfo, init?: RequestInit) {
//   const token = getAccessToken();
//   const headers: Record<string, string> = {
//     "User-Agent": "Mozilla/5.0",
//     "Content-Type": "application/json",
//     ...(init && (init.headers as Record<string, string>)),
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   return fetch(input, { ...init, headers });
// }

// // src/lib/authClient.ts
// import { buildUrl } from "./apiClient";

// type TokenResponse = {
//   access: string;
//   refresh?: string;
// };

// const TOKEN_PATH = "/auth/token/";
// const REFRESH_PATH = "/auth/token/refresh/";

// // localStorage keys
// const ACCESS_KEY = "ecom_access";
// const REFRESH_KEY = "ecom_refresh";
// const USER_EMAIL_KEY = "ecom_user_email";

// /** Perform login — returns tokens if successful */
// export async function loginApi(
//   email: string,
//   password: string
// ): Promise<TokenResponse> {
//   const url = buildUrl(TOKEN_PATH);
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Login failed: ${res.status} ${res.statusText} ${text}`);
//   }
//   return (await res.json()) as TokenResponse;
// }

// /** Refresh access token using refresh token */
// export async function refreshApi(refresh: string): Promise<{ access: string }> {
//   const url = buildUrl(REFRESH_PATH);
//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refresh }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`Refresh failed: ${res.status} ${res.statusText} ${text}`);
//   }
//   return (await res.json()) as { access: string };
// }

// /** Save tokens to localStorage */
// export function saveTokens(access?: string, refresh?: string, email?: string) {
//   if (access) localStorage.setItem(ACCESS_KEY, access);
//   if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
//   if (email) localStorage.setItem(USER_EMAIL_KEY, email);
// }

// /** Clear tokens */
// export function clearTokens() {
//   localStorage.removeItem(ACCESS_KEY);
//   localStorage.removeItem(REFRESH_KEY);
//   localStorage.removeItem(USER_EMAIL_KEY);
// }

// /** Get current access token */
// export function getAccessToken() {
//   return typeof window !== "undefined"
//     ? localStorage.getItem(ACCESS_KEY)
//     : null;
// }

// /** Auth-aware fetch — automatically adds Authorization header if access token present */
// export async function authFetch(input: RequestInfo, init?: RequestInit) {
//   const token = getAccessToken();
//   const headers: Record<string, string> = {
//     "User-Agent": "Mozilla/5.0",
//     "Content-Type": "application/json",
//     ...(init && (init.headers as Record<string, string>)),
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   return fetch(input, { ...init, headers });
// }
