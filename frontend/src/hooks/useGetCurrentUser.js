import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetCurrentUser = () => {
    const [loading, setLoadingGroup] = useState(false);

    const { profile, } = useConversation();

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const getCurrentUser = async () => {
            setLoadingGroup(true);
            try {
                const res = await fetch("/api/users/getCurrent");
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setCurrentUser(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoadingGroup(false);
            }
        };
        getCurrentUser();
    }, [profile])

    return { currentUser, loading };
};
export default useGetCurrentUser;
