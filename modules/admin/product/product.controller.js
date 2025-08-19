import { errorHandler } from "../../../utils/errorHandler.js";
import {
  CreateNewProductModel,
  DeleteSingleProductModel,
  FetchAllProductsModel,
  FetchSingleProductModel,
  UpdateSingleProductModel,
} from "./product.model.js";

export const CreateNewProductController = async (req, res, next) => {
  const {
    name,
    description,
    image_1,
    image_2,
    image_3,
    price,
    category_id,
    stock,
  } = req.body;
  try {
    const product = await CreateNewProductModel(
      name,
      description,
      image_1,
      image_2,
      image_3,
      price,
      category_id,
      stock
    );
    if (!product || product.affectedRows === 0) {
      return next(errorHandler(404, "Product not found"));
    }
    res.status(200).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const FetchAllProductsController = async (req, res, next) => {
  try {
    const products = await FetchAllProductsModel();
    if (!products || products.length === 0) {
      return next(errorHandler(404, "Products not found"));
    }

    const data = products.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      image_1: row.image_1,
      image_2: row.image_2,
      image_3: row.image_3,
      stock: row.stock,
      price: row.price,
      // add your other product fields here
      category: row.category_id
        ? {
            id: row.category_id,
            name: row.category_name,
          }
        : null,
    }));
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const FetchSingleProductController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await FetchSingleProductModel(id);
    if (!product || product.length === 0) {
      return next(errorHandler(404, "Product not found"));
    }

    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image_1: product.image_1,
      image_2: product.image_2,
      image_3: product.image_3,
      stock: product.stock,
      category: product.category_id
        ? {
            id: product.category_id,
            name: product.category_name,
          }
        : null,
    };

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateSingleProductController = async (req, res, next) => {
  const { id } = req.params;

  // Whitelist allowed fields
  const allowedFields = [
    "name",
    "description",
    "image_1",
    "image_2",
    "image_3",
    "price",
    "category_id",
    "stock",
  ];

  // Filter body fields
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  try {
    const result = await UpdateSingleProductModel(id, updates);

    if (!result || result.affectedRows === 0) {
      return next(errorHandler(404, "Product not found or nothing updated"));
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteSingleProductController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await DeleteSingleProductModel(id);
    if (!product || product.affectedRows === 0) {
      return next(errorHandler(404, "Product not found"));
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
