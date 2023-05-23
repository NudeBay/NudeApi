import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    date: Date;
    isReceived: boolean;
    isRead: boolean;
}

const messageSchema=new Schema<IMessage>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required.'],
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver is required.'],
    },
    message: {
        type: String,
        trim: true,
        required: [true, 'Message is required.'],
        minlength: [1, 'Message content must be at least 1 characters long.'],
        maxlength: [1000, 'Message content must be at most 1000 characters long.'],
        // match: [/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/, 'Device client must contain only letters, numbers, and special characters.'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        default: Date.now,
    },
    isReceived: {
        type: Boolean,
        required: [true, 'Is received is required.'],
        default: false,
    },
    isRead: {
        type: Boolean,
        required: [true, 'Is read is required.'],
        default: false,
    },
});

const Message=mongoose.model<IMessage>('Message', messageSchema, 'messages');

export default Message;
export { IMessage };
