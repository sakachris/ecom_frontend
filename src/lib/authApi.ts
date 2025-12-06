import { buildUrl, fetchJson } from "./apiClient";

export async function refreshAccessToken(refreshToken: string) {
  const url = buildUrl("/auth/token/refresh/");
  return await fetchJson<{ access: string }>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
}
