import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
    sender: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    date: Date;
    content: string;
};

const commentSchema: Schema=new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required.'],
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required.'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        default: Date.now,
    },
    content: {
        type: String,
        required: [true, 'Content is required.'],
        minlength: [3, 'Content must be at least 3 characters long.'],
        maxlength: [1000, 'Content must be at most 1000 characters long.'],
        match: [/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/, 'Device client must contain only letters, numbers, and special characters.'],
    },
});

const Comment = mongoose.model<IComment>('Comment', commentSchema, 'comments');

export default Comment;
export { IComment };
