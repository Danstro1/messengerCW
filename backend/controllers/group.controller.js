import Group from "../models/group.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createGroup = async (req, res) => {
    try {
        const { name, participants } = req.body;
        const creatorId = req.user._id;

        const newGroup = await Group.create({
            name: name,
            participants: [creatorId, ...participants],
            owner: creatorId,
        });

        if (newGroup) {
            await newGroup.save();

            res.status(201).json({
                _id: newGroup._id,
                name: newGroup.name,
                participants: newGroup.participants,
                owner: creatorId,
            });
        }

    } catch (error) {
        console.log("Error in createGroup controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getGroupsForUser = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        let groups = await Group.find({ participants: currentUserId });

        res.status(200).json(groups);

    } catch (error) {
        console.log("Error in getGroupsForUser controller: ", error.message);
        res.status(500).json(error.message);
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: groupId } = req.params;
        const senderId = req.user._id;

        let group = await Group.findOne({
            _id: groupId
        });

        if (group && group.participants.includes(senderId)) {
            const newMessage = await Message.create({
                senderId,
                receiverId: group.participants,
                message
            });

            if (newMessage) {
                group.messages.push(newMessage._id);
            }

            await Promise.all([group.save(), newMessage.save()]);

            newMessage.receiverId.forEach(receiverId => {
                const receiverSocketId = getReceiverSocketId(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newMessage", newMessage);
                }
            })

            res.status(201).json(newMessage);
        }
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json(error.message);
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const senderId = req.user._id;

        const group = await Group.findOne({
            _id: groupId
        }).populate("messages");

        if (!group) return res.status(200).json([]);

        const messages = group.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}