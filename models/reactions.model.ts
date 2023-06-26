import mongoose, { Schema, Document } from 'mongoose';

interface IReaction extends Document {
    sender: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    date: Date;
};

const reactionSchema: Schema=new Schema({
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
});

const Reaction = mongoose.model<IReaction>('Reaction', reactionSchema, 'reactions');

export default Reaction;
export { IReaction };
