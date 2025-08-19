import express from "express";
import authRoutes from "../authentication/authentication.route.js";
import cartRoutes from "../cart/cart.route.js";
import profileRoutes from "../profile/profile.route.js";
import orderRoutes from "../order/order.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/profile", profileRoutes);
router.use("/order", orderRoutes);

export default router;
