import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify"; // Optional: for showing success toast
import Header from "../components/layout/Header"; // Assuming you have this in your components folder
import Footer from "../components/layout/Footer"; // Assuming you have this in your components folder

// Define interfaces for order details and item
interface OrderItem {
  title: string;
  quantity: number;
  discountedPrice: number;
}

interface OrderDetails {
  orderId: string;
  date: string; // Store date as string or Date, based on your needs
  totalAmount: number;
  items: OrderItem[];
}

const CheckoutSuccess: React.FC = () => {
  const location = useLocation();

  // Retrieve the state passed from the previous page (checkout or payment page)
  const orderDetails = location.state?.orderDetails as OrderDetails | undefined;

  useEffect(() => {
    if (!orderDetails) {
      toast.error("Order details are missing.");
    }
  }, [orderDetails]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        <div className="p-6 flex-grow flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Oops!</h1>
          <p className="mb-2">It seems like there was an issue with your order. Please try again later.</p>
          <Link to="/" className="text-blue-500 underline mt-4">
            Go back to Home
          </Link>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Order Successful!</h1>
        <p className="mb-4 text-lg">Thank you for your purchase! Your order has been successfully processed.</p>

        <div className="space-y-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Date:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> ${orderDetails.totalAmount.toFixed(2)}</p>

          <h3 className="text-lg font-semibold">Items in your order:</h3>
          <ul className="list-disc pl-6">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="mb-2">
                {item.title} - {item.quantity} x ${item.discountedPrice.toFixed(2)} = ${(
                  item.quantity * item.discountedPrice
                ).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 underline">
            Go back to Home
          </Link>
          <br />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
