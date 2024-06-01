import { useState } from "react";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useDeleteUser = () => {
    const [loading, setLoadingGroup] = useState(false);
    const { selectedGroup } = useGroup();

    const deleteUser = async ({ userId }) => {
        setLoadingGroup(true);
        try {
            const res = await fetch(`/api/group/deleteUser/${selectedGroup._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingGroup(false);
        }
    };

    return { deleteUser, loading };
};
export default useDeleteUser;
