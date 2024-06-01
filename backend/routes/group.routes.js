import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addUsers, changeNameAndPic, createGroup, deleteUser, getFiles, getGroupsForUser, getMessages, sendMessage, uploadFile } from "../controllers/group.controller.js";

const router = express.Router();


router.post("/create", protectRoute, createGroup);
router.get("/get", protectRoute, getGroupsForUser);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/get/:id", protectRoute, getMessages);
router.post("/upload/:id", protectRoute, uploadFile);
router.get("/getFiles/:id", protectRoute, getFiles);
router.post("/deleteUser/:id", protectRoute, deleteUser);
router.post("/addUsers/:id", protectRoute, addUsers);
router.post("/setGroupNP/:id", protectRoute, changeNameAndPic);


export default router;
