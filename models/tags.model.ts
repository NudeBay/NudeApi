import mongoose, { Document, Schema } from 'mongoose';

interface ITag extends Document {
    name: string;
    creationDate: Date;
    numberOfUses: number;
};

const tagSchema=new Schema<ITag>({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long.'],
        maxlength: [32, 'Name must be at most 32 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Name must contain only letters and numbers.'],
    },
    creationDate: {
        type: Date,
        required: [true, 'Creation date is required.'],
        default: Date.now,
    },
    numberOfUses: {
        type: Number,
        required: [true, 'Number of uses is required.'],
        default: 0,
    },
});

const Tag=mongoose.model<ITag>('Tag', tagSchema, 'tags');

export default Tag;
export { ITag };
