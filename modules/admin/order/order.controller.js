import { errorHandler } from "../../../utils/errorHandler.js";
import {
  AddOrderItemsModel,
  CreateNewOrderModel,
  FetchAllOrdersModel,
  GetOrderByIdModel,
  GetUserOrdersModel,
  UpdateOrderStatusModel,
} from "./order.model.js";

export const FetchAllOrdersController = async (req, res, next) => {
  try {
    const orders = await FetchAllOrdersModel();

    if (!orders || orders.length === 0) {
      return next(errorHandler(404, "Orders not found"));
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: orders,
    });
    return next(errorHandler(404, "Something went wrong"));
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

export const UpdateOrderStatusController = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await UpdateOrderStatusModel(id, status);

    if (!order || order.affectedRows === 0)
      return next(errorHandler(404, "Order not found"));

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
