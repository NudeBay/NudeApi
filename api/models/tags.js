const mongoose=require('mongoose');

const tagSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: [String, 'Name is not a string.'],
        required: [true, 'Name is required.'],
        unique: [true, 'Name is not unique.'],
        trim: [true, 'Name is not trimmed.'],
        minlength: [3, 'Name must be at least 3 characters long.'],
        maxlength: [32, 'Name must be at most 32 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Name must contain only letters and numbers.'],
    },
    creationDate: {
        type: [Date, 'Creation date is not a date.'],
        required: [true, 'Creation date is required.'],
        unique: false,
        default: new Date(),
    },
    numberOfUses: {
        type: [Number, 'Number of uses is not a number.'],
        required: [true, 'Number of uses is required.'],
        unique: false,
        default: 0,
    },
});
const Tag=mongoose.model('Tag',tagSchema);

module.exports=Tag;