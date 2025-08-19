import { errorHandler } from "../../../utils/errorHandler.js";
import {
  CreateNewAdminModel,
  LoginAdminModel,
} from "./authentication.model.js";
import bcrypt from "bcryptjs";

export const CreateNewAdminController = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash("12345", 10);
    const user = await CreateNewAdminModel(
      "Admin",
      "admin@gmail.com",
      hashedPassword
    );
    if (user) {
      res.status(200).json({
        success: true,
        message: "Admin created successfully",
      });
    }
    return next(errorHandler(404, "User not found"));
  } catch (error) {
    next(error);
  }
};

export const LoginAdminController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await LoginAdminModel(email, password);
    if (!user) {
      return next(errorHandler(404, "Invalid Credentials"));
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return next(errorHandler(404, "Invalid Credentials"));
    }

    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
