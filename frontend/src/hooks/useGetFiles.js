import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useGetFiles = () => {
	const [fileLoading, setFileLoading] = useState(false);
	const { files, setFiles, selectedConversation } = useConversation();
	const { selectedGroup } = useGroup();

	const url = `/api/${selectedConversation ? `messages/getFiles/${selectedConversation._id}` :  `group/getFiles/${selectedGroup._id}`}`

	useEffect(() => {
		const getFiles = async () => {
			setFileLoading(true);
			try {
				const res = await fetch(url);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
                setFiles(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setFileLoading(false);
			}
		};

		if (selectedConversation?._id || selectedGroup?._id) getFiles();
	}, [selectedConversation, selectedConversation?._id, selectedGroup?._id, setFiles, url]);

	return { files, fileLoading };
};
export default useGetFiles;
