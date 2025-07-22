import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { productApi } from "./features/products/productApi";
import { categoryApi } from "./features/category/categoryApi";
import { subCategoryApi } from "./features/category/subCategoryApi";
import cartReducer from "./features/cart/cartSlice";
import filtersReducer from "./features/products/filterSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(subCategoryApi.middleware),
});

setupListeners(store.dispatch);
