import mongoose, { Schema, Document } from 'mongoose';

interface IDelete extends Document {
    isDeleted: boolean;
    deleteDate: Date;
};

// interface IReaction extends Document {
//     sender: mongoose.Types.ObjectId;
//     date: Date;
// };

// interface IComment extends Document {
//     sender: mongoose.Types.ObjectId;
//     date: Date;
//     content: string;
// };

interface IPost extends Document {
    sender: mongoose.Types.ObjectId;
    date: Date;
    delete: IDelete;
    views: number;
    users: mongoose.Types.ObjectId[];
    tags: mongoose.Types.ObjectId[];
    location: string | null;
    content: string | null;
    attachments: string[];
    // reactions: IReaction[];
    // comments: IComment[];
}

const postSchema: Schema=new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required.'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required.'],
        default: Date.now,
    },
    delete: {
        type: {
        isDeleted: {
            type: Boolean,
            default: true,
        },
        deleteDate: {
            type: Date,
            default: Date.now,
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
        ref: 'User',
        trim: true,
        }],
        required: [true, 'User is required.'],
        maxlength: [100, 'You can only tag 100 users.'],
        default: [],
    },
    tags: {
        type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        trim: true,
        }],
        required: [true, 'Tags are required.'],
        maxlength: [50, 'You can only tag 50 tags.'],
        default: [],
        match: [/^[a-zA-Z0-9]+$/, 'Tag must be alphanumeric.'],
    },
    location: {
        type: String,
        trim: true,
        minlength: [3, 'Location must be at least 3 characters long.'],
        maxlength: [50, 'Location must be at most 50 characters long.'],
        default: null,
        match: [/^[a-zA-Z0-9]+$/, 'Location must be alphanumeric.'],
    },
    content: {
        type: String,
        maxlength: [1000, 'Content must be at most 1000 characters long.'],
        match: [/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/, 'Device client must contain only letters, numbers, and special characters.'],
        default: null,
    },
    attachments: {
        type: [{
        type: String,
        required: [true, 'Attachment is required.'],
        trim: true,
        maxlength: [256, 'Attachment must be at most 1000 characters long.'],
        match: [/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/, 'Invalid attachment url.'],
        }],
        required: false,
        maxlength: [10, 'You can only attach 10 files.'],
        default: [],
    },
    // reactions: {
    //     type: [{
    //     sender: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: [true, 'Sender is required.'],
    //     },
    //     date: {
    //         type: Date,
    //         required: [true, 'Date is required.'],
    //         default: Date.now,
    //     },
    //     }],
    //     required: true,
    //     _id: false,
    //     default: [],
    // },
    // comments: {
    //     type: [{
    //     sender: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: [true, 'Sender is required.'],
    //     },
    //     date: {
    //         type: Date,
    //         required: [true, 'Date is required.'],
    //         default: Date.now,
    //     },
    //     content: {
    //         type: String,
    //         required: [true, 'Content is required.'],
    //         minlength: [3, 'Content must be at least 3 characters long.'],
    //         maxlength: [1000, 'Content must be at most 1000 characters long.'],
    //         match: [/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/, 'Device client must contain only letters, numbers, and special characters.'],
    //     },
    //     }],
    //     required: true,
    //     _id: false,
    //     default: [],
    // },
});

const Post = mongoose.model<IPost>('Post', postSchema, 'posts');

export default Post;
export { IPost };
