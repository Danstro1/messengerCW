import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import GroupCheckbox from "./GroupCheckbox";
import useGroup from "../../zustand/useGroup";
import { MdDelete } from "react-icons/md";
import useDeleteUser from "../../hooks/useDeleteUser";

const Conversation = ({ isGroupCreating, conversation, lastIdx, groupSettings }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { groupUsersForCreating, setGroupUsersForCreating, setSelectedGroup, allUsers, setAllUsers } = useGroup();

	const [selectedForGroup, setSelectedForGroup] = useState(false);

	const { deleteUser } = useDeleteUser();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	const handleSelect = () => {
		if (selectedForGroup) {
			setSelectedForGroup(false);
			setGroupUsersForCreating(groupUsersForCreating.filter((user) => user !== conversation._id));
		} else {
			setSelectedForGroup(true);
			setGroupUsersForCreating([...groupUsersForCreating, conversation._id]);
		}
	}

	const handleSelection = () => {
		setSelectedGroup(null);
		setSelectedConversation(conversation);
	}

	const handleDeleteUserFromGroup = async (e) => {
		e.preventDefault();
		setAllUsers(allUsers.filter(user => conversation._id !== user._id));
		await deleteUser({ userId: conversation._id });
	}	

	return (
		<>
			<div
				className={`flex gap-2 items-center ${groupSettings ? "" : "hover:bg-sky-500 cursor-pointer"} rounded p-2 py-1 
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => isGroupCreating ? handleSelect() : groupSettings ? "" : handleSelection()}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
					</div>
				</div>
				{groupSettings ? <MdDelete className="w-5 h-5 text-red-600 cursor-pointer" onClick={handleDeleteUserFromGroup} /> : ""}
				{isGroupCreating ? <GroupCheckbox isSelected={selectedForGroup} /> : ""}
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;
