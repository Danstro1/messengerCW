import ConversationsForSidebar from "./ConversationsForSidebar";
import Footer from "./Footer";
import GroupInput from "./GroupInput";
import SearchInput from "./SearchInput";

const Sidebar = (props) => {

	if(props.isGroup){
		return (
			<div className='border-r md:min-w-[300px] border-slate-500 p-4 flex flex-col'>
				<GroupInput />
				<ConversationsForSidebar />
				<Footer />
			</div>
		);
	}
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<ConversationsForSidebar/>
			<Footer />
		</div>
	);
};
export default Sidebar;
