// src/lib/apiClient.ts

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

// simple fetch wrapper (server-safe)
export async function fetchJson<T>(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error: ${res.status} ${res.statusText} ${text}`);
  }

  return (await res.json()) as T;
}

// REMOVING INIT
// export async function fetchJson<T>(url: string) {
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//     },
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`API Error: ${res.status} ${res.statusText} ${text}`);
//   }

//   return (await res.json()) as T;
// }

// export async function fetchJson<T>(url: string, init?: RequestInit) {
//   //   const res = await fetch(url, { cache: "no-store", ...init });
//   const res = await fetch(url, {
//     cache: "no-store",
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//     },
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`API Error: ${res.status} ${res.statusText} ${text}`);
//   }
//   return (await res.json()) as T;
// }
