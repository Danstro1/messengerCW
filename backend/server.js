import path from "path";
import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import groupRoutes from "./routes/group.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve(path.dirname(''));

const PORT = process.env.PORT || 5000;

app.use(fileUpload())
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/group", groupRoutes);

app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use('/groupPictures', express.static(path.join(__dirname, "groupPictures")));
app.use('/profilePictures', express.static(path.join(__dirname, "profilePictures")));

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
