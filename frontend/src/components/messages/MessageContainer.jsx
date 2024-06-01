import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useGroup from "../../zustand/useGroup";
import { IoMdSettings } from "react-icons/io";
import GroupSettings from "../group/GroupSettings";
import Profile from "./Profile";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation, profile } = useConversation();

	const { selectedGroup, setSelectedGroup, groupSettings, setGroupSettings, isGroupCreating } = useGroup();

	const { authUser } = useAuthContext();

	useEffect(() => {
		return () => {
			setSelectedConversation(null);
			setSelectedGroup(null)
		}
	}, [setSelectedConversation, setSelectedGroup]);

	useEffect(() => {
		setGroupSettings(false);
	}, [selectedGroup, selectedConversation]);

	const openGroupSettings = () => {
		if(isGroupCreating) return;
		groupSettings ? setGroupSettings(false) : setGroupSettings(true)
	}

	return (
		profile ? <Profile /> :
		<div className='md:min-w-[450px] flex flex-col pr-1'>
			{!selectedConversation && !selectedGroup ? (
				<NoChatSelected />
			) : (
				<>
					<div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between'>
						<div>
							<span className='label-text'>To:</span>{" "}
							<span className='text-gray-900 font-bold'>{selectedConversation ? selectedConversation.fullName : selectedGroup.name}</span>
						</div>
						{authUser._id != selectedGroup?.owner || selectedConversation ? "" : <IoMdSettings className="text-black w-5 h-5 self-end cursor-pointer" onClick={openGroupSettings} />}
					</div>
					{groupSettings ? <GroupSettings groupSettings={groupSettings}/> :
					<> 					
						<Messages />
						<MessageInput />
					</>
					}
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
