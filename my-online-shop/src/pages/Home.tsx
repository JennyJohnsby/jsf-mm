// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/productTypes";
import Header from "../components/layout/Header"; // Import the Header component
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard"; // Import the new ProductCard component

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: unknown) {
        console.error("Error fetching products:", err);
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-purple-100">
      <Header />
    
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> // Use the ProductCard component
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
