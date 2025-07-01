import { errorHandler } from "../../../utils/errorHandler.js";
import { GetOrderByIdModel } from "../../admin/order/order.model.js";
import {
  AddOrderItemsModel,
  CreateNewOrderModel,
  GetUserOrdersModel,
  TrackOrderModel,
} from "./order.model.js";
import jwt from "jsonwebtoken";

export const CreateNewOrderController = async (req, res, next) => {
  const { userId, items, phone, totalPrice, paymentMethod, address } = req.body;
  try {
    const decodeToken = jwt.verify(
      userId,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          return next(errorHandler(404, "User not found"));
        }
        return decode;
      }
    );

    const prefix = "ORD";
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars [A-Z0-9]

    const trackingId = `${prefix}-${date}-${randomPart}`;

    const orderId = await CreateNewOrderModel(
      decodeToken.id,
      totalPrice,
      paymentMethod,
      address,
      phone,
      trackingId
    );
    const order = await AddOrderItemsModel(orderId, items);

    if (!order) {
      return next(errorHandler(404, "Something went wrong"));
      return;
    }
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      trackingId: trackingId,
    });
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

export const TrackOrderController = async (req, res, next) => {
  const { trackingId } = req.params;
  try {
    const order = await TrackOrderModel(trackingId);

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
