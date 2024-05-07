import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);

	const {conversationsForSearch, setConversationsForSearch, search, setSearch} = useConversation();


	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/users/conversation`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversationsForSearch(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [setConversationsForSearch]);

	return { loading, conversationsForSearch, search, setSearch };
};
export default useGetConversations;
