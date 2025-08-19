import { errorHandler } from "../../../utils/errorHandler.js";
import {
  CreateNewCategoryModel,
  DeleteSingleCategoryModel,
  FetchAllCategoriesModel,
  FetchSingleCategoryModel,
  UpdateSingleCategoryModel,
} from "./category.model.js";

export const CreateNewCategoryController = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await CreateNewCategoryModel(name);
    if (!category || category.affectedRows === 0) {
      return next(errorHandler(404, "Category not found"));
    }
    res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const FetchAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await FetchAllCategoriesModel();
    if (!categories || categories.length === 0) {
      return next(errorHandler(404, "Categories not found"));
    }
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const FetchSingleCategoryController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await FetchSingleCategoryModel(id);
    if (!category || category.length === 0) {
      return next(errorHandler(404, "Category not found"));
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateSingleCategoryController = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await UpdateSingleCategoryModel(id, name);

    if (!category || category.affectedRows === 0) {
      return next(errorHandler(404, "Category not found or nothing updated"));
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteSingleCategoryController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await DeleteSingleCategoryModel(id);
    if (!category || category.affectedRows === 0) {
      return next(errorHandler(404, "Category not found"));
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
