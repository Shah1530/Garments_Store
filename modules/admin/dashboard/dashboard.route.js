import express from "express";
import { FetchEveryDataCountController } from "./dashboard.controller.js";

const router = express.Router();

router.get("/", FetchEveryDataCountController);

export default router;
