// src/store/filtersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  search?: string;
  sort?: string;
  page?: number;
}

const initialState: FiltersState = {
  category: undefined,
  brand: undefined,
  min_price: undefined,
  max_price: undefined,
  rating: undefined,
  search: undefined,
  sort: undefined,
  page: 1,
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<FiltersState>>) {
      return { ...state, ...action.payload, page: 1 }; // reset page on filter change
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilter, setPage, resetFilters } = slice.actions;
export default slice.reducer;
