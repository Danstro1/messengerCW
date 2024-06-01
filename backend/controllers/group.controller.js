import File from "../models/file.model.js";
import Group from "../models/group.model.js";
import Message from "../models/message.model.js";
import fs from 'fs';
import path from 'path';
import { getReceiverSocketId, io } from "../socket/socket.js";

const __dirname = path.resolve(path.dirname(''));

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

export const uploadFile = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const file = req.files.file;
        const senderId = req.user._id;

        let group = await Group.findOne({
            _id: groupId
        });

		const uploadDir = path.join(__dirname, 'uploads');

		if (!fs.existsSync(uploadDir)) {
		  fs.mkdirSync(uploadDir, { recursive: true });
		}

		const uploadPath = path.join(uploadDir, file.name);
	
		await file.mv(uploadPath);
	
		const fileUrl = `/uploads/${file.name}`;

        if (group && group.participants.includes(senderId)) {
            const newFile = await File.create({
                name: Buffer.from(file.name, 'binary').toString('utf-8'),
                senderId,
                receiverId: group.participants,
                file: fileUrl
            });

            if (newFile) {
                group.files.push(newFile._id);
            }

            await Promise.all([group.save(), newFile.save()]);

            newFile.receiverId.forEach(receiverId => {
                const receiverSocketId = getReceiverSocketId(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newMessage", newFile);
                }
            })

            res.status(201).json(newFile);
        }
    } catch (error) {
        console.log("Error in sendFile controller: ", error.message);
        res.status(500).json(error.message);
    }
}

export const getFiles = async (req, res) => {
    try {
        const { id: groupId } = req.params;

        const group = await Group.findOne({
            _id: groupId
        }).populate("files");

        if (!group) return res.status(200).json([]);

        const files = group.files;

        res.status(200).json(files);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const { userId } = req.body;

        const group = await Group.findOne({
            _id: groupId
        })

        if (group && group.owner.equals(req.user._id)) {
            group.participants = group.participants.filter(participant => participant.toString() !== userId);

            await group.save();
        }     

        res.status(200).json(group);
    } catch (error) {
        console.log("Error in deleteUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addUsers = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const { usersId } = req.body;

        const group = await Group.findOne({
            _id: groupId
        })

        if (group && group.owner.equals(req.user._id)) {

            const newParticipants = usersId.filter(id => !group.participants.includes(id));
            group.participants = [...group.participants, ...newParticipants];

            await group.save();
        }     

        res.status(200).json(group);
    } catch (error) {
        console.log("Error in addUsers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const changeNameAndPic = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const name = req.body.name;
        const groupPic = req.files ? req.files.groupPic : null;

        const group = await Group.findOne({
            _id: groupId
        })

        let fileUrl;

        if(groupPic){
            const uploadDir = path.join(__dirname, 'groupPictures');

            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            const uploadPath = path.join(uploadDir, groupPic.name);
        
            await groupPic.mv(uploadPath);
        
            fileUrl = `/groupPictures/${groupPic.name}`;
        }

        if (group && group.owner.equals(req.user._id)) {

            if(name) group.name = name;
            if(groupPic) group.groupPic = fileUrl;

            await group.save();
        }     

        res.status(200).json(group);
    } catch (error) {
        console.log("Error in changeNameAndPic controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}