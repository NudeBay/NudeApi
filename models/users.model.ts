import mongoose, { Schema, Document } from 'mongoose';

interface IDelete extends Document {
    isDeleted: boolean;
    deleteDate: Date | null;
};

interface IBan extends Document {
    banDate: Date;
    banReason: string;
    banExpirationDate: Date;
};

interface IDevice extends Document {
    name: string;
    ip: string;
    client?: string;
    createDate: Date;
    lastLoginDate: Date;
};

interface ISettings extends Document {
    darkMode: boolean;
    language: string;
    allowGore: boolean;
    favoriteTags: mongoose.Types.ObjectId[];
    publicData: {
        birthdate: boolean;
        email: boolean;
        following: boolean;
        saved: boolean;
        like: boolean;
        blocked: boolean;
    };
    notifications: {
        newPost: boolean;
        newFollower: boolean;
        newComment: boolean;
        newLike: boolean;
        newMessage: boolean;
        newFriendRequest: boolean;
    };
};

interface INotification extends Document {
    type: string;
    date: Date;
    isRead: boolean;
    data: any;
};

interface IUser extends Document {
    nickname: string;
    email: string;
    phone?: string;
    password: string;
    birthDate?: Date;
    badges?: string[];
    aboutMe?: string;
    status?: string;
    profilePicture?: string | null;
    backgroundPicture?: string | null;
    createDate: Date;
    delete: IDelete;
    bans: IBan[];
    following: mongoose.Types.ObjectId[];
    saved: mongoose.Types.ObjectId[];
    blocked: mongoose.Types.ObjectId[];
    muted: mongoose.Types.ObjectId[];
    devices: IDevice[];
    settings: ISettings;
    notifications: INotification[];
}

const userSchema: Schema=new Schema({
    nickname: {
        type: String,
        required: [true, 'Nickname is required.'],
        trim: true,
        minlength: [3, 'Nickname must be at least 3 characters long.'],
        maxlength: [32, 'Nickname must be at most 32 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Nickname must contain only letters and numbers.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        minlength: [8, 'Email must be at least 8 characters long.'],
        maxlength: [64, 'Email must be at most 64 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Email must contain only letters and numbers.'],
    },
    phone: {
        type: String,
        trim: true,
        minlength: [9, 'Phone must be at least 9 characters long.'],
        maxlength: [9, 'Phone must be at most 9 characters long.'],
        match: [/^[0-9]+$/, 'Phone must contain only numbers.'],
        default: null,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long.'],
        maxlength: [64, 'Password must be at most 64 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Password must contain only letters and numbers.'],
    },
    birthDate: {
        type: Date,
        min: [new Date(1900, 0, 1), 'Birth date must be after 1900-01-01.'],
        max: [new Date(), 'Birth date must be before current date.'],
        default: null,
    },
    badges: {
        type: [{ // ??
            type: {
                type: String,
                enum: {
                    values: ['Owner','Admin','Mod','Developer','Verified','PussyPass'],
                    message: 'Invalid badge kind.',
                }
            },
        }],
        maxlength: [32, 'You can only have 32 badges.'],
        default: [],
    },
    aboutMe: {
        type: String,
        trim: true,
        minlength: [1, 'About me must be at least 1 characters long.'],
        maxlength: [512, 'About me must be at most 512 characters long.'],
        default: null,
    },
    status: {
        type: String,
        trim: true,
        minlength: [1, 'Status must be at least 1 characters long.'],
        maxlength: [32, 'Status must be at most 32 characters long.'],
        default: null,
    },
    profilePicture: {
        type: String,
        trim: true,
        // minlength: [1, 'Background picture url must be at least 1 characters long.'],
        // maxlength: [256, 'Background picture url must be at most 256 characters long.'],
        default: null,
    },
    backgroundPicture: {
        type: String,
        trim: true,
        // minlength: [1, 'Background picture url must be at least 1 characters long.'],
        // maxlength: [256, 'Background picture url must be at most 256 characters long.'],
        default: null,
    },
    createDate: {
        type: Date,
        required: [true, 'Creation date is required.'],
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
    bans: {
        type: [{
            banDate: {
                type: Date,
                required: [true, 'Ban date is required.'],
                default: Date.now,
            },
            banReason: {
                type: String,
                required: [true, 'Ban reason is required.'],
                trim: true,
                minlength: [8, 'Ban reason must be at least 8 characters long.'],
                maxlength: [512, 'Ban reason must be at most 256 characters long.'],
                match: [/^[a-zA-Z0-9]+$/, 'Ban reason must contain only letters and numbers.'],
            },
            banExpirationDate: {
                type: Date,
                required: [true, 'Ban expiration date is required.'],
            },
        }],
        default: [],
    },
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        }],
        required: [true, 'Following is required.'],
        maxlength: [1000, 'You can only follow 1000 users.'],
        default: [],
    },
    saved: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            trim: true,
        }],
        required: [true, 'Saved is required.'],
        maxlength: [1000, 'You can only save 1000 posts.'],
        default: [],
    },
    blocked: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        }],
        required: [true, 'Blocked is required.'],
        maxlength: [1000, 'You can only block 1000 users.'],
        default: [],
    },
    muted: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            trim: true,
        }],
        required: [true, 'Muted is required.'],
        maxlength: [1000, 'You can only mute 1000 users.'],
        default: [],
    },
    devices: {
        type: [{
            name: {
                type: String,
                required: [true, 'Device name is required.'],
                trim: true,
                minlength: [1, 'Device name must be at least 1 characters long.'],
                maxlength: [32, 'Device name must be at most 32 characters long.'],
                match: [/^[a-zA-Z0-9]+$/, 'Device name must contain only letters and numbers.'],
            },
            ip: {
                type: String,
                required: [true, 'Device ip is required.'],
                trim: true,
                minlength: [7, 'Device ip must be at least 7 characters long.'],
                maxlength: [15, 'Device ip must be at most 15 characters long.'],
                match: [/^[0-9.]+$/, 'Device ip must contain only numbers and dots.'],
            },
            client: {
                type: String,
                trim: true,
                minlength: [1, 'Device client must be at least 1 characters long.'],
                maxlength: [32, 'Device client must be at most 32 characters long.'],
                match: [/^[a-zA-Z0-9]+$/, 'Device client must contain only letters and numbers.'],
            },
            createDate: {
                type: Date,
                required: [true, 'Device creation date is required.'],
                default: Date.now,
            },
            lastLoginDate: {
                type: Date,
                required: [true, 'Device last login date is required.'],
                default: Date.now,
            },
        }],
        required: [true, 'Devices are required.'],
        maxlength: [100, 'You can only have 100 devices.'],
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
                trim: true,
                length: [2, 'Language must be 2 characters long.'],
                match: [/^[a-zA-Z]+$/, 'Language must be alphabetic.'],
                default: 'en',
            },
            allowGore: {
                type: Boolean,
                required: [true, 'Allow gore is required.'],
            },
            favoriteTags: {
                type: [{
                    type: mongoose.Schema.Types.ObjectId,
                    required: [true, 'Favourite tag is required.'],
                    ref: 'Tag',
                }],
                maxlength: [25, 'User cannot have more than 25 favorite tags.'],
            },
            publicData: {
                type: {
                    birthdate: {
                        type: Boolean,
                        required: [true, 'settings>publicData>Birthdate is required.'],
                    },
                    email: {
                        type: Boolean,
                        required: [true, 'settings>publicData>Email is required.'],
                    },
                    following: {
                        type: Boolean,
                        required: [true, 'settings>publicData>Following is required.'],
                    },
                    saved: {
                        type: Boolean,
                        required: [true, 'settings>publicData>Saved is required.'],
                    },
                    like: {
                        type: Boolean,
                        required: [true, 'settings>publicData>Liked is required.'],
                    },
                    blocked: {
                        type: Boolean,
                        required: [true, 'settings>publicData>Blocked is required.'],
                    },
                },
            },
            notifications: {
                type: {
                    newPost: {
                        type: Boolean,
                        required: [true, 'settings>notifications>New post is required.'],
                    },
                    newFollower: {
                        type: Boolean,
                        required: [true, 'settings>notifications>New follower is required.'],
                    },
                    newComment: {
                        type: Boolean,
                        required: [true, 'settings>notifications>New comment is required.'],
                    },
                    newLike: {
                        type: Boolean,
                        required: [true, 'settings>notifications>New like is required.'],
                    },
                    newMessage: {
                        type: Boolean,
                        required: [true, 'settings>notifications>New message is required.'],
                    },
                    newFriendRequest: {
                        type: Boolean,
                        required: [true, 'settings>notifications>New friend request is required.'],
                    },
                },
            },
        },
        default: {
            darkMode: true,
            language: 'en',
            allowGore: false,
            allowNSFW: true,
            favoriteTags: [],
            publicData: {
                birthdate: false,
                email: false,
                following: false,
                saved: false,
                like: false,
                blocked: false,
            },
            notifications: {
                newPost: true,
                newFollower: true,
                newComment: true,
                newLike: true,
                newMessage: true,
                newFriendRequest: true,
            },
        },
    },
    notifications: {
        type: [{
            type: {
                type: String,
                required: true,
                trim: true,
                minlength: [8, 'Notification type must be at least 8 characters long.'],
                maxlength: [32, 'Notification type must be at most 32 characters long.'],
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
                required: [true, 'Notification data is required.'],
                trim: true,
                minlength: [8, 'Notification data must be at least 6 characters long.'],
                maxlength: [32, 'Notification data must be at most 32 characters long.'],
            },
        }],
        default: [],
    },
});

const User=mongoose.model<IUser>('User', userSchema, 'users');

export default User;
export { IDelete, IBan, IDevice, ISettings, INotification, IUser };
