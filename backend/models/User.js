const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(

{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['Admin', 'General User'],
        default: 'General User'
    },

    company: {
        type: String,
        default: 'MployChek'
    },

    designation: {
        type: String,
        default: 'Employee'
    },

    verified: {
        type: Boolean,
        default: false
    }

},

{
    timestamps: true
}

);

module.exports = mongoose.model('User', userSchema);