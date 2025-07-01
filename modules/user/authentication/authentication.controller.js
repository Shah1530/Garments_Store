import bcrypt from "bcryptjs";
import { errorHandler } from "../../../utils/errorHandler.js";
import {
  CreateNewUserModel,
  FindUserByEmailModel,
  ValidateUserActivationModel,
} from "./authentication.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const SignUpUserController = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await FindUserByEmailModel(email);
    if (existingUser) {
      return next(errorHandler(404, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await CreateNewUserModel(name, email, hashedPassword);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    if (user) {
      res.status(200).json({
        success: true,
        message: "User created successfully",
        token,
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

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
