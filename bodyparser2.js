var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// json 데이터 파싱을 위한 body-parser
var jsonParser = bodyParser.json()

// urlencoded 데이터 파싱을 위한 body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 클라이언트로 부터 POST 방식으로 요청된 /login 라우터의 데이터는 urlencodedParser를 사용하는 것으로 정의
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// 클라이언트로 부터 POST 방식으로 요청된 /api/users 라우터의 데이터는 jsonParser를 사용하는 것으로 정의
app.post('/api/users', jsonParser, function (req, res) {
  // req.body 에서 사용자 정보 획득
})