import express from "express";
import { FindUserProfileController } from "./profile.controller.js";

const router = express.Router();

router.get("/:id", FindUserProfileController);

export default router;
