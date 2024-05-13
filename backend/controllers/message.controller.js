import Conversation from "../models/conversation.model.js";
import File from "../models/file.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		const senderSocketId = getReceiverSocketId(senderId);

		const sender = await User.findOne({ _id: senderId });

		const reciever = await User.findOne({ _id: receiverId });

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		if (conversation.messages.length == 1) {
			if(receiverSocketId) io.to(receiverSocketId).emit("createConversation", reciever, sender);
			if(senderSocketId) io.to(senderSocketId).emit("createConversation", reciever, sender);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json(error.message);
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const uploadFile = async (req, res) => {
	try {
		const { id: receiverId } = req.params;
		const file = req.files.file;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newFile = await File.create({
			name: file.name,
			senderId,
			receiverId,
			file: file.data
		});

		if (newFile) {
			conversation.files.push(newFile._id);
		}

		await Promise.all([conversation.save(), newFile.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		const senderSocketId = getReceiverSocketId(senderId);

		const sender = await User.findOne({ _id: senderId })

		const reciever = await User.findOne({ _id: receiverId })

		if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newFile);
		if (senderSocketId) io.to(senderSocketId).emit("newMessage", newFile);

		if (conversation.files.length == 1) {
			if(receiverSocketId) io.to(receiverSocketId).emit("createConversation", reciever, sender);
			if(senderSocketId) io.to(senderSocketId).emit("createConversation", reciever, sender);
		} 

		res.status(201).json(newFile);
    } catch (error) {
        console.log("Error in sendFile controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getFiles = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("files");

		if (!conversation) return res.status(200).json([]);

		const files = conversation.files;

		res.status(200).json(files);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}