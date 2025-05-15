import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/productTypes";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard";
import SearchBar from "../components/layout/SearchBar";
import Sorting from "../components/layout/Sorting"; // ✅ Import Sorting
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // ✅ Sorting state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = (query: string, order: "asc" | "desc") => {
    let updated = [...products];

    // Filter by search
    if (query) {
      updated = updated.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort by price
    updated.sort((a, b) =>
      order === "asc"
        ? a.discountedPrice - b.discountedPrice
        : b.discountedPrice - a.discountedPrice
    );

    setFilteredProducts(updated);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, sortOrder); // ✅ Apply filtering with current sort order
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    applyFilters(searchQuery, order); // ✅ Apply filtering with current search
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">All Products</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <Sorting sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>

        {loading && (
          <div className="text-center text-lg font-medium text-gray-700">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center text-gray-700">
            No products found for "{searchQuery}"
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
