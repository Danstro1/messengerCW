import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { changeProfile, getCurrentUser, getUsersForSidebar, getUsersForСonversationStart } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/sidebar", protectRoute, getUsersForSidebar);
router.get("/conversation", protectRoute, getUsersForСonversationStart);
router.post("/change", protectRoute, changeProfile);
router.get("/getCurrent", protectRoute, getCurrentUser);

export default router;
