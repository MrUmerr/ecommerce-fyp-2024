import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message, {
          position: "top-center",
          autoClose: 3000,
        });
        setFormData({ name: "", email: "", message: "" });
        onClose();
      } else {
        toast.error(result.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark:bg-slate-950">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-slate-950"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-slate-950"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message"
              className="mt-1 p-2 w-full border rounded h-32 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-slate-950"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const handleOpenForm = () => setIsContactFormOpen(true);
  const handleCloseForm = () => setIsContactFormOpen(false);

  return (
    <div className="flex flex-col items-center justify-center m-24">
      <p className="mb-4 font-bold text-center mt-16">
        If You Have Any Quries Feel Free To Contact & Submit Your Issue
      </p>
      <button
        onClick={handleOpenForm}
        className="bg-pink-500 text-white py-5 p-4 rounded font-semibold hover:bg-pink-600 transition duration-200"
      >
      OPEN CONTACT FORM
      </button>
      {isContactFormOpen && <Contact onClose={handleCloseForm} />}
      <ToastContainer />
    </div>
  );
};

export default App;
