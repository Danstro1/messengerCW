import { create } from "zustand";

const useConversation = create((set) => ({
	conversationsForSearch: [],
	setConversationsForSearch: (conversationsForSearch) => set({ conversationsForSearch }),

	conversationsForSidebar: [],
	setConversationsForSidebar: (conversationsForSidebar) => set({ conversationsForSidebar }),
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),

	search: '', 
	setSearch: (search) => set({ search }),

	files: [],
	setFiles: (files) => set({ files }),

	profile: false,
	setProfile: (profile) => set({ profile }),
}));

export default useConversation;
