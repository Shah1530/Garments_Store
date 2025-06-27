import express from "express";
import {
  CreateNewCategoryController,
  DeleteSingleCategoryController,
  FetchAllCategoriesController,
  FetchSingleCategoryController,
  UpdateSingleCategoryController,
} from "./category.controller.js";

const router = express.Router();

router.post("/", CreateNewCategoryController);
router.get("/", FetchAllCategoriesController);
router.get("/:id", FetchSingleCategoryController);
router.put("/:id", UpdateSingleCategoryController);
router.delete("/:id", DeleteSingleCategoryController);

export default router;
