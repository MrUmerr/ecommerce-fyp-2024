import express from "express";
import { login, signup, deleteUser, updateUser } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/user/:email", deleteUser); // New delete route
router.put("/user/:email", updateUser);




export default router;



