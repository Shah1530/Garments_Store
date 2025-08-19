import { errorHandler } from "../../../utils/errorHandler.js";
import { FetchEveryDataCountModel } from "./dashboard.model.js";

export const FetchEveryDataCountController = async (req, res, next) => {
  try {
    const data = await FetchEveryDataCountModel();
    if (!data || data.length === 0) {
      return next(errorHandler(404, "Data not found"));
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
