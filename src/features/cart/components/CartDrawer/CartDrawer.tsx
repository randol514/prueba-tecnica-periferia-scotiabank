import type { MouseEvent } from "react";
import clsx from "clsx";
import { CircleX, Delete } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../../products/types";
import CartSummary from "../CartSummary/CartSummary";

import "./cart-drawer.sass";
import { useDispatch } from "react-redux";
import { removeCart } from "../../store/cartSlice";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type CartItem = Product & {
  quantity: number;
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const dispatch = useDispatch();
  const { cartItems } = useCart();

  const handleDrawerClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleRemove = (productId: Product["id"]) => {
    dispatch(removeCart(productId));
  };

  return (
    <aside
      id="shopping-cart"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shopping-cart-title"
      aria-hidden={!isOpen}
      className={clsx("cart-drawer", isOpen && "cart-drawer--active")}
      onClick={handleDrawerClick}
    >
      <button
        type="button"
        className="cart-drawer__close"
        onClick={onClose}
        aria-label="Close shopping cart"
      >
        <CircleX size={20} aria-hidden="true" />
      </button>

      <div className="cart-drawer__content">
        <div className="cart-drawer__list">
          {cartItems.length > 0 ? (
            <div className="cart-list">
              {(cartItems as CartItem[]).map((product) => (
                <div key={product.id} className="cart-drawer-item">
                  <div className="cart-drawer-item__title">
                    {product.title} ({product.quantity})
                  </div>
                  <button
                    type="button"
                    className="cart-drawer-item__delete"
                    onClick={() => handleRemove(product.id)}
                    aria-label={`Eliminar ${product.title} del carrito`}
                  >
                    <Delete size={20} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-list__none">
              <p>No hay productos</p>
            </div>
          )}
        </div>

        <div className="cart-drawer__summary">
          <CartSummary />
        </div>
      </div>
    </aside>
  );
};

export default CartDrawer;
