import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversationsForSidebar = () => {
	const [loading, setLoading] = useState(false);
	const {conversationsForSidebar, setConversationsForSidebar, messages} = useConversation();


	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/users/sidebar`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversationsForSidebar(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [setConversationsForSidebar]);

	return { loading, conversationsForSidebar, messages };
};
export default useGetConversationsForSidebar;
