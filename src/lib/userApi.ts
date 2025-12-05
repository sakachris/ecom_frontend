// src/lib/userApi.ts
import { buildUrl, fetchJson } from "./apiClient";

export type ProfileResponse = {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  role: string;
  created_at: string;
};

// GET profile
export async function getProfile(accessToken: string) {
  const url = buildUrl("/auth/profile/");
  return await fetchJson<ProfileResponse>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// UPDATE profile (PATCH)
export async function updateProfile(
  accessToken: string,
  data: Partial<
    Pick<ProfileResponse, "first_name" | "last_name" | "phone_number">
  >
) {
  const url = buildUrl("/auth/profile/");
  return await fetchJson<ProfileResponse>(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// DELETE account
export async function deleteAccount(accessToken: string) {
  const url = buildUrl("/auth/profile/");
  return await fetchJson(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
