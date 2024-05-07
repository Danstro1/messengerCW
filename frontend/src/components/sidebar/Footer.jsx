import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { BsPencilSquare } from "react-icons/bs";
import useGroup from "../../zustand/useGroup";
import useCreateGroup from "../../hooks/useCreateGroup";

const Footer = () => {
	const { loading, logout } = useLogout();
	const { isGroupCreating, setisGroupCreating, setGroupUsersForCreating, groupUsersForCreating, groupName, setGroupName } = useGroup();
	const { createGroup, loadingGroup } = useCreateGroup();

	const handleGroupCreating = () => {
		if (isGroupCreating) {
			setGroupUsersForCreating([]);
			setisGroupCreating(false)
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

	return (
		<div className='mt-auto'>
			{!loading || !loadingGroup ? (
				<div className="flex items-center max-h-6 justify-between">
					<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />				
					{groupUsersForCreating.length !== 0 && isGroupCreating && groupName.trim() ?
					<button className='btn btn-sm border border-slate-700' disabled={loading || loadingGroup} onClick={creatingGroup}>
						{loading || loadingGroup ? <span className='loading loading-spinner'></span> : "Create Group"}
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
