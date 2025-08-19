import express from "express";
import {
  CreateNewProductController,
  DeleteSingleProductController,
  FetchAllProductsController,
  FetchSingleProductController,
  UpdateSingleProductController,
} from "./product.controller.js";

const router = express.Router();

router.post("/", CreateNewProductController);
router.get("/", FetchAllProductsController);
router.get("/:id", FetchSingleProductController);
router.put("/:id", UpdateSingleProductController);
router.delete("/:id", DeleteSingleProductController);

export default router;
