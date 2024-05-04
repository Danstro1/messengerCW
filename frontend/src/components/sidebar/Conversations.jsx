import { useRef } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useListenMessages from "../../hooks/useListenMessages";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	useListenMessages();
	const lastMessageRef = useRef();

	return (
		<div className='py-2 mb-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<div key={conversation._id} ref={lastMessageRef}>
					<Conversation
						conversation={conversation}
						lastIdx={idx === conversations.length - 1}
					/>
				</div>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;
