import express from "express";
import { guestbook } from "../controllars/guestbook.controllar.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, guestbook);

export default router;
