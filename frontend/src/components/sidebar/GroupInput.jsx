import useGroup from "../../zustand/useGroup";


const GroupInput = () => {

    const {groupName, setGroupName} = useGroup();
 
	return (
		<div>
			<input
				type='text'
				placeholder='Group Name'
				className='input input-bordered input-sm w-full max-w-xs mb-2 bg-transparent text-gray-100 border-gray-400 placeholder:text-gray-200 border-x-0 border-t-0 rounded-none focus:outline-none focus:ring-0 focus:border-gray-600 focus:placeholder:text-gray-300'
				value={groupName}
				onChange={(e) => setGroupName(e.target.value)}
			/>
		</div>
	);
};
export default GroupInput;
