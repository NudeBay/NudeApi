const mongoose=require('mongoose');

const reportSchema=mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Reporter is required.'],
        ref: 'User',
    }, 
    reported: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Reported is required.'],
        ref: 'User',
    },
    reason: {
        type: String,
        required: [true, 'Reason is required.'],
        trim: [true, 'Reason is not trimmed.'],
        minlength: [8, 'Reason must be at least 8 characters long.'],
        maxlength: [512, 'Reason must be at most 256 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Reason must contain only letters and numbers.'],
    },
    creationDate: {
        type: Date,
        required: [true, 'Creation date is required.'],
        default: new Date(),
    },
    isResolved: {
        type: Boolean,
        required: [true, 'Is resolved is required.'],
        default: false,
    },
    resolutionDate: {
        type: Date,
        required: [true, 'Resolution date is required.'],
        default: new Date(),
    },
    resolutionReason: {
        type: String,
        required: [true, 'Resolution reason is required.'],
        trim: [true, 'Resolution reason is not trimmed.'],
        minlength: [8, 'Resolution reason must be at least 8 characters long.'],
        maxlength: [512, 'Resolution reason must be at most 256 characters long.'],
        default: '',
    },
});
const Report=mongoose.model('Report', reportSchema, 'reports');

module.exports=Report;
