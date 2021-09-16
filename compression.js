var compression = require('compression') 
var express = require('express')

var app = express()

app.use(compression()) // 응답하는 모든 데이터가 압축이 됩니다.