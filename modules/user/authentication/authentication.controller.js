import bcrypt from "bcryptjs";
import { errorHandler } from "../../../utils/errorHandler.js";
import {
  CreateNewUserModel,
  FindUserByEmailModel,
  ValidateUserActivationModel,
} from "./authentication.model.js";

export const SignUpUserController = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await FindUserByEmailModel(email);
    if (existingUser) {
      return next(errorHandler(404, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await CreateNewUserModel(name, email, hashedPassword);

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

export const LoginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await FindUserByEmailModel(email);
    if (!existingUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validateActivation = await ValidateUserActivationModel(email);
    if (!validateActivation) {
      return next(errorHandler(404, "Your account is not activated"));
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return next(errorHandler(404, "Invalid Credentials"));
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
