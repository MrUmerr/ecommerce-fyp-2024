import React, { useState, useEffect } from 'react';
import CartDetails from './CartDetails';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

const OrderPage = () => {
    // Cart quantity state and initialization from localStorage
    const [cartQuantity, setCartQuantity] = useState(() => {
        return parseInt(localStorage.getItem('cartQuantity'), 10) || 0;
    });

    // Sync cart quantity with localStorage
    useEffect(() => {
        localStorage.setItem('cartQuantity', cartQuantity);
    }, [cartQuantity]);

    // Handle order placement
    const handlePlaceOrder = () => {
        toast.success('Order placed successfully!');
        setCartQuantity(0); // Reset cart after placing order
    };

    return (
        <>
            {/* Pass cartQuantity and setCartQuantity to Navbar */}
            <Navbar cartQuantity={cartQuantity} setCartQuantity={setCartQuantity} />

            {/* Cart Details Section */}
            <div className='mt-28'>
                <CartDetails />
            </div>
        </>
    );
};

export default OrderPage;
