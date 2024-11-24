import Order from '../model/order.model.js';

export const placeOrder = async (req, res) => {
  const { userDetails, cartItems, totalPrice } = req.body;

  const newOrder = new Order({
    userDetails,
    cartItems,
    totalPrice,
  });

  try {
    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error placing order.' });
  }
};
