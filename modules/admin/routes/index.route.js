import express from "express";
import authRoutes from "../authentication/authentication.route.js";
import productRoutes from "../product/product.route.js";
import categoryRoutes from "../categories/category.route.js";
import userRoutes from "../user/user.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/user", userRoutes);

export default router;
