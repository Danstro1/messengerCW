import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { GoDownload } from "react-icons/go";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const isFile = message.file;
 
	if (isFile) {
		const blob = new Blob([new Uint8Array(message.file.data)], { type: 'text/html' });
		var url = window.URL.createObjectURL(blob);
	}

	const handleDownload = () => {
		const downloadLink = document.createElement('a');
		downloadLink.href = url;
		downloadLink.download = message.name;
		document.body.appendChild(downloadLink); 
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";


	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{isFile ? <GoDownload onClick={handleDownload} className="cursor-pointer" /> : ""}
				{isFile ? message.name : message.message}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
