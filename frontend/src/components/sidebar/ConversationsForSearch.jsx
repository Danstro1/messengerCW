
import { useRef } from "react";
import useGetConversations from "../../hooks/useGetConversations.js";
import useListenNewConversations from "../../hooks/useListenNewConversations.js";
import Conversation from "./Conversation.jsx";

const ConversationsForSearch = () => {
	const { loading, conversationsForSearch, search} = useGetConversations();

	useListenNewConversations();
	const lastConversationRef = useRef();

	const isSearchValid = search.trim() !== '';

	const filteredConversations = isSearchValid ? conversationsForSearch.filter((conversation) =>
		conversation.fullName.toLowerCase().includes(search.toLowerCase().trim())
	) : [];

	return (
		<div className='py-2 mb-2 flex flex-col overflow-auto'>
			{filteredConversations.map((conversation, idx) => (
				<div key={conversation._id} ref={lastConversationRef}>
					<Conversation
						conversation={conversation}
						lastIdx={idx === filteredConversations.length - 1}
					/>
				</div>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default ConversationsForSearch;
