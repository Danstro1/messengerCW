import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useGetGroupsForSidebar = () => {
    const [loading, setLoading] = useState(false); 
    const { groupsForSidebar, setGroupsForSidebar } = useGroup();


    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/group/get`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setGroupsForSidebar(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, [setGroupsForSidebar]);

    return { loading, groupsForSidebar };
};
export default useGetGroupsForSidebar;
