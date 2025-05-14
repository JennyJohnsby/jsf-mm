import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/productTypes";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, imageUrl, title, price, discountedPrice, rating } = product;
  const hasDiscount = discountedPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  return (
    <Link
      to={`/product/${id}`}
      className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white hover:bg-purple-50 transform hover:scale-105"
    >
      {/* Product Image */}
      <div className="relative group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 hover:text-purple-600 transition-colors">
          {title}
        </h2>

        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-800 text-base font-medium">
            ${discountedPrice.toFixed(2)}
            {hasDiscount && (
              <span className="ml-2 text-sm line-through text-red-500">
                ${price.toFixed(2)}
              </span>
            )}
          </p>

          {/* Rating */}
          <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < Math.round(rating) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
