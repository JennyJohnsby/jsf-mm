import React from "react";
import type { Product } from "../types/productTypes";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-white hover:bg-purple-50 transform hover:scale-105"
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-64 object-cover rounded-t-lg mb-4"
      />
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-lg font-medium text-gray-600 mb-2">
          ${product.discountedPrice}{" "}
          {product.discountedPrice < product.price && (
            <span className="line-through text-sm text-red-500 ml-2">
              ${product.price}
            </span>
          )}
        </p>
        <p className="text-yellow-600 text-sm flex items-center">
          ⭐ {product.rating}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
