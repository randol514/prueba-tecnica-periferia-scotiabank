import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../products/types";
import type { RootState } from "../../../app/store/store";

export type CartItem = Product & {
  quantity: number;
};

interface CartState {
  cartItems: CartItem[];
}

const loadCartFromStorage = (): CartItem[] => {
  try {
    const persistedState = localStorage.getItem("cart_items");
    return persistedState ? (JSON.parse(persistedState) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  localStorage.setItem("cart_items", JSON.stringify(items));
};

const initialState: CartState = {
  cartItems: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      saveCartToStorage(state.cartItems);
    },

    removeCart: (state, action) => {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== productId);

      saveCartToStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart_items");
    },
  },
});

export const selectCartTotal = (state: RootState) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const selectCartCount = (state: RootState) =>
  state.cart.cartItems.reduce((count, item) => count + item.quantity, 0);

export const { addToCart, removeCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
