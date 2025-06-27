import express from "express";
import {
  CreateNewOrderController,
  GetOrderByIdController,
  GetUserOrdersController,
} from "./order.controller.js";

const router = express.Router();

router.post("/", CreateNewOrderController);
router.get("/user/:id", GetUserOrdersController);
router.get("/:id", GetOrderByIdController);

export default router;
