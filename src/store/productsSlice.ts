// src/store/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Meta } from "@/lib/types";

interface ProductsState {
  items: Product[];
  meta?: Meta;
  loading: boolean;
  error?: string | null;
}

const initialState: ProductsState = {
  items: [],
  meta: undefined,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(
      state,
      action: PayloadAction<{ items: Product[]; meta?: Meta }>
    ) {
      state.items = action.payload.items;
      state.meta = action.payload.meta;
      state.loading = false;
      state.error = null;
    },
    appendProducts(
      state,
      action: PayloadAction<{ items: Product[]; meta?: Meta }>
    ) {
      state.items = [...state.items, ...action.payload.items];
      state.meta = action.payload.meta;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearProducts(state) {
      state.items = [];
      state.meta = undefined;
    },
  },
});

export const {
  setProducts,
  appendProducts,
  setLoading,
  setError,
  clearProducts,
} = slice.actions;
export default slice.reducer;
