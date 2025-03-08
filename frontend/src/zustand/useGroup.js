import { create } from "zustand";

const useGroup = create((set) => ({

	isGroupCreating: false,
	setisGroupCreating: (isGroupCreating) => set({ isGroupCreating }),

	groupUsersForCreating: [],
	setGroupUsersForCreating: (groupUsersForCreating) => set({ groupUsersForCreating }),

	groupSettings: false,
	setGroupSettings: (groupSettings) => set({ groupSettings }),

    groupName: "",
	setGroupName: (groupName) => set({ groupName }),


	groupsForSidebar: [],
	setGroupsForSidebar: (groupsForSidebar) => set({ groupsForSidebar }),

	selectedGroup: null,
	setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
	messages: [],
	setMessages: (messages) => set({ messages }),

	addedUsers: [],
	setAddedUsers: (addedUsers) => set({ addedUsers }),

	allUsers: null, 
	setAllUsers: (allUsers) => set({ allUsers }),
}));

export default useGroup;
