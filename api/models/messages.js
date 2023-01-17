const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: [mongoose.Schema.Types.ObjectId, 'Sender is not an ObjectId.'],
        ref: 'User',
        required: true,
    },
    receiver: {
        type: [mongoose.Schema.Types.ObjectId, 'Receiver is not an ObjectId.'],
        ref: 'User',
        required: true,
    },
    message: {
        type: [String, 'Message is not a string.'],
        required: true,
    },
    date: {
        type: [Date, 'Date is not a date.'],
        required: true,
        default: new Date(),
    },
    isRead: {
        type: [Boolean, 'Is read is not a boolean.'],
        required: true,
        default: false,
    },
});
const Message=mongoose.model('Message',messageSchema);

module.exports=Message;