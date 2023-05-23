import mongoose, { Document, Schema } from 'mongoose';

interface IFriendship extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  creationDate: Date;
  isAccepted: boolean;
};

const friendshipSchema=new Schema<IFriendship>({
    sender: {
        type: Schema.Types.ObjectId,
        required: [true, 'Sender is required.'],
        ref: 'User',
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: [true, 'Receiver is required.'],
        ref: 'User',
    },
    creationDate: {
        type: Date,
        required: [true, 'Creation date is required.'],
        default: Date.now,
    },
    isAccepted: {
        type: Boolean,
        required: [true, 'Status is required.'],
        default: false,
    },
});

const Friendship=mongoose.model<IFriendship>('Friendship', friendshipSchema, 'friendships');

export default Friendship;
export { IFriendship };
