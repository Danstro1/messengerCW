import { useEffect, useRef, useState } from "react";
import useGroup from "../../zustand/useGroup";
import useConversation from "../../zustand/useConversation";
import Conversation from "../sidebar/Conversation";
import useSetGroupPicture from "../../hooks/useSetGroupPicture";

const GroupSettings = (groupSettings) => {

    const { selectedGroup, setisGroupCreating, isGroupCreating, allUsers, setAllUsers, addedUsers, setAddedUsers, groupUsersForCreating } = useGroup();
    const { conversationsForSidebar, conversationsForSearch } = useConversation();
    const {setGroupNameAndPic} = useSetGroupPicture();

    useEffect(() => {
        const initialUsers = allUsers == null ? [...conversationsForSearch, ...conversationsForSidebar].filter((conversation) =>
            selectedGroup?.participants.includes(conversation._id)) : [...allUsers, ...addedUsers];
        setAllUsers(initialUsers);
        setAddedUsers([]);
    }, [selectedGroup, groupUsersForCreating]);

    const filePicker = useRef(null);

    const [inputs, setInputs] = useState({
        name: "",
        groupPic: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setGroupNameAndPic(inputs);
        window.location.reload();
    };

    const handleFilePick = () => {
        filePicker.current.click();
    }

    const handleUserAdding = () => {
        if (isGroupCreating) {
            setisGroupCreating(false)
        } else {
            setisGroupCreating(true);
        }
    };

    return (
        <div className="px-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-20">
                    <div className="ml-3">
                        <label className="label p-2">
                            <span className="text-base label-text">Group Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Group Name"
                            className="input h-8"
                            value={inputs.name}
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        />
                    </div>
                    <div className="avatar">
                        <div onClick={handleFilePick} className='w-16 rounded-full cursor-pointer'>
                            <img src={selectedGroup?.groupPic} alt='group avatar' />
                        </div>
                    </div>
                    <input
                        onChange={(e) =>
                            setInputs({ ...inputs, groupPic: e.target.files[0] })
                        }
                        name="file"
                        className="hidden"
                        type="file"
                        ref={filePicker}
                        accept="image/*,.png,.jpg,.gif,.web"
                    />
                </div>
                <button className='btn btn-block btn-sm mt-4 md:max-w-[200px] ml-28'>
                    Save Changes
                </button>
            </form>
            <div className="flex flex-col md:max-h-[300px] overflow-auto mt-5">
                {allUsers?.map((conversation, idx) => (
                    <div key={conversation._id}>
                        <Conversation
                            groupSettings={groupSettings}
                            conversation={conversation}
                            lastIdx={idx === conversationsForSidebar.length - 1}
                        />
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handleUserAdding} className='btn btn-block btn-sm mt-2 border border-slate-700'>
                    Add User
                </button>
            </div>
        </div>
    );
};

export default GroupSettings;