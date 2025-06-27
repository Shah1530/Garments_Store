import express from "express";
import {
  LoginUserController,
  SignUpUserController,
} from "./authentication.controller.js";

const router = express.Router();

router.post("/create", SignUpUserController);
router.post("/login", LoginUserController);

export default router;
