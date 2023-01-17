const mongoose=require('mongoose');

const reportSchema=mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    reporter: {
        type: [mongoose.Schema.Types.ObjectId, 'Reporter is not an ObjectId.'],
        required: [true, 'Reporter is required.'],
        unique: false,
        ref: 'User',
    }, 
    reported: {
        type: [mongoose.Schema.Types.ObjectId, 'Reported is not an ObjectId.'],
        required: [true, 'Reported is required.'],
        unique: false,
        ref: 'User',
    },
    reason: {
        type: [String, 'Reason is not a string.'],
        required: [true, 'Reason is required.'],
        unique: false,
        trim: [true, 'Reason is not trimmed.'],
        minlength: [8, 'Reason must be at least 8 characters long.'],
        maxlength: [512, 'Reason must be at most 256 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Reason must contain only letters and numbers.'],
    },
    creationDate: {
        type: [Date, 'Creation date is not a date.'],
        required: [true, 'Creation date is required.'],
        unique: false,
        default: new Date(),
    },
    isResolved: {
        type: [Boolean, 'Is resolved is not a boolean.'],
        required: [true, 'Is resolved is required.'],
        unique: false,
        default: false,
    },
    resolutionDate: {
        type: [Date, 'Resolution date is not a date.'],
        required: false,
        unique: false,
        default: null,
    },
    resolutionReason: {
        type: [String, 'Resolution reason is not a string.'],
        required: true,
        unique: false,
        trim: [true, 'Resolution reason is not trimmed.'],
        minlength: [8, 'Resolution reason must be at least 8 characters long.'],
        maxlength: [512, 'Resolution reason must be at most 256 characters long.'],
        default: '',
    },
});
const Report=mongoose.model('Report', reportSchema);

module.exports=Report;
