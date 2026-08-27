import { memo } from "react";
import AddToCartButton from "../../../cart/components/AddToCartButton/AddToCartButton";
import type { ProductCardProps } from "./ProductCard.types";
import "./product-card.sass";

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { image, title, category, price } = product;

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img
          src={image}
          alt={title}
          width="474"
          height="527"
          className="product-card__image-img"
          loading="lazy"
        />
      </div>

      <div className="product-card__content">
        <span className="product-card__category">{category}</span>
        <h3 className="product-card__title">{title}</h3>
        <span className="product-card__price">${price.toFixed(2)}</span>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
});
