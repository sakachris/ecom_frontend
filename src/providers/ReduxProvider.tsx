// src/providers/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import React, { useEffect } from "react";
import { loadFromStorage } from "@/store/authSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // load tokens from localStorage into slice on client start
    store.dispatch(loadFromStorage());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
