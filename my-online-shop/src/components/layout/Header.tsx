import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../hooks/useCartStore";
import { ShoppingCart } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-purple-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Site Logo / Title */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight hover:text-purple-200 transition-colors"
          onClick={closeMenu}
        >
          Mystic Market
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
          <Link to="/" className="hover:text-purple-200 transition-colors">
            Home
          </Link>
          <Link to="/contact" className="hover:text-purple-200 transition-colors">
            Contact
          </Link>
          <Link
            to="/cart"
            className="relative hover:text-purple-200 transition-colors flex items-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-purple-500 text-white shadow-inner">
          <ul className="flex flex-col items-center space-y-4 py-4 text-base font-medium">
            <li>
              <Link to="/" onClick={closeMenu} className="hover:text-purple-100 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu} className="hover:text-purple-100 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={closeMenu} className="hover:text-purple-100 transition-colors">
                Cart ({cartItemCount})
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
