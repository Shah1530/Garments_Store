import express from "express";
import {
  CreateNewOrderController,
  GetOrderByIdController,
  GetUserOrdersController,
  TrackOrderController,
} from "./order.controller.js";

const router = express.Router();

router.post("/", CreateNewOrderController);
router.get("/user/:id", GetUserOrdersController);
router.get("/:id", GetOrderByIdController);
router.get("/track/:trackingId", TrackOrderController);

export default router;
