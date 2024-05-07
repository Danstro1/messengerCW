import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createGroup, getGroupsForUser, getMessages, sendMessage } from "../controllers/group.controller.js";

const router = express.Router();


router.post("/create", protectRoute, createGroup);
router.get("/get", protectRoute, getGroupsForUser);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/get/:id", protectRoute, getMessages);


export default router;
