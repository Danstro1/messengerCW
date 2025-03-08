import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { selectedGroup } = useGroup();

	const url = `/api/${selectedConversation ? `messages/${selectedConversation._id}` :  `group/get/${selectedGroup._id}`}`

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(url);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id || selectedGroup?._id) getMessages();
	}, [selectedConversation, selectedConversation?._id, selectedGroup?._id, setMessages, url]);

	return { messages, loading, setLoading };
};
export default useGetMessages;
