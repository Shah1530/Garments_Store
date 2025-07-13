import express from "express";
import {
  CreateNewAdminController,
  FetchAllUsersController,
  UpdateUserAccountStatusController,
} from "./user.controller.js";

const router = express.Router();

router.post("/admin-create", CreateNewAdminController);
router.get("/", FetchAllUsersController);
router.put("/:id", UpdateUserAccountStatusController);

export default router;
