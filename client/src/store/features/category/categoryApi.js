import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/category",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    getCategories: builder.query({
      query: () => "/",
      providesTags: (result) => {
        // First check if result exists and has the expected structure
        if (result && Array.isArray(result.categories)) {
          return [
            ...result.categories.map(({ _id }) => ({
              type: "Category",
              id: _id,
            })),
            { type: "Category", id: "LIST" },
          ];
        }
        // Default fallback
        return [{ type: "Category", id: "LIST" }];
      },
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
