import express from "express";
import {
  AddNewItemToTheCartController,
  EmptyTheCartController,
  GetCartItemsController,
  RemoveItemFromTheCartController,
  UpdateCartQuantityController,
} from "./cart.controller.js";

const router = express.Router();

router.post("/", AddNewItemToTheCartController);
router.put("/", RemoveItemFromTheCartController);
router.delete("/", EmptyTheCartController);
router.put("/update-quantity", UpdateCartQuantityController);
router.get("/", GetCartItemsController);

export default router;
