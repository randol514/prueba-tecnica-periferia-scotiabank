import { useCart } from "../../hooks/useCart";
import "./cart-summary.sass";

const CartSummary = () => {
  const { cartItems, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <div className="cart-summary__list">
        <div className="cart-summary__list-item">
          <span>Products ({cartCount})</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <div className="cart-summary__list-item">
          <strong>Total</strong>
          <strong>${cartTotal.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
