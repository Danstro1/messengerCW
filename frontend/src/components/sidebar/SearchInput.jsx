import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import ConversationsForSearch from "./ConversationsForSearch";

const SearchInput = () => {
	const { setSelectedConversation, search, setSearch } = useConversation();
	const { conversations } = useGetConversations();


	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase().trim()));
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<div className={`dropdown  ${search ? "dropdown-open" : ""}`}>
				<input
					type='text'
					placeholder='Search…'
					className='input input-bordered rounded-full'
					value={search}
					tabIndex={0}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<ul tabIndex={0} className="mt-1 dropdown-content z-[11] md:max-h-[300px] menu p-3 pr-2 shadow bg-base-100 rounded-box w-52">
					<div className="overflow-x-hidden pr-1">
						<ConversationsForSearch search={search}/>
					</div>
				</ul>
			</div>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
