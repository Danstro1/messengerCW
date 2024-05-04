import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, conversationsForSidebar, setConversationsForSidebar } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage, conversation) => {
			newMessage.shouldShake = true;
			//const sound = new Audio(notificationSound);
			//sound.play();
			if (conversation.messages.length == 1) {
				setConversationsForSidebar([...conversationsForSidebar, conversation])
			}
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages, conversationsForSidebar, setConversationsForSidebar]);
};
export default useListenMessages;
