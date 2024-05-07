import { useState } from "react";
import toast from "react-hot-toast";

const useCreateGroup = () => {
    const [loadingGroup, setLoadingGroup] = useState(false);

    const createGroup = async ({ name, participants }) => {
        setLoadingGroup(true);
        try {
            const res = await fetch(`/api/group/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, participants }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoadingGroup(false);
        }
    };

    return { createGroup, loadingGroup };
};
export default useCreateGroup;
