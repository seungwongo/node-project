const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
  origin: 'http://example.com', // 허용할 도메인 설정
  optionsSuccessStatus: 200 
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) { // 특정 라우터에만 cors 적용
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})