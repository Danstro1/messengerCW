import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useGetFiles = () => {
	const [fileLoading, setFileLoading] = useState(false);
	const { files, setFiles, selectedConversation, setSelectedConversation } = useConversation();
	const { selectedGroup } = useGroup();

	const url = `/api/${selectedConversation ? `messages/getFiles/${selectedConversation._id}` :  `group/getFiles/${selectedGroup._id}`}`

	useEffect(() => {
		const abortController = new AbortController();

		const getFiles = async () => {
			setFileLoading(true);
			try {
				const res = await fetch(url, { signal: abortController.signal });
				if (!res.ok) throw new Error('Network response was not ok');
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setFiles(data);
			} catch (error) {
				if (error.name !== 'AbortError') {
					toast.error(error.message);
				}
			} finally {
				setFileLoading(false);
			}
		};

		if (selectedConversation?._id || selectedGroup?._id) getFiles();

		return () => {
			abortController.abort();
		};
		
	}, [selectedConversation, selectedConversation?._id, selectedGroup?._id, setFiles, url, setSelectedConversation]);

	return { files, fileLoading };
};
export default useGetFiles;
