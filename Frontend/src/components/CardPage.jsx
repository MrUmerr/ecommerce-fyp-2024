import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReviewStars from './ReviewStar';
import CommentSection from './CommentSection';

const CardPage = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1); // Default quantity starts at 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0); // Tracks cart items count

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4001/product/${pid}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    // Load cart count from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(existingCart.length); 
  }, [pid]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = existingCart.findIndex((item) => item.id === pid);

    if (existingProductIndex > -1) {
      // Update quantity if product already exists in cart
      existingCart[existingProductIndex].quantity = cartQuantity;
    } else {
      // Add new product to cart
      existingCart.push({
        id: pid,
        name: product?.Name,
        price: product?.Price,
        quantity: cartQuantity,
      });

      // Increment cart count when adding a new product
      setCartCount((prevCount) => prevCount + 1);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-16 px-4">
      <Navbar cartQuantity={cartCount} /> {/* Updated to display cart count */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-8 pt-16 lg:pt-28">
        <div className="w-full lg:w-80 h-64 lg:h-96 overflow-hidden">
          <img
            src={product?.Img || 'default-image-url'}
            alt="product image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-start max-w-full lg:max-w-xl px-4 lg:px-0">
          <p className="text-lg font-medium mt-2">{product?.Name || 'Product Name'}</p>
          <p className="mt-4 text-lg font-semibold text-pink-500 cursor-pointer">
            Rs.{product?.Price || '0.00'}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-lg font-medium line-through text-gray-400">{product?.Oldprice || '0.00'}</p>
            <p className="text-black text-sm dark:text-white">{product?.Percentoff || '0'} </p>
          </div>
          <ReviewStars />
          <div className="flex mt-4 items-center">
            <span className="mr-2">Quantity:</span>
            <button
              onClick={() => setCartQuantity((prev) => Math.max(1, prev - 1))}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <span className="px-4">{cartQuantity}</span>
            <button
              onClick={() => setCartQuantity((prev) => prev + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-6 badge font-light rounded-md border-pink-500 text-pink-500 dark:bg-slate-900 dark:text-white dark:hover:text-pink-500 hover:bg-pink-500 hover:text-white duration-200 cursor-pointer px-4 py-2"
          >
            Add to cart
          </button>
          <h2 className='font-extrabold mt-6'>Description</h2>
          <p className="whitespace-normal break-words"> {product?.Description || 'No description available'}</p>
        </div>
      </div>
      <CommentSection />
      <Footer />
    </div>
  );
};

export default CardPage;
