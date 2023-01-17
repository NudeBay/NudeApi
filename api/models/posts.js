const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: [mongoose.Schema.Types.ObjectId, 'Invalid sender.'],
        ref: 'User',
        required: [true, 'Sender is required.'],
    },
    date: {
        type: [Date, 'Invalid date'],
        required: true,
        default: new Date(),
    },
    views: {
        type: [Number, 'Invalid views number.'],
        required: true,
        default: 0,
    },
    users: {
        type: [{
            type: [mongoose.Schema.Types.ObjectId, 'Invalid user.'],
            trim: [true, 'User is not trimmed.'],
            ref: 'User', 
        }],
        required: true,
        maxlenght: [100, 'You can only tag 100 users.'],
        default: [],
    },
    tags: {
        type: [{
            type: [mongoose.Schema.Types.ObjectId, 'Invalid tag.'],
            trim: [true, 'Tag is not trimmed.'],
            ref: 'Tag',
        }],
        required: true,
        maxlenght: [50, 'You can only tag 50 tags.'],
        default: [],
        match: [/^[a-zA-Z0-9]+$/, 'Tag must be alphanumeric.'],
    },
    location: {
        type: [String, 'Invalid location.'],
        trim: [true, 'Location is not trimmed.'],
        minlenght: [3, 'Location must be at least 3 characters long.'],
        maxlenght: [50, 'Location must be at most 50 characters long.'],
        required: false,
        default: null,
        match: [/^[a-zA-Z0-9]+$/, 'Location must be alphanumeric.'],
    },
    content: {
        type: [String, 'Invalid content.'],
        required: false,
        maxlenght: [1000, 'Content must be at most 1000 characters long.'],
        default: null,
    },
    attachments: {
        type: [{
            type: [String, 'Invalid attachment.'],
            required: true,
            trim: [true, 'Attachment is not trimmed.'],
            maxlenght: [256, 'Attachment must be at most 1000 characters long.'],
            match: [/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/, 'Invalid attachment url.'],
        }],
        required: false,
        maxlenght: [10, 'You can only attach 10 files.'],
        default: [],
    },
    reactions: {
        type: [{
            sender: {
                type: [mongoose.Schema.Types.ObjectId, 'Invalid sender.'],
                ref: 'User',
                required: [true, 'Sender is required.'],
            },
            date: {
                type: [Date, 'Invalid date'],
                required: true,
                default: new Date(),
            },
        }],
        required: true,
        default: [],
    },
    comments: {
        type: [{
            sender: {
                type: [mongoose.Schema.Types.ObjectId, 'Invalid sender.'],
                ref: 'User',
                required: [true, 'Sender is required.'],
            },
            date: {
                type: [Date, 'Invalid date'],
                required: true,
                default: new Date(),
            },
            content: {
                type: [String, 'Invalid content.'],
                required: true,
                minlenght: [3, 'Content must be at least 3 characters long.'],
                maxlenght: [1000, 'Content must be at most 1000 characters long.'],
            },
        }],
        required: true,
        default: [],
    },
});
const Post=mongoose.model('Post', postSchema);

module.exports=Post;