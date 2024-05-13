import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createGroup, getFiles, getGroupsForUser, getMessages, sendMessage, uploadFile } from "../controllers/group.controller.js";

const router = express.Router();


router.post("/create", protectRoute, createGroup);
router.get("/get", protectRoute, getGroupsForUser);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/get/:id", protectRoute, getMessages);
router.post("/upload/:id", protectRoute, uploadFile);
router.get("/getFiles/:id", protectRoute, getFiles);



export default router;
