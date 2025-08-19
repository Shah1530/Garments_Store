import express from "express";
import {
  FindUserProfileController,
  UpdateUserProfileController,
} from "./profile.controller.js";

const router = express.Router();

router.get("/", FindUserProfileController);
router.put("/", UpdateUserProfileController);

export default router;
