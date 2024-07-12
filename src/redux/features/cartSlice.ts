import { TProduct } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TCartItem = TProduct & { quantity: number };

type TInitialState = {
  cart: TCartItem[];
};

const initialState: TInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TProduct>) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingProductIndex >= 0) {
        // Ensure quantity does not exceed stock
        if (state.cart[existingProductIndex].quantity < action.payload.stock) {
          state.cart[existingProductIndex].quantity += 1;
        }
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    decreaseStock: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const product = state.cart.find((item) => item._id === action.payload.id);
      if (product) {
        product.stock -= action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  decreaseStock,
  clearCart,

  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
