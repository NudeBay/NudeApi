const mongoose=require('mongoose');

const friendshipSchema=mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Sender is required.'],
        ref: 'User',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Receiver is required.'],
        ref: 'User',
    },
    creationDate: {
        type: Date,
        required: [true, 'Creation date is required.'],
        default: new Date(),
    },
    isAccepted: {
        type: Boolean,
        required: [true, 'Status is required.'],
        default: false,
    },
});
const Friendship=mongoose.model('Friendship', friendshipSchema, 'friendships');

module.exports=Friendship;