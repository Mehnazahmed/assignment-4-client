import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://y-blond-nine.vercel.app",
  }),
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
    addProduct: builder.mutation({
      query: (data) => {
        // console.log(data);
        return {
          url: "/products/create-product",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => {
        // console.log(rest);
        return {
          url: `/products/${id}`,
          method: "PUT",
          body: rest,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
    }),
    createOrder: builder.mutation({
      query: (order) => {
        return {
          url: "/order",
          method: "POST",
          body: order,
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
  useAddProductMutation,
  useUpdateProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
} = baseApi;
