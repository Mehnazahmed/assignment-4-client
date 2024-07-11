// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getPlantsCategories: builder.query({
      query: () => ({
        method: "GET",
        url: "/categories",
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        method: "GET",
        url: "/products",
      }),
    }),
    getProductsById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/products/${id}`,
      }),
    }),
    getProductsByCategoryName: builder.query({
      query: (category) => ({
        method: "GET",
        url: `/products/category/${category}`,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/products/create-product",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        console.log(data);
        return {
          url: `/products/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetPlantsCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryNameQuery,
  useGetProductsByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = baseApi;
