import React, { useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import { toast } from "react-toastify"; // For notifications
import Header from "../components/layout/Header"; // Assuming you have this in your components folder
import Footer from "../components/layout/Footer"; // Assuming you have this in your components folder
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, getCartTotal, updateQuantity } = useCartStore();
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation
  
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }
    updateQuantity(id, quantity);
  };

  // Handle the checkout button click
  const handleCheckout = () => {
    // Create order summary (you can add more fields like shipping, etc. as needed)
    const orderDetails = {
      orderId: `ORD-${new Date().getTime()}`,
      date: new Date().toISOString(),
      totalAmount: getCartTotal(),
      items: cart.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        discountedPrice: item.discountedPrice,
      })),
    };

    // Navigate to the CheckoutSuccess page and pass order details
    navigate("/checkout-success", { state: { orderDetails } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Cart Content */}
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center">
            <p>Your cart is empty.</p>
            <a href="/" className="text-blue-500 underline mt-4">
              Go back to shopping
            </a>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={handleQuantityChange}
                />
              ))}
            </ul>

            {/* Cart Total */}
            <p className="mt-6 text-xl font-semibold">
              Total: ${getCartTotal().toFixed(2)}
            </p>

            {/* Clear Cart Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={clearCart}
              aria-label="Clear all items from cart"
            >
              Clear Cart
            </button>

            {/* Checkout Button */}
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleCheckout}
              aria-label="Proceed to Checkout"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// CartItem Component
interface CartItemProps {
  item: {
    id: string;
    title: string;
    discountedPrice: number;
    quantity: number;
  };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeFromCart, updateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityUpdate = (newQuantity: number) => {
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <li className="flex justify-between items-center">
      <span className="text-lg">{item.title}</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityUpdate(quantity - 1)}
            disabled={quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            aria-label={`Decrease quantity of ${item.title}`}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantityUpdate(quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>
        <span>
          ${item.discountedPrice.toFixed(2)} x {quantity}
        </span>
        <button
          className="text-red-600 hover:text-red-700"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.title} from cart`}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartPage;
