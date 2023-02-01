const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    nickname: {
        type: String,
        trim: [true, 'Nickname is not trimmed.'],
        minlength: [3, 'Nickname must be at least 3 characters long.'],
        maxlength: [32, 'Nickname must be at most 32 characters long.'],
        default: 'Anonymous', // ! Maybe replace with random nickname generator
        match: [/^[a-zA-Z0-9_]+$/, 'Nickname must be alphanumeric.'],
    },
    tag: {
        type: String,
        trim: [true, 'Tag is not trimmed.'],
        length: [4, 'Tag must be 4 characters long.'],
        default: '#0000', // ! Replace with random tag generator
        match: [/^#[0-9]{4}$/, 'Tag must be in the format #0000.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: [true, 'Email is not trimmed.'],
        minlength: [5, 'Email must be at least 5 characters long.'],
        maxlength: [64, 'Email must be at most 64 characters long.'],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email must be in the format'],
    },
    phone: {
        type: String,
        trim: [true, 'Phone is not trimmed.'],
        minlength: [5, 'Phone must be at least 5 characters long.'],
        maxlength: [32, 'Phone must be at most 32 characters long.'],
        match: [/^[+][0-9]{1,3}[0-9]{5,30}$/, 'Phone must be in the format'],  
    },
    birthdate: {
        type: Date,
        trim: [true, 'Birthdate is not trimmed.'],
        minlength: [5, 'Birthdate must be at least 5 characters long.'],
        maxlength: [32, 'Birthdate must be at most 32 characters long.'],
        match: [/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'Birthdate must be in the format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: [true, 'Password is not trimmed.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [64, 'Password must be at most 64 characters long.'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'],
    },
    badges: {
        type: [{
            type: String,
            enum: {
                values: ['Owner','Admin','Mod','Verificated','PussyPass'],
                message: 'Invalid badge',
            },
        }],
        maxlength: [32, 'User cannot have more than 32 badges.'],
        default: [],
    },
    aboutMe: {
        type: String,
        maxlength: [256, 'About me must be at most 256 characters long.'],
        default: '',
    },
    status: {
        type: String,
        maxlength: [32, 'Status must be at most 32 characters long.'],
        default: '',
    },
    profilePicture: { // ! beta
        type: String,
        trim: [true, 'Profile picture url is not trimmed.'],
        maxlength: [256, 'Profile picture url must be at most 256 characters long.'],
        default: null,
        match: [/^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/[a-zA-Z0-9-_.]+$/, 'Profile picture url must be in the format'],
    },
    backgroundPicture: { // ! beta
        type: String,
        trim: [true, 'Background picture url is not trimmed.'],
        maxlength: [256, 'Background picture url must be at most 256 characters long.'],
        default: null,
        match: [/^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/[a-zA-Z0-9-_.]+$/, 'Background picture url must be in the format'],
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
    bans: {
        type: [{
            banDate: {
                type: Date,
                required: [true, 'Ban date is required.'],
                default: new Date(), // sets on creating
            },
            banReason: {
                type: String,
                required: [true, 'Ban reason is required.'],
                trim: [true, 'Ban reason is not trimmed.'],
                minlength: [8, 'Ban reason must be at least 8 characters long.'],
                maxlength: [512, 'Ban reason must be at most 256 characters long.'],
            },
            banExpirationDate: {
                type: Date,
                required: [true, 'Ban expiration date is required.'],
            },
        }],
        _id: false,
        default: [],
    },
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Following is required.'],
            ref: 'User',
        }],
        maxlength: [100, 'User cannot follow more than 100 users.'],
        default: [],
    },
    saved: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Saved is required.'],
            ref: 'Post',
        }],
        maxlength: [100, 'User cannot save more than 100 posts.'],
        default: [],
    },
    blocked: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Blocked is required.'],
            ref: 'User',
        }],
        maxlength: [100, 'User cannot block more than 100 users.'],
        default: [],
    },
    muted: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Muted is required.'],
            ref: 'User',
        }],
        maxlength: [100, 'User cannot mute more than 100 users.'],
        default: [],
    },
    settings: {
        type: {
            darkMode: {
                type: Boolean,
                required: [true, 'Dark mode is required.'],
            },
            language: {
                type: String,
                required: [true, 'Language is required.'],
                trim: [true, 'Language is not trimmed.'],
                length: [2, 'Language must be 2 characters long.'],
                match: [/^[a-zA-Z]+$/, 'Language must be alphabetic.'],
                default: 'en',
            },
            allowGore: {
                type: Boolean,
                required: [true, 'Allow gore is required.'],
            },
            allowNSFW: {
                type: Boolean,
                required: [true, 'Allow NSFW is required.'],
            },
            favouriteTags: {
                type: [{
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'Favourite tag is required.'],
                    ref: 'Tag',
                }],
                maxlength: [25, 'User cannot have more than 25 favourite tags.'],
            },
            notifications: {
                type: {
                    newPost: {
                        type: Boolean,
                        required: [true, 'New post is required.'],
                    },
                    newFollower: {
                        type: Boolean,
                        required: [true, 'New follower is required.'],
                    },
                    newComment: {
                        type: Boolean,
                        required: [true, 'New comment is required.'],
                    },
                    newLike: {
                        type: Boolean,
                        required: [true, 'New like is required.'],
                    },
                    newMessage: {
                        type: Boolean,
                        required: [true, 'New message is required.'],
                    },
                    newFriendRequest: {
                        type: Boolean,
                        required: [true, 'New friend request is required.'],
                    },
                },
                _id: false,
            },
        },
        default: {
            darkMode: true,
            language: 'en',
            allowGore: false,
            allowNSFW: true,
            favouriteTags: [],
            notifications: {
                newPost: true,
                newFollower: true,
                newComment: true,
                newLike: true,
                newMessage: true,
                newFriendRequest: true,
            },
        },
        _id: false,
    },
    notifications: {
        type: [{
            type: {
                type: String,
                required: true,
                minlength: [8, 'Notification type must be at least 8 characters long.'],
                maxlength: [32, 'Notification type must be at most 32 characters long.'],
                trim: [true, 'Notification type is not trimmed.'],
            },
            date: {
                type: Date,
                required: true,
                default: new Date(), // sets on creating
            },
            isRead: {
                type: Boolean,
                required: true,
                default: false,
            },
            data: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
                required: [true, 'Notification data is required.'],
                minlength: [8, 'Notification data must be at least 6 characters long.'],
                maxlength: [32, 'Notification data must be at most 32 characters long.'],
                trim: [true, 'Notification data is not trimmed.'],
            },
        }],
        default: [],
    },
});
const User=mongoose.model('User', userSchema, 'users');

module.exports=User;