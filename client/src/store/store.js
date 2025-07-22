import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import filtersReducer from "./features/products/filterSlice";
import { productApi } from "./features/products/productApi";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(productApi.middleware),
});

setupListeners(store.dispatch);
