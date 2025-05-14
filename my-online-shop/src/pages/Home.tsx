import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/productTypes";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

        {loading && (
          <div className="text-center text-lg font-medium text-gray-700">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="hover:opacity-90 transition-opacity duration-200"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
