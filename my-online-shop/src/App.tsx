import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

import Home from "./pages/Home";
import ProductPage from "./pages/Productpage"; // Import the ProductPage component
import CartPage from "./pages/Cart"; // Import the CartPage component
import CheckoutSuccess from "./pages/CheckoutSuccess"; // Import the CheckoutSuccess component
import Contact from "./pages/Contact"; // Import the Contact page

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/contact" element={<Contact />} /> {/* Add this line for Contact page */}
      </Routes>
    </Router>
  );
}

export default App;
