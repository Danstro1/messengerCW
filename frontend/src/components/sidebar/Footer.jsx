import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { BsPencilSquare } from "react-icons/bs";
import useGroup from "../../zustand/useGroup";
import useCreateGroup from "../../hooks/useCreateGroup";
import useAddUsers from "../../hooks/useAddUsers";
import useConversation from "../../zustand/useConversation";

const Footer = () => {
	const { loading, logout } = useLogout();
	const { isGroupCreating, setisGroupCreating, setGroupUsersForCreating, groupUsersForCreating,
		groupName, setGroupName, groupSettings, setAddedUsers } = useGroup();
	const { conversationsForSidebar } = useConversation();
	const { createGroup, loadingGroup, } = useCreateGroup();
	const { addUsers } = useAddUsers();

	const handleGroupCreating = () => {
		if(groupSettings) return;
		if (isGroupCreating) {
			setGroupUsersForCreating([]);
			setisGroupCreating(false)
			setGroupName("")
		}
		else {
			setisGroupCreating(true)
		}
	}

	const creatingGroup = async (e) => {
		e.preventDefault();
		if (!groupName || !groupUsersForCreating) return;
		await createGroup({ name: groupName, participants: groupUsersForCreating });
		setGroupUsersForCreating([]);
		setisGroupCreating(false)
		setGroupName("")
	}

	const addingUsers = async (e) => {
		e.preventDefault();
		if (!groupSettings && !groupUsersForCreating) return;
		setAddedUsers([...conversationsForSidebar.filter(conversation => groupUsersForCreating.includes(conversation._id))])
		await addUsers({ usersId: groupUsersForCreating });
		setGroupUsersForCreating([]);
		setisGroupCreating(false)
		//setGroupSettings(false);
	}

	return (
		<div className='mt-auto'>
			{!loading || !loadingGroup ? (
				<div className="flex items-center max-h-6 justify-between">
					<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
					{groupUsersForCreating.length !== 0 && isGroupCreating && groupName.trim() ?
						<button className='btn btn-sm border border-slate-700' disabled={loading || loadingGroup} onClick={creatingGroup}>
							{loading || loadingGroup ? <span className='loading loading-spinner'></span> : "Create Group"}
						</button> : ""}
					{groupUsersForCreating.length !== 0 && groupSettings ?
						<button className='btn btn-sm border border-slate-700' disabled={loading || loadingGroup} onClick={addingUsers}>
							{loading || loadingGroup ? <span className='loading loading-spinner'></span> : "Add Users"}
						</button> : ""}
					<BsPencilSquare className='w-5 h-5 text-white cursor-pointer' onClick={handleGroupCreating} />
				</div>

			) : (
				<div className="flex">
					<span className='loading loading-spinner'></span>
					<span className='loading loading-spinner'></span>
				</div>
			)}
		</div>
	);
};
export default Footer;
