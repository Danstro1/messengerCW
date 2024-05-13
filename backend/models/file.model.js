import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
	{
        name: {
            type: String,
            required: true,
        },
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			}
		],
		file: {
			type: Buffer,
			required: true,
		},
	},
	{ timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
