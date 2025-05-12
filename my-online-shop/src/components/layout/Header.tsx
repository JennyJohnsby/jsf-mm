import React, { useState } from "react";
import logo from "../../assets/ChatGPT Image 12. mai 2025, 19_28_06.png";


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Placeholder for the navigation action (you can add your custom logic)
  const handleNavigation = (section: string) => {
    console.log(`Navigating to ${section}`);
    // You can add custom scrolling or other logic here instead of using links
  };

  return (
    <header className="bg-purple-600 text-white">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <img
  src={logo}  // The imported image
  alt="Mystic Market Logo"
  className="w-40 h-40"  // Set the size of the image
/>

        <div className="text-2xl font-semibold cursor-pointer" onClick={() => handleNavigation("Home")}>
          Mystic Market
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => handleNavigation("Home")}
            className="hover:text-purple-300 transition"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("Products")}
            className="hover:text-purple-300 transition"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigation("About")}
            className="hover:text-purple-300 transition"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("Contact")}
            className="hover:text-purple-300 transition"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center space-x-2"
          aria-label="Toggle Menu"
        >
          <span className="text-xl">☰</span> {/* Hamburger icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-purple-700 text-white">
          <div className="flex flex-col items-center space-y-4 p-4">
            <button
              onClick={() => handleNavigation("Home")}
              className="hover:text-purple-300 transition"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("Products")}
              className="hover:text-purple-300 transition"
            >
              Products
            </button>
            <button
              onClick={() => handleNavigation("About")}
              className="hover:text-purple-300 transition"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("Contact")}
              className="hover:text-purple-300 transition"
            >
              Contact
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
