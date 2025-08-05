import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/product",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filters) => {
        // Create a new URLSearchParams object
        const params = new URLSearchParams();
        // Add only non-empty filters to the query parameters
        for (const key in filters) {
          if (filters[key]) {
            params.append(key, filters[key]);
          }
        }
        // Construct the full URL
        return {
          url: `?${params.toString()}`, // Use the correct base path
        };
      },
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
