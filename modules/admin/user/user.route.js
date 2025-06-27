import express from "express";
import {
  FetchAllUsersController,
  UpdateUserAccountStatusController,
} from "./user.controller.js";

const router = express.Router();

router.get("/", FetchAllUsersController);
router.put("/:id", UpdateUserAccountStatusController);

export default router;
