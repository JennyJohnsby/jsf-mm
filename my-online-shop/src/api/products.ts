// src/api/products.ts
import type { Product } from "../types/productTypes";

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://api.noroff.dev/api/v1/online-shop");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }
  return response.json();
};
