import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useGroup from "../zustand/useGroup";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const {setSearch} = useConversation();
	const {setGroupUsersForCreating, setisGroupCreating, setGroupName} = useGroup();

	const logout = async () => {
		setLoading(true);
		setGroupUsersForCreating([]);
		setisGroupCreating(false);
		setSearch("");
		setGroupName("")
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
