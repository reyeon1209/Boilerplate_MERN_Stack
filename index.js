const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

// application/x-www-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}))
// application/json 를 분석해서 가져옴
app.use(bodyParser.json())
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => { // 회원 가입 시 필요한 정보들을 client에서 가져오면 해당 정보를 DB에 넣어주기
  const user = new User(req.body) // req.body안에는 json형식이 들어있음
  user.save((err, doc) => { // 정보들이 user DB에 저장
    if(err) return res.json({ success: false, err }) // 실패 시 json형식으로 에러 전달

    return res.status(200).json({ success: true })  // 성공 시 json형식으로 전달
  }) 
})

app.post('/api/users/login', (req, res) => {
  // 요청 email을 DB에서 찾기 
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청 email이 있다면 비밀번호 일치 검사
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })
      }

      // 비밀번호 일치하면 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // token을 쿠키/로컬스토리지 등에 저장
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {  // auth middleware 통과 == 인증 성공
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,  // 1, 2, 3, ... : 관리자, 0 : 일반 유저
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})