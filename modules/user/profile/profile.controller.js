import { errorHandler } from "../../../utils/errorHandler.js";
import { FindUserByEmailModel } from "../authentication/authentication.model.js";

export const FindUserProfileController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = FindUserByEmailModel(id);

    if (user) {
      res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }
    return next(errorHandler(404, "User not found"));
  } catch (error) {
    next(error);
  }
};
