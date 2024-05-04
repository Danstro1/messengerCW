import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getUsersForСonversationStart } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/sidebar", protectRoute, getUsersForSidebar);
router.get("/conversation", protectRoute, getUsersForСonversationStart);

export default router;
