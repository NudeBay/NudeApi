const mongoose=require('mongoose');

const friendshipSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: [mongoose.Schema.Types.ObjectId, 'Sender is not an ObjectId.'],
        required: [true, 'Sender is required.'],
        unique: false,
        ref: 'User',
    },
    receiver: {
        type: [mongoose.Schema.Types.ObjectId, 'Receiver is not an ObjectId.'],
        required: [true, 'Receiver is required.'],
        unique: false,
        ref: 'User',
    },
    creationDate: {
        type: [Date, 'Creation date is not a date.'],
        required: [true, 'Creation date is required.'],
        unique: false,
        default: new Date(),
    },
    status: {
        type: [String, 'Status is not a string.'],
        enum: {
            values: ['pending', 'accepted', 'blocked'],
            message: 'Status must be pending, accepted, or blocked.',
        },
        required: [true, 'Status is required.'],
        unique: false,
        default: 'pending',
    },
});
const Friendship=mongoose.model('Friendship', friendshipSchema);

module.exports=Friendship;