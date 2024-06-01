import { useEffect, useRef, useState } from "react";
import useChangeProfile from "../../hooks/useChangeProfile";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";

const Profile = () => {

    const { currentUser, loading } = useGetCurrentUser();
    const { changeProfile } = useChangeProfile();

    const [inputs, setInputs] = useState({
        fullName: "",
        profilePic: "",
    });

    const filePicker = useRef(null);

    useEffect(() => {
        if (currentUser) {
            setInputs({
                fullName: currentUser.fullName,
                profilePic: "",
            });
        }
    }, [currentUser]);

    const handleFilePick = () => {
        filePicker.current.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await changeProfile(inputs);
        window.location.reload();
    };

    return (
        <div className='md:min-w-[450px] flex flex-col pr-1 items-center'>
            {loading ? "" :
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="text-4xl text-white mt-6">Profile</div>
                    <div className="avatar">
                        <div onClick={handleFilePick} className='w-20 mt-5 rounded-full cursor-pointer'>
                            <img src={currentUser?.profilePic} alt='group avatar' />
                        </div>
                    </div>
                    <input
                        onChange={(e) =>
                            setInputs({ ...inputs, profilePic: e.target.files[0] })
                        }
                        name="file"
                        className="hidden"
                        type="file"
                        ref={filePicker}
                        accept="image/*,.png,.jpg,.gif,.web"
                    />
                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            className="input h-8"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <button className='btn btn-block btn-sm mt-8 md:max-w-[200px]'>
                        Save Changes
                    </button>
                </form>
            }
        </div>
    );
}

export default Profile