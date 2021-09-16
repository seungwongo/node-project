var compression = require('compression') 
var express = require('express')

var app = express()

// 클라이언트로 요청받은 라우터가 /api/getMap 인 경우에 대해서만 응답 데이터를 압축합니다.
app.use('/api/getMap', compression()) 