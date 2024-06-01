import { useState } from "react";
import toast from "react-hot-toast";
import useGroup from "../zustand/useGroup";

const useSetGroupPicture = () => {
    const [loading, setLoading] = useState(false);
    const { selectedGroup } = useGroup();

    const setGroupNameAndPic = async ({ name, groupPic }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('groupPic', groupPic);

            const res = await fetch(`/api/group/setGroupNP/${selectedGroup._id}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, setGroupNameAndPic };
};
export default useSetGroupPicture;
