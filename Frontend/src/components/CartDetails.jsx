import React, { useState, useEffect } from 'react';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [orderStatus, setOrderStatus] = useState(null);  // To handle success/error messages

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle order placement
  const placeOrder = async () => {
    const orderData = {
      user: {
        name: userInfo.name,
        email: userInfo.email,
        address: userInfo.address,
        phone: userInfo.phone,
      },
      cartItems: cartItems.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    };

    try {
      const response = await fetch('http://localhost:4001/user/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderStatus('Order placed successfully!');
        // Optionally, clear the cart after a successful order
        localStorage.removeItem('cart');
        setCartItems([]);
      } else {
        setOrderStatus('Failed to place order. Please try again.');
      }
    } catch (error) {
      setOrderStatus('Error placing order. Please check your connection.');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-5 ml-6">Cart Details</h2>
      <div className="bg-white shadow-md rounded-lg p-5 overflow-x-auto dark:bg-slate-950">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-slate-900">
              <th className="p-3">Product Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center">
                  Your cart is empty
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">Rs.{item.price}</td>
                  <td className="p-3">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {cartItems.length > 0 && (
          <div className="mt-5 text-right">
            <h3 className="text-xl font-semibold bg-slate-200 pr-4 rounded-md dark:bg-slate-900">
              Total: Rs.{totalPrice}
            </h3>
          </div>
        )}
      </div>

      {/* Order Form Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-12">Shipping Information</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded dark:bg-slate-950"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded dark:bg-slate-950"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded dark:bg-slate-950"
              value={userInfo.address}
              onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              className="w-full mt-1 p-2 border rounded dark:bg-slate-950"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full p-2 mt-4 bg-pink-500 text-white font-extrabold rounded hover:bg-pink-600 transition duration-200 mb-14"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </form>

        {/* Order Status Message */}
        {orderStatus && (
          <div className="mt-5 text-center text-xl font-semibold text-green-600">
            {orderStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetails;


