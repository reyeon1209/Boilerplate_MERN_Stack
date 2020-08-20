const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require("./models/User")

// application/x-www-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}))
// application/json 를 분석해서 가져옴
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://test:test1234@boilerplate.tcbwq.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => { // 회원 가입 시 필요한 정보들을 client에서 가져오면 해당 정보를 DB에 넣어주기
  const user = new User(req.body) // req.body안에는 json형식이 들어있음
  user.save((err, doc) => { // 정보들이 user DB에 저장
    if(err) return res.json({ success: false, err }) // 실패 시 json형식으로 에러 전달

    return res.status(200).json({ success: true })  // 성공 시 json형식으로 전달
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})