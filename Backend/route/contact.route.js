import express from 'express';
import { sendMessage } from '../controller/contact.controller.js';

const router = express.Router();

// Route to handle form submission
router.post('/contact', sendMessage);

export default router;
