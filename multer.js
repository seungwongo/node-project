const multer  = require('multer');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.json({
  limit: '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리


app.listen(3000, () => {
  // 3000번 포트로 웹 서버 실행
  console.log('Server started. port 3000.');
});


const storage = multer.diskStorage({  // 디스크 저장소 정의
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    cb(null, new Date().valueOf() + path.extname(file.originalname)); //시스템시간으로 파일 이름 설정
  }
})
const upload = multer({ storage: storage }); // multer 객체 생성


app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.file) // avatar 이름의 싱글 파일
  console.log(req.body) // 일반적인 폼 데이터
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  console.log(req.files) // photos 이름의 멀티 파일
})