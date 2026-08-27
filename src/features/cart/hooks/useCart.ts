import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store/store";
import {
  clearCart,
  selectCartTotal,
  selectCartCount,
} from "../store/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartTotal = useSelector((state: RootState) => selectCartTotal(state));
  const cartCount = useSelector((state: RootState) => selectCartCount(state));

  const handleClearCart = () => dispatch(clearCart());

  return {
    cartItems,
    cartTotal,
    cartCount,
    clearCart: handleClearCart,
  };
};
