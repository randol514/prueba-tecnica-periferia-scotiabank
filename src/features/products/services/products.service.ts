import type { Product } from "../types";
import productsData from "../data/products.json";

export const getProducts = (): Product[] => {
  return productsData;
};
