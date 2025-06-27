import { errorHandler } from "../../../utils/errorHandler.js";
import { GetOrderByIdModel } from "../../admin/order/order.model.js";
import {
  AddOrderItemsModel,
  CreateNewOrderModel,
  GetUserOrdersModel,
} from "./order.model.js";

export const CreateNewOrderController = async (req, res, next) => {
  const { userId, items, totalPrice, paymentMethod } = req.body;
  try {
    const orderId = await CreateNewOrderModel(
      userId,
      totalPrice,
      paymentMethod
    );
    const order = await AddOrderItemsModel(orderId, items);

    if (order) {
      res.status(200).json({
        success: true,
        message: "Order created successfully",
      });
    }
    return next(errorHandler(404, "Something went wrong"));
  } catch (error) {
    next(error);
  }
};

export const GetUserOrdersController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await GetUserOrdersModel(id);

    if (!order || order.length === 0)
      return next(errorHandler(404, "Order not found"));

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const GetOrderByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await GetOrderByIdModel(id);

    if (!order || order.length === 0)
      return next(errorHandler(404, "Order not found"));

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
