import express from "express";
import { getFiles, getMessages, sendMessage, uploadFile } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/upload/:id", protectRoute, uploadFile);
router.get("/getFiles/:id", protectRoute, getFiles);

export default router;
