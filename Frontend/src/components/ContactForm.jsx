// src/ContactForm.js
import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
    
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-900 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="name"
              className="block text-base sm:text-lg font-medium mb-2 text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="email"
              className="block text-base sm:text-lg font-medium mb-2 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="message"
              className="block text-base sm:text-lg font-medium mb-2 text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out"
              required
            ></textarea>
          </div>
          {success && (
            <p className="text-green-600 text-center mb-4 font-medium">
              Message sent successfully!
            </p>
          )}
          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gradient-to-br from-black via-gray-800 to-black text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full shadow-sm hover:bg-gray-700 transition duration-200 ease-in-out"
              disabled={sending}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full shadow-lg hover:bg-blue-800 transition duration-200 ease-in-out"
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

