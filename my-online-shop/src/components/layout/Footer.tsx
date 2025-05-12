import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-600 text-white py-8 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Mystic Market. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-purple-300 transition duration-200 ease-in-out"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-purple-300 transition duration-200 ease-in-out"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-purple-300 transition duration-200 ease-in-out"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
