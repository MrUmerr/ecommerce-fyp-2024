import express from 'express';
import { getShop, getShops, addShop, updateShop, deleteShop } from '../controller/Shop.controller.js';

const router = express.Router();


router.get("/", getShop);
router.get("/filter", getShops);
router.post("/", addShop);  // Add new product
router.put("/:id", updateShop);  // Update product by ID
router.delete("/:id", deleteShop);  // Delete product by ID



export default router;
