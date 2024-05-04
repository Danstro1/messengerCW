import { create } from "zustand";

const useConversation = create((set) => ({
	conversationsForSidebar: [],
	setConversationsForSidebar: (conversationsForSidebar) => set({ conversationsForSidebar }),
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
