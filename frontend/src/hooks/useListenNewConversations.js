import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenNewConversations = () => {
	const { socket } = useSocketContext();
	const { selectedConversation, conversationsForSidebar, setConversationsForSidebar,
		conversationsForSearch, setConversationsForSearch, setSearch } = useConversation();

	useEffect(() => {
		socket?.on("createConversation", (reciever, sender) => {
			if (selectedConversation && selectedConversation._id == reciever._id) {
				setConversationsForSidebar([reciever, ...conversationsForSidebar])
				const filteredConversationsForSearch = conversationsForSearch.filter(conversation => conversation._id !== reciever._id);
				setConversationsForSearch(filteredConversationsForSearch);
			}
			else {
				setConversationsForSidebar([sender, ...conversationsForSidebar])
				const filteredConversationsForSearch = conversationsForSearch.filter(conversation => conversation._id !== sender._id);
				setConversationsForSearch(filteredConversationsForSearch);
			}
			setSearch('')
		});

		return () => socket?.off("createConversation");
	}, [socket, conversationsForSidebar, selectedConversation, setConversationsForSidebar, conversationsForSearch, setConversationsForSearch, setSearch]);
};
export default useListenNewConversations;
