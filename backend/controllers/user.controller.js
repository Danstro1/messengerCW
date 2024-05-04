import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

const sortUsersForSidebar = async (loggedInUserId) => {

	let conversations = await Conversation.find({ participants: loggedInUserId, messages: { $ne: [] } });

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

	}
}
