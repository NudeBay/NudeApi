const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const Message=mongoose.model('Message',messageSchema);

module.exports=Message;