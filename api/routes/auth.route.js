import express from "express";
import { signup } from "../controllars/auth.controllar.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
