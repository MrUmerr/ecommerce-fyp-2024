import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;

import shopRoute from "./route/shop.route.js"; 
import userRoute from "./route/user.route.js";
import productRoute from './route/product.route.js';
import orderRoutes from './route/order.route.js';
import contactRoute from './route/contact.route.js';
import commentRoutes from "./route/comment.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello there");
  return res.status(200).send("Congratulations");
});

// Database connection
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
      console.log(`App is listening to the PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Route handlers
app.use("/shop", shopRoute);  
app.use("/product", productRoute); 
app.use("/user", userRoute);
app.use("/user", orderRoutes);
app.use('/api', contactRoute);
app.use("/api/comments", commentRoutes);
app.use("/api", userRoute); 
app.use("/", userRoute); //new


