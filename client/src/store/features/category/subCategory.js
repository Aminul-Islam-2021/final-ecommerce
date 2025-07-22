import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8001/api/category",
  }),
  tagTypes: ["SubCategory"],
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: ({ categoryId, name }) => ({
        url: `/${categoryId}/subcategory`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Subcategory", categoryId },
      ],
    }),
    getSubCategories: builder.query({
      query: ({ categoryId }) => `/${categoryId}/subcategory`,
      providesTags: (result, error, categoryId) => [
        { type: "Subcategory", id: categoryId },
      ],
    }),
    updateSubcategory: builder.mutation({
      query: ({ categoryId, name, id }) => ({
        url: `/${categoryId}/subcategory/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Subcategory", categoryId },
      ],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ categoryId, id }) => ({
        url: `/${categoryId}/subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Subcategory", categoryId },
      ],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubcategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
