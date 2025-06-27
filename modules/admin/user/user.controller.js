import { errorHandler } from "../../../utils/errorHandler.js";
import { UpdateUserAccountStatusModel } from "./user.model.js";

export const FetchAllUsersController = async (req, res, next) => {
  try {
    const users = await FetchAllUsersModel();
    if (!users || users.length === 0) {
      return next(errorHandler(404, "Users not found"));
    }

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateUserAccountStatusController = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const user = await UpdateUserAccountStatusModel(id, status);
    if (!user || user.affectedRows === 0) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message:
        status == 0
          ? "User blocked successfully"
          : "User unblocked successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
