import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useGetFiles from "../../hooks/useGetFiles";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const { files, fileLoading } = useGetFiles();

	const allMessages = messages.concat(files).sort((a, b) => {
		return new Date(a.createdAt) - new Date(b.createdAt);
	});

	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages, files]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && !fileLoading &&
				allMessages.length > 0 &&
				allMessages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
			{loading || fileLoading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && !fileLoading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
