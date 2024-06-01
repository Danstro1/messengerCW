import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useSendFile = () => {
	const [loading, setLoading] = useState(false);
	const { selectedConversation } = useConversation();
	const { selectedGroup } = useGroup();

	const url = `/api/${selectedConversation ? `messages/upload/${selectedConversation._id}` :  `group/upload/${selectedGroup._id}`}`
	const sendFile = async (file) => {
		setLoading(true);
		if(!file) return;
		try {
            const formData = new FormData();
            formData.append('file', file);
    
			const res = await fetch(url, {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendFile, loading };
};
export default useSendFile;
