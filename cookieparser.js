const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser()) // cookie-parser 사용

app.get('/', function (req, res) {
  console.log(req.cookies) // 서명되지 않은 쿠키

  console.log(req.signedCookies) // 서명(sigend)된 쿠키
})

app.listen(8080)