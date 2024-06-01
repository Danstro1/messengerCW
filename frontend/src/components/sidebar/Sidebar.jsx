import useGroup from "../../zustand/useGroup.js";
import ConversationsForSidebar from "./ConversationsForSidebar.jsx";
import Footer from "./Footer.jsx";
import GroupInput from "./GroupInput.jsx";
import SearchInput from "./SearchInput.jsx";

const Sidebar = (props) => {

	const { groupSettings } = useGroup();

	if (props.isGroup) {
		return (
			<div className='border-r md:min-w-[300px] border-slate-500 p-4 flex flex-col'>
				{groupSettings ? "" : <GroupInput />}
				<ConversationsForSidebar />
				<Footer />
			</div>
		);
	}
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<ConversationsForSidebar />
			<Footer />
		</div>
	);
};
export default Sidebar;
