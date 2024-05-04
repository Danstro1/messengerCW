import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createGroup, getMessages, sendMessage } from "../controllers/group.controller.js";

const router = express.Router();


router.post("/create", protectRoute, createGroup);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/get/:id", protectRoute, getMessages);


export default router;
