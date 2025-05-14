import React, { useState } from "react";
import { toast } from "react-toastify"; // For notifications
import Header from "../components/layout/Header"; // Assuming you have this in your components folder
import Footer from "../components/layout/Footer"; // Assuming you have this in your components folder

const Contact: React.FC = () => {
  // State to manage form input values
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!name || !email || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Display loading state
    setLoading(true);

    // Simulate form submission (In real case, you'd make an API call here)
    setTimeout(() => {
      toast.success("Thank you for reaching out! We'll get back to you soon.");
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6 text-lg">
          If you have any questions, concerns, or feedback, feel free to reach out to us using the form below.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-blue-500 text-white rounded-md ${loading ? "opacity-50" : ""}`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
