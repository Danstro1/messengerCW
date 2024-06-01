import useConversation from "../../zustand/useConversation";
import useGroup from "../../zustand/useGroup";

const Group = ({ group }) => {
    const {setSelectedConversation} = useConversation();
	const {selectedGroup, setSelectedGroup} = useGroup();

	const isSelected = selectedGroup?._id === group._id;

    const handleSelection = () => {
        setSelectedConversation(null);
        setSelectedGroup(group)
    }

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => handleSelection()}
			>
				<div className="avatar">
					<div className='w-12 rounded-full'>
						<img src={group.groupPic}  alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{group.name}</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default Group;
