import { useAuthContext } from "../../context/AuthContext";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { GoDownload } from "react-icons/go";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation, conversationsForSearch, conversationsForSidebar } = useConversation();
    const { currentUser } = useGetCurrentUser();
	const isFile = message.file;

	const handleDownload = () => {
		const downloadLink = document.createElement('a');
		downloadLink.href = message.file;
		downloadLink.download = message.name;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

	const findName = () => {
		let name;
		name = conversationsForSearch.find((conversation) =>
			conversation._id == message.senderId)?.fullName;
		if (name == null)
			name = conversationsForSidebar.find((conversation) =>
				conversation._id == message.senderId)?.fullName;
		return name;
	}

	const findPic = () => {
		let picture;
		picture = conversationsForSearch.find((conversation) =>
			conversation._id == message.senderId)?.profilePic;
		if (picture == null)
			picture = conversationsForSidebar.find((conversation) =>
				conversation._id == message.senderId)?.profilePic;
		return picture;
	}

	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? currentUser?.profilePic : selectedConversation?.profilePic;
	const groupPic = fromMe ? authUser.profilePic : findPic();
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={selectedConversation ? profilePic : groupPic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				<div className='chat-header text-red-600 text-xs flex gap-1 items-center'>{selectedConversation ? "" : findName()}</div>
				{isFile ? <GoDownload onClick={handleDownload} className="cursor-pointer" /> : ""}
				{isFile ? message.name : message.message}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
