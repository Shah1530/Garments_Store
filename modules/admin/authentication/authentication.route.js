import express from "express";
import {
  CreateNewAdminController,
  LoginAdminController,
} from "./authentication.controller.js";

const router = express.Router();

router.post("/create", CreateNewAdminController);
router.post("/login", LoginAdminController);

export default router;
