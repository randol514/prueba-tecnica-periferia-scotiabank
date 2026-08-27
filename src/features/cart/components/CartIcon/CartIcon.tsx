import type { MouseEventHandler } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import styles from "./cart-icon.module.sass";

interface CartIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

export const CartIcon = ({ onClick, isOpen }: CartIconProps) => {
  const { cartCount } = useCart();

  const cartLabel = isOpen ? "Cerrar carrito" : "Abrir carrito";

  return (
    <button
      type="button"
      className={styles["cart-icon"]}
      onClick={onClick}
      aria-label={`${cartLabel}. ${cartCount} ${
        cartCount === 1 ? "producto" : "productos"
      }`}
      aria-expanded={isOpen}
      aria-controls="shopping-cart"
    >
      <ShoppingCart size={30} aria-hidden="true" />

      <span className={styles["cart-icon__count"]} aria-live="polite">
        {cartCount}
      </span>

      <span className={styles["cart-icon__text"]}>Ver carrito</span>
    </button>
  );
};
