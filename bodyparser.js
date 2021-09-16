var express = require('express')
// var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(express.json({
  limit: '50mb'
})); // 클라이언트로 서버로 전송할 수 있는 json 데이터의 최대 크기는 50메가로 지정

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})