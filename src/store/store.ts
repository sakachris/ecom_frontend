// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filtersReducer from "./filtersSlice";
import profileReducer from "./profileSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./authSlice";
// import { profile } from "console";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
