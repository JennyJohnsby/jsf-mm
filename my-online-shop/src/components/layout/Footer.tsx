import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-purple-600 text-white py-8 mt-10 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left text-sm sm:text-base">
          &copy; {currentYear} <strong>Mystic Market</strong>. All rights reserved.
        </p>

        <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Footer navigation">
          <Link
            to="/privacy"
            className="hover:text-purple-200 transition duration-200 ease-in-out text-sm sm:text-base"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-purple-200 transition duration-200 ease-in-out text-sm sm:text-base"
          >
            Terms
          </Link>
          <Link
            to="/contact"
            className="hover:text-purple-200 transition duration-200 ease-in-out text-sm sm:text-base"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
