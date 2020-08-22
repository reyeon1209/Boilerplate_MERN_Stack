const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10  // 10자리인 salt
const jwt = require('jsonwebtoken')

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
        default: 0  // 1, 2, 3, ... : 관리자, 0 : 일반 유저
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // token 유효기간
        type: Number
    }
})

userSchema.pre('save', function(next) { // user model에 user 정보를 저장하기 전에 할 일
    var user = this;

    if (user.isModified('password')) {  // 비밀번호가 변경되면 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
    
                user.password = hash;
                next();  // index.js에 user.save부분으로 넘어감
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return callback(err);

        callback(null, isMatch); // null : err 없다, isMatch 전달
    })
}

userSchema.methods.generateToken = function(callback) { // jsonwebtoken을 이용해서 token 생성
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    
    user.token = token;
    user.save(function(err, user) {
        if (err) return callback(err);

        callback(null, user);
    })// user._id + 'secretToken = token
}

userSchema.statics.findByToken = function(token, callback) {
    var user = this;

    // token을 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // user ID를 이용해 유저 찾기
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if (err) return callback(err);

            callback(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }