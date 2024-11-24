import express from 'express';
import Order from '../model/order.model.js';  // Assuming the model is in 'models/orderModel.js'

const orderRoutes = express.Router();

// Handle placing an order
orderRoutes.post('/order', async (req, res) => {
  try {
    const { user, cartItems, totalPrice } = req.body;

    // Validate incoming data
    if (!user || !cartItems || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new order
    const newOrder = new Order({
      user,
      cartItems,
      totalPrice,
    });

    // Save the order to the database
    await newOrder.save();

    return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Failed to place order' });
  }
});

export default orderRoutes;
