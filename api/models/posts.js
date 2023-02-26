const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required.'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        default: new Date(),
    },
    delete: {
        type: {
            isDeleted: {
                type: Boolean,
                default: true, // sets on creating
            },
            deleteDate: {
                type: Date,
                default: new Date(), // sets on creating
            },
        },
        default: {
            isDeleted: false,
            deleteDate: null,
        },
        _id: false,
    },
    views: {
        type: Number,
        required: [true, 'Views is required.'],
        default: 0,
    },
    users: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            trim: [true, 'User is not trimmed.'],
            ref: 'User', 
        }],
        required: [true, 'User is required.'],
        maxlenght: [100, 'You can only tag 100 users.'],
        default: [],
    },
    tags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            trim: [true, 'Tag is not trimmed.'],
            ref: 'Tag',
        }],
        required: true,
        maxlenght: [50, 'You can only tag 50 tags.'],
        default: [],
        match: [/^[a-zA-Z0-9]+$/, 'Tag must be alphanumeric.'],
    },
    location: {
        type: String,
        trim: [true, 'Location is not trimmed.'],
        minlenght: [3, 'Location must be at least 3 characters long.'],
        maxlenght: [50, 'Location must be at most 50 characters long.'],
        required: false,
        default: null,
        match: [/^[a-zA-Z0-9]+$/, 'Location must be alphanumeric.'],
    },
    content: {
        type: String,
        maxlenght: [1000, 'Content must be at most 1000 characters long.'],
        default: null,
    },
    attachments: {
        type: [{
            type: String,
            required: [true, 'Attachment is required.'],
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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Sender is required.'],
            },
            date: {
                type: Date,
                required: [true, 'Date is required.'],
                default: new Date(),
            },
        }],
        required: true,
        _id: false,
        default: [],
    },
    comments: {
        type: [{
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Sender is required.'],
            },
            date: {
                type: Date,
                required: [true, 'Date is required.'],
                default: new Date(),
            },
            content: {
                type: String,
                required: [true, 'Content is required.'],
                minlenght: [3, 'Content must be at least 3 characters long.'],
                maxlenght: [1000, 'Content must be at most 1000 characters long.'],
            },
        }],
        required: true,
        _id: false,
        default: [],
    },
});
const Post=mongoose.model('Post', postSchema, 'posts');

module.exports=Post;