const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // space 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0  // 1 : 관리자, 0 : 일반 유저
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // token 유효기간
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }