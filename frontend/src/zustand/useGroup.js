import { create } from "zustand";

const useGroup = create((set) => ({

    isGroupCreating: false,
	setisGroupCreating: (isGroupCreating) => set({ isGroupCreating }),

	groupUsersForCreating: [],
	setGroupUsersForCreating: (groupUsersForCreating) => set({ groupUsersForCreating }),

    groupName: "",
	setGroupName: (groupName) => set({ groupName }),


	groupsForSidebar: [],
	setGroupsForSidebar: (groupsForSidebar) => set({ groupsForSidebar }),

	selectedGroup: null,
    setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useGroup;
