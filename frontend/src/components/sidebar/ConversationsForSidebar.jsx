import { useRef } from "react";
import Conversation from "./Conversation.jsx";
import useGetConversationsForSidebar from "../../hooks/useGetConversationsForSidebar";
import useListenNewConversations from "../../hooks/useListenNewConversations";
import useGroup from "../../zustand/useGroup";
import Group from "./Group.jsx";
import useGetGroupsForSidebar from "../../hooks/useGetGroups";

const ConversationsForSidebar = () => {
	const { loading, conversationsForSidebar } = useGetConversationsForSidebar();
	const { groupsForSidebar } = useGetGroupsForSidebar();
	const { isGroupCreating } = useGroup();

	useListenNewConversations();
	const lastConversationRef = useRef();

	return (
		<div className='py-2 mb-3 flex flex-col overflow-auto'>
			{isGroupCreating ? "" : (groupsForSidebar.map((group) => (
				<div key={group._id}>
					<Group
						group={group}
					/>
				</div>)
			))}
			{conversationsForSidebar.map((conversation, idx) => (
				<div key={conversation._id} ref={lastConversationRef}>
					<Conversation
						isGroupCreating={isGroupCreating}
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
