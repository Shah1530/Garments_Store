import express from "express";
import {
  FetchAllOrdersController,
  GetOrderByIdController,
  UpdateOrderStatusController,
} from "./order.controller.js";

const router = express.Router();

router.get("/", FetchAllOrdersController);
router.get("/:id", GetOrderByIdController);
router.put("/:id", UpdateOrderStatusController);

export default router;
