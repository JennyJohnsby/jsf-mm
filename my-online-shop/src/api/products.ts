// src/api/products.ts
import type { Product } from "../types/productTypes";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://api.noroff.dev/api/v1/online-shop");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
