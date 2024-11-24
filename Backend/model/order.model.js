import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    address: String,
    phone: String,
  },
  cartItems: [
    {
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
