import { TProduct } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  products: TProduct[];
};

const initialState: TInitialState = {
  products: [],
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<TProduct>) => {
      state.products.push({ ...action.payload, isDeleted: false });
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { createProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
