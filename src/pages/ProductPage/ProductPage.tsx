import "./product-page.sass";

import { ProductFilter } from "../../features/products/components/ProductFilter";
import { ProductList } from "../../features/products/components/ProductList";
import { ProductSearch } from "../../features/products/components/ProductSearch";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { CartIcon } from "../../features/cart/components/CartIcon";
import CartDrawer from "../../features/cart/components/CartDrawer/CartDrawer";
import { getProducts } from "../../features/products/services/products.service";
import type { Product } from "../../features/products/types";

export const ProductPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setProducts(getProducts());
      setIsLoading(false);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          selectedCategory === "Todos" || product.category === selectedCategory;

        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());

        return matchesCategory && matchesSearch;
      }),
    [products, selectedCategory, searchTerm],
  );
  //cart
  const toggleCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsCartOpen((previous) => !previous);
  };

  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    if (!isCartOpen) return;
    document.addEventListener("click", closeCart);
    return () => document.removeEventListener("click", closeCart);
  }, [isCartOpen]);

  return (
    <>
      <div className="product-page">
        <div className="product-page__container site-container">
          <div className="product-page__content">
            <div className="product-page__header">
              <div className="product-page__title">
                <h1>Products</h1>
              </div>
              <CartIcon onClick={toggleCart} isOpen={isCartOpen} />
              <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
            </div>
            <div className="product-page__filters">
              <ProductFilter
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
              <ProductSearch value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className="product-page__body">
              {isLoading ? (
                <p role="status">Cargando productos...</p>
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
