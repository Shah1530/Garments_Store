import jwt from "jsonwebtoken";
import {
  FindUserProfileModel,
  UpdateUserProfileModel,
} from "./profile.model.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const FindUserProfileController = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(errorHandler(401, "Authorization header missing"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(errorHandler(401, "Token missing"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(errorHandler(401, "Invalid or expired token"));
    }

    const profile = await FindUserProfileModel(decoded.id);

    if (!profile) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateUserProfileController = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name } = req.body;

    if (!name) {
      return next(errorHandler(400, "Name is required"));
    }

    const updated = await UpdateUserProfileModel(userId, name);

    if (!updated) {
      return next(errorHandler(404, "User not found or not updated"));
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
