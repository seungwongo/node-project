const express = require('express')
const responseTime = require('response-time')

const app = express()

app.use(responseTime((req, res, time) => { // 클라이언트로 부터 요청이 올 때 마다 응답하는 데 걸린 시간이 출력 됨
  console.log(`${req.method} ${req.url} ${time}`)
}))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(8080)