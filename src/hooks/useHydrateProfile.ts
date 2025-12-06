"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile } from "@/store/profileSlice";

export default function useHydrateProfile() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.access);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token)); // refresh from API
    }
  }, [token, dispatch]);
}
