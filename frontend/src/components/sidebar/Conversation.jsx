import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import GroupCheckbox from "./groupCheckbox.jsx";
import useGroup from "../../zustand/useGroup";

const Conversation = ({ isGroupCreating, conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const {groupUsersForCreating, setGroupUsersForCreating, setSelectedGroup} = useGroup();

	const [selectedForGroup, setSelectedForGroup] = useState(false);

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

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => isGroupCreating ? handleSelect() : handleSelection()}
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
				{isGroupCreating ? <GroupCheckbox isSelected={selectedForGroup} /> : ""}
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;
