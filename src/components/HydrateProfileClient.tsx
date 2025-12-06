"use client";

import useHydrateProfile from "@/hooks/useHydrateProfile";

export default function HydrateProfileClient() {
  useHydrateProfile(); // hook runs on startup in the browser
  return null; // nothing visible
}
