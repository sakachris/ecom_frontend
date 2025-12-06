// src/lib/apiClient.ts

import { refreshAccessToken } from "./authApi";
import { store } from "@/store/store";
import { setTokens, logout } from "@/store/authSlice";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export function buildUrl(
  path: string,
  params?: Record<string, string | number | undefined>
) {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== "")
        url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

// simple fetch wrapper
// export async function fetchJson<T>(url: string, init?: RequestInit) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//       ...(init?.headers ?? {}),
//     },
//     ...init,
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`API Error: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as T;
// }

// NEW fetchJson with auto-refresh middleware
// export async function fetchJson<T>(
//   url: string,
//   init?: RequestInit,
//   retry = true
// ) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//       ...(init?.headers ?? {}),
//     },
//     ...init,
//   });

//   // If Unauthorized AND we haven't retried yet
//   if (res.status === 401 && retry) {
//     const state = store.getState();
//     const refreshToken = state.auth.refreshToken;

//     if (!refreshToken) {
//       store.dispatch(logout());
//       throw new Error("No refresh token available");
//     }

//     try {
//       // 1. refresh token
//       const refreshData = await refreshAccessToken(refreshToken);

//       // 2. update Redux + localStorage
//       store.dispatch(
//         setTokens({
//           accessToken: refreshData.access,
//           refreshToken,
//         })
//       );

//       // 3. retry the original request with new access token
//       const newInit = {
//         ...init,
//         headers: {
//           ...(init?.headers || {}),
//           Authorization: `Bearer ${refreshData.access}`,
//         },
//       };

//       return await fetchJson<T>(url, newInit, false);
//     } catch (err) {
//       // refresh token also expired → log user out
//       store.dispatch(logout());
//       throw new Error("Session expired. Please log in again.");
//     }
//   }

//   // If still error, throw default
//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`API Error: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as T;
// }
// NEW fetchJson with auto-refresh middleware
export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
  retry = true
) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  // if Unauthorized AND we haven't retried yet
  if (res.status === 401 && retry) {
    const state = store.getState();
    const refreshToken = state.auth.refresh; // FIXED

    if (!refreshToken) {
      store.dispatch(logout());
      throw new Error("No refresh token available");
    }

    try {
      // 1. refresh token
      const refreshData = await refreshAccessToken(refreshToken);

      // 2. update Redux + localStorage
      store.dispatch(
        setTokens({
          access: refreshData.access, // FIXED
          refresh: refreshToken, // FIXED
        })
      );

      // 3. retry original request with new access token
      const newInit = {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${refreshData.access}`,
        },
      };

      return await fetchJson<T>(url, newInit, false);
    } catch {
      store.dispatch(logout());
      throw new Error("Session expired. Please log in again.");
    }

    // } catch (_err) {
    //   store.dispatch(logout());
    //   throw new Error("Session expired. Please log in again.");
    // }
  }

  // If still error after retry
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as T;
}
