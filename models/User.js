// https://www.allkeysgenerator.com/
require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//https://mongoosejs.com/docs/schematypes.html#string-validators
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Provide valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide password'],
        minlength: 5,
        maxlength: 100
    },
})


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    // here this refer to document
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


UserSchema.methods.getName = function () {
    return this.name
}

UserSchema.methods.getToken = function () {
    return jwt.sign({
        name: this.name,
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports = mongoose.model('User', UserSchema)