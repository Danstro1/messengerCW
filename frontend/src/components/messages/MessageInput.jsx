import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { FiPaperclip } from "react-icons/fi";
import useSendFile from "../../hooks/useSendFile";

const MessageInput = () => {
	//const [selectedFile, setSelectedFile] = useState(null);
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const { sendFile } = useSendFile();

	const filePicker = useRef(null);


	const handleSendFile = async (e) => {
		e.preventDefault();
		await sendFile(e.target.files[0])
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	const handleFilePick = () => {
		filePicker.current.click();
	}

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<FiPaperclip onClick={handleFilePick} className='w-7 h-6 absolute inset-y-2 start-2 flex items-center pe-3 cursor-pointer' />
				<input onChange={handleSendFile} name="file" className="hidden" type="file" ref={filePicker} />
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pl-8 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
