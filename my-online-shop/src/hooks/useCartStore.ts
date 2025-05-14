// hooks/useCartStore.ts
import { create } from "zustand";
import type { Product } from "../types/productTypes";
import { toast } from "react-toastify"; // Import the toast function

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  
  // Add product to cart or update quantity if already exists
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        // Update the quantity of the existing product
        const updatedCart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        // Show a toast notification for quantity update
        toast.success(`${product.title} quantity updated to ${exists.quantity + 1}`, {
          position: "top-right",
          autoClose: 2000,
        });

        return {
          cart: updatedCart,
        };
      }

      // Add the new product to the cart
      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
      
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  // Remove product from the cart
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      
      // If the cart was updated, show a toast notification
      if (updatedCart.length < state.cart.length) {
        toast.error("Product removed from cart", {
          position: "top-right",
          autoClose: 2000,
        });
      }
      
      return { cart: updatedCart };
    }),

  // Update the quantity of an existing product in the cart
  updateQuantity: (productId, quantity) =>
    set((state) => {
      // Avoid invalid quantities
      if (quantity <= 0) {
        toast.error("Quantity must be greater than zero", {
          position: "top-right",
          autoClose: 2000,
        });
        return state;
      }

      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      toast.success("Cart quantity updated", {
        position: "top-right",
        autoClose: 2000,
      });

      return {
        cart: updatedCart,
      };
    }),

  // Clear the entire cart
  clearCart: () => {
    toast.info("Cart cleared", {
      position: "top-right",
      autoClose: 2000,
    });

    set({ cart: [] });
  },

  // Get the total price of the items in the cart
  getCartTotal: () => {
    const cart = get().cart;
    if (!cart || cart.length === 0) return 0;

    return cart.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  },
}));
