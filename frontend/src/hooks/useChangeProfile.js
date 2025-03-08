import { useState } from "react";
import toast from "react-hot-toast";

const useChangeProfile = () => {
    const [loading, setLoading] = useState(false);

    const changeProfile = async ({ fullName, profilePic }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('profilePic', profilePic);

            const res = await fetch(`/api/users/change`, {
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

    return { loading, changeProfile };
};
export default useChangeProfile;
