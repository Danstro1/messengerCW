import { useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";
import Conversation from "./Conversation";
import useGetConversationsForSidebar from "../../hooks/useGetConversationsForSidebar";

const ConversationsForSidebar = () => {
	const { loading, conversationsForSidebar } = useGetConversationsForSidebar();

	useListenMessages();
	const lastMessageRef = useRef();

	return (
		<div className='py-2 mb-2 flex flex-col overflow-auto'>
			{conversationsForSidebar.map((conversation, idx) => (
				<div key={conversation._id} ref={lastMessageRef}>
					<Conversation
						conversation={conversation}
						lastIdx={idx === conversationsForSidebar.length - 1}
					/>
				</div>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default ConversationsForSidebar;
