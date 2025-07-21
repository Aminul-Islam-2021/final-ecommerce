// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  category: "",
  subcategory: "",
  minPrice: "",
  maxPrice: "",
  color: "",
  size: "",
  sort: "",
  page: 1,
  limit: 10,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      state.page = 1; // Reset page to 1 when keyword changes
    },
    setFilters: (state, action) => {
      return { ...state, ...action.payload, page: 1 }; // Reset page to 1 when filters change
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      return { ...initialState }; // Reset to initial state
    },
  },
});

export const { setKeyword, setFilters, setSort, setPage,resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
