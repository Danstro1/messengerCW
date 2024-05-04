import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { BsPencilSquare } from "react-icons/bs";

const Footer = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<div className="flex">
					<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
					<BsPencilSquare className='w-5 h-5 text-white cursor-pointer ml-auto' onClick={logout} />
				</div>

			) : (
				<div className="flex">
					<span className='loading loading-spinner'></span>
					<span className='loading loading-spinner ml-auto'></span>
				</div>
			)}
		</div>
	);
};
export default Footer;
