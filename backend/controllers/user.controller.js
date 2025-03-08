import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

const sortUsersForSidebar = async (loggedInUserId) => {

	let conversations = await Conversation.find({ participants: loggedInUserId });

	let participantIds = conversations.flatMap(conversation => conversation.participants);

	const sortedUsers = await User.find({ _id: { $in: participantIds, $nin: [loggedInUserId] } }).select("-password");

	return sortedUsers;
}

export const getUsersForSidebar = async (req, res) => {
	try {

		const loggedInUserId = req.user._id;

		const filteredUsers = await sortUsersForSidebar(loggedInUserId)

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUsersForСonversationStart = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await sortUsersForSidebar(loggedInUserId)

		let newConversationUsers = await User.find({ _id: { $nin: [...filteredUsers.map(user => user._id), loggedInUserId] } })

		res.status(200).json(newConversationUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getCurrentUser = async (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log("Error in getCurrentUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
	}
}


export const changeProfile = async (req, res) => {
    try {
        const user = req.user;
		const fullName = req.body.fullName
        const profilePic = req.files ? req.files.profilePic : null;

        let fileUrl;

        if(profilePic){
            const uploadDir = path.join(__dirname, 'profilePictures');

            if (!fs.existsSync(uploadDir)) {
              fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            const uploadPath = path.join(uploadDir, profilePic.name);
        
            await profilePic.mv(uploadPath);
        
            fileUrl = `/profilePictures/${profilePic.name}`;
        }

		console.log(fullName, fileUrl);

		if(fullName) user.fullName = fullName;
		if(profilePic) user.profilePic = fileUrl;

		await user.save();
		
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in changeProfile controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}