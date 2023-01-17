const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: {
        type: [String, 'Nickname is not a string.'],
        required: false,
        unique: false,
        trim: [true, 'Nickname is not trimmed.'],
        minlength: [3, 'Nickname must be at least 3 characters long.'],
        maxlength: [32, 'Nickname must be at most 32 characters long.'],
        default: 'Anonymous',
        match: [/^[a-zA-Z0-9_]+$/, 'Nickname must be alphanumeric.'],
    },
    tag: {
        type: [String, 'Tag is not a string.'],
        required: [true, 'Tag is required.'],
        unique: [true, 'Tag is not unique.'],
        trim: [true, 'Tag is not trimmed.'],
        length: [4, 'Tag must be 4 characters long.'],
        match: [/^#[0-9]{4}$/, 'Tag must be in the format #0000.'],
    },
    email: {
        type: [String, 'Email is not a string.'],
        required: [true, 'Email is required.'],
        unique: [true, 'Email is not unique.'],
        trim: [true, 'Email is not trimmed.'],
        minlength: [5, 'Email must be at least 5 characters long.'],
        maxlength: [64, 'Email must be at most 64 characters long.'],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Email must be in the format'],
    },
    password: {
        type: [String, 'Password is not a string.'],
        required: [true, 'Password is required.'],
        trim: [true, 'Password is not trimmed.'],
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [64, 'Password must be at most 64 characters long.'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'],
    },
    badges: {
        type: [{
            type: [String, 'Badge is not a string.'],
            enum: {
                values: ['Owner','Admin','Mod','Verificated','PussyPass'],
                message: 'Invalid badge',
            },
            unique: true,
        }],
        required: false,
        unique: false,
        maxlength: [32, 'User cannot have more than 32 badges.'],
        default: [],
    },
    aboutMe: {
        type: [String, 'About me is not a string.'],
        required: false,
        unique: false,
        maxlength: [256, 'About me must be at most 256 characters long.'],
        default: '',
    },
    status: {
        type: [String, 'Status is not a string.'],
        required: false,
        unique: false,
        maxlength: [32, 'Status must be at most 32 characters long.'],
        default: '',
    },
    profilePicture: { // ! beta
        type: [String, 'Profile picture url is not a string.'],
        required: false,
        unique: false,
        trim: [true, 'Profile picture url is not trimmed.'],
        maxlength: [256, 'Profile picture url must be at most 256 characters long.'],
        default: null,
        match: [/^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/[a-zA-Z0-9-_.]+$/, 'Profile picture url must be in the format'],
    },
    backgroundPicture: { // ! beta
        type: [String, 'Background picture url is not a string.'],
        required: false,
        unique: false,
        trim: [true, 'Background picture url is not trimmed.'],
        maxlength: [256, 'Background picture url must be at most 256 characters long.'],
        default: null,
        match: [/^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\/[a-zA-Z0-9-_.]+$/, 'Background picture url must be in the format'],
    },
    createDate: {
        type: [Date, 'Create date is not a date.'],
        required: [true, 'Create date is required.'],
        unique: false,
        default: new Date(),
    },
    delete: {
        type: {
            isDeleted: {
                type: [Boolean, 'Is deleted is not a boolean.'],
                required: [true, 'Is deleted is required.'],
                unique: false,
                default: false,
            },
            deleteDate: {
                type: [Date, 'Delete date is not a date.'],
                required: false,
                unique: false,
                default: null,
            },
        },
        required: false,
        unique: false,
    },
    Bans: {
        type: [{
            isBanned: {
                type: [Boolean, 'Is banned is not a boolean.'],
                required: [true, 'Is banned is required.'],
                unique: false,
                default: false,
            },
            banDate: {
                type: [Date, 'Ban date is not a date.'],
                required: false,
                unique: false,
                default: null,
            },
            banReason: {
                type: [String, 'Ban reason is not a string.'],
                required: false,
                unique: false,
                trim: [true, 'Ban reason is not trimmed.'],
                minlength: [8, 'Ban reason must be at least 8 characters long.'],
                maxlength: [512, 'Ban reason must be at most 256 characters long.'],
                default: '',
            },
            banExpirationDate: {
                type: [Date, 'Ban expiration date is not a date.'],
                required: false,
                unique: false,
                default: null,
            },
        }],
        required: false,
        unique: false,
    },
    banExpirationDate: {
        type: [Date, 'Ban expiration date is not a date.'],
        required: false,
        unique: false,
        default: null,
    },
    following: {
        type: [{
            type: [mongoose.Schema.Types.ObjectId, 'Following is not an ObjectId.'],
            required: [true, 'Following is required.'],
            unique: false,
            ref: 'User',
        }],
        required: false,
        unique: false,
        maxlength: [100, 'User cannot follow more than 100 users.'],
        default: [],
    },
    saved: {
        type: [{
            type: [mongoose.Schema.Types.ObjectId, 'Saved is not an ObjectId.'],
            required: [true, 'Saved is required.'],
            unique: false,
            ref: 'Post',
        }],
        required: false,
        unique: false,
        maxlength: [100, 'User cannot save more than 100 posts.'],
        default: [],
    },
    settings: {
        type: {
            darkMode: {
                type: [Boolean, 'Dark mode is not a boolean.'],
                required: true,
                unique: false,
                default: true,
            },
            language: {
                type: [String, 'Language is not a string.'],
                required: false,
                unique: false,
                trim: [true, 'Language is not trimmed.'],
                length: [2, 'Language must be 2 characters long.'],
                match: [/^[a-zA-Z]+$/, 'Language must be alphabetic.'],
                default: 'en',
            },
            notifications: {
                type: {
                    newPost: {
                        type: [Boolean, 'New post notification is not a boolean.'],
                        required: true,
                        unique: false,
                        default: true,
                    },
                    newFollower: {
                        type: [Boolean, 'New follower notification is not a boolean.'],
                        required: true,
                        unique: false,
                        default: true,
                    },
                    newComment: {
                        type: [Boolean, 'New comment notification is not a boolean.'],
                        required: true,
                        unique: false,
                        default: true,
                    },
                    newLike: {
                        type: [Boolean, 'New like notification is not a boolean.'],
                        required: true,
                        unique: false,
                        default: true,
                    },
                    newMessage: {
                        type: [Boolean, 'New message notification is not a boolean.'],
                        required: true,
                        unique: false,
                        default: true,
                    },
                },
            },
        },
    },
    notifications: {
        type: [{
            type: {
                type: [String, 'Notification type is not a string.'],
                required: true,
                unique: false,
                minlength: [8, 'Notification type must be at least 8 characters long.'],
                maxlength: [32, 'Notification type must be at most 32 characters long.'],
                trim: [true, 'Notification type is not trimmed.'],
            },
            date: {
                type: [Date, 'Notification date is not a date.'],
                required: true,
                unique: false,
            },
            isRead: {
                type: [Boolean, 'Notification is read is not a boolean.'],
                required: true,
                unique: false,
                default: false,
            },
            data: {
                type: [mongoose.Schema.Types.Mixed, 'Notification data is not mixed.'],
                required: false,
                unique: false,
            },
        }],
    },
});
const User=mongoose.model('User', userSchema); // ! jeśli nie zadziała walidacja to zmienić na mongoose.db(...)

module.exports=User;