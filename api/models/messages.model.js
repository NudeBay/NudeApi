const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required.'],
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Receiver is required.'],
    },
    message: {
        type: String,
        trim: [true, 'Message content must be trimmed.'],
        required: [true, 'Message is required.'],
        minlength: [1, 'Message content must be at least 1 characters long.'],
        maxlength: [1000, 'Message content must be at most 1000 characters long.'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        default: new Date(),
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
const Message=mongoose.model('Message', messageSchema, 'messages');

module.exports=Message;