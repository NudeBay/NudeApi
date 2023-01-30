const mongoose=require('mongoose');

const reportSchema=mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Reporter is required.'],
        unique: false,
        ref: 'User',
    }, 
    reported: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Reported is required.'],
        unique: false,
        ref: 'User',
    },
    reason: {
        type: String,
        required: [true, 'Reason is required.'],
        unique: false,
        trim: [true, 'Reason is not trimmed.'],
        minlength: [8, 'Reason must be at least 8 characters long.'],
        maxlength: [512, 'Reason must be at most 256 characters long.'],
        match: [/^[a-zA-Z0-9]+$/, 'Reason must contain only letters and numbers.'],
    },
    creationDate: {
        type: Date,
        required: [true, 'Creation date is required.'],
        unique: false,
        default: new Date(),
    },
    isResolved: {
        type: Boolean,
        required: [true, 'Is resolved is required.'],
        unique: false,
        default: false,
    },
    resolutionDate: {
        type: Date,
        required: false,
        unique: false,
        default: null,
    },
    resolutionReason: {
        type: String,
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
