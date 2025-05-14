import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getProducts } from "../api/products";
import type { Product } from "../types/productTypes";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/layout/ProductCard";
import { useCartStore } from "../hooks/useCartStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const toastRef = useRef<boolean>(false); // Track if the toast has been shown

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) {
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      try {
        const [productData, allProducts] = await Promise.all([
          getProductById(id),
          getProducts(),
        ]);
        setProduct(productData);
        setRelatedProducts(allProducts.filter((p) => p.id !== id).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      if (!toastRef.current) {
        toast.success("Product added to cart!");
        toastRef.current = true; // Set the ref to true to prevent duplicate notifications
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-semibold">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto p-6 flex-grow">
        {/* Product Details */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md"
          />

          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-gray-800">
                ${product.discountedPrice}
              </span>
              {product.discountedPrice < product.price && (
                <span className="line-through text-red-500">
                  ${product.price}
                </span>
              )}
            </div>

            <p className="text-yellow-600 text-lg mb-6">⭐ {product.rating}</p>

            <button
              onClick={handleAddToCart}
              className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              aria-label="Add product to cart"
            >
              Add to Cart
            </button>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg bg-white"
                >
                  <p className="font-semibold text-gray-800">
                    {review.author}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-yellow-600 mt-2">⭐ {review.rating}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </section>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductPage;
