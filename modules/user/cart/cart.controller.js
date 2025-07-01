import { errorHandler } from "../../../utils/errorHandler.js";
import {
  AddNewItemToTheCartModel,
  EmptyTheCartModel,
  GetCartItemsModel,
  RemoveItemFromTheCartModel,
  UpdateCartQuantityModel,
} from "./cart.model.js";

export const AddNewItemToTheCartController = async (req, res, next) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    const cart = await AddNewItemToTheCartModel(user_id, product_id, quantity);
    if (!cart || cart.affectedRows === 0) {
      return next(errorHandler(404, "Something went wrong"));
    }
    res.status(200).json({
      success: true,
      message: "Item added to the cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const RemoveItemFromTheCartController = async (req, res, next) => {
  const { id } = req.body;
  try {
    const cart = await RemoveItemFromTheCartModel(id);
    if (!cart || cart.affectedRows === 0) {
      return next(errorHandler(404, "Something went wrong"));
    }
    res.status(200).json({
      success: true,
      message: "Item removed to the cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const EmptyTheCartController = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const cart = await EmptyTheCartModel(user_id);
    if (!cart || cart.affectedRows === 0) {
      return next(errorHandler(404, "Something went wrong"));
    }
    res.status(200).json({
      success: true,
      message: "Cart emptied successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateCartQuantityController = async (req, res, next) => {
  const { id, quantity } = req.body;
  try {
    const cart = await UpdateCartQuantityModel(quantity, id);
    if (!cart || cart.affectedRows === 0) {
      return next(errorHandler(404, "Something went wrong"));
    }
    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const GetCartItemsController = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const cart = await GetCartItemsModel(user_id);
    if (!cart || cart.length === 0) {
      return next(errorHandler(404, "Cart items not found"));
    }
    res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
