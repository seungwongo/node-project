const express = require('express')
const multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    cb(null, new Date().valueOf() + path.extname(file.originalname)); //시스템시간으로 파일 이름 설정
  }
})
var upload = multer({ storage: storage })

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.file) // avatar 파일
  console.log(req.body) // 일반적인 폼 데이터
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  console.log(req.files) // photos 이름의 멀티 파일
})