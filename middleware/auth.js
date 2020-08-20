const { User } = require('../models/User')

let auth = (req, res, next) => {    // 인증 처리
    // client cookie에서 token 가져오기
    let token = req.cookies.x_auth;

    // token을 복호화한 후 user 찾기
    User.findByToken(token, (err, user) => {
        if (err) throw err;

        // user가 없으면 인증 실패
        if (!user) return res.json({ isAuth: false, error: true })

        // user가 있으면 인증 성공
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };