import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useGroup from "../../zustand/useGroup";

const Home = () => {
	const {isGroupCreating} = useGroup()

	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar isGroup={isGroupCreating}/>
			<MessageContainer />
		</div>
	);
};
export default Home;
