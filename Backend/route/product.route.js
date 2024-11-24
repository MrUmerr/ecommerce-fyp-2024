// product.route.js
import express from 'express';
import { getProductById } from '../controller/product.controller.js';  // Make sure the path is correct

const router = express.Router();

// Fetch a product by its ID
router.get('/:id', getProductById);  // Fetch a product by its ID

export default router;
