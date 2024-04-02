import express from "express";
import {
  guestbook,
  getGuestbooks,
} from "../controllars/guestbook.controllar.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, guestbook);
router.get("/", getGuestbooks);

export default router;
