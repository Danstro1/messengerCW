import { useState } from "react";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useAddUsers = () => {
    const [loading, setLoadingGroup] = useState(false);
    const { selectedGroup } = useGroup();

    const addUsers = async ({ usersId }) => {
        setLoadingGroup(true);
        try {
            const res = await fetch(`/api/group/addUsers/${selectedGroup._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usersId }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingGroup(false);
        }
    };

    return { addUsers, loading };
};
export default useAddUsers;
