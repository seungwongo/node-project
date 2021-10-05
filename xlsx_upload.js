const multer  = require('multer');
const path = require('path');
const xlsx = require('xlsx');
require('dotenv').config({ path: 'mysql/.env' }); // mysql 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const mysql = require("./mysql"); // mysql 폴더의 index.js
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


app.post('/upload/customers', upload.single('xlsx'), function (req, res, next) {
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`); // 엑셀 파일 읽어오기
  const firstSheetName = workbook.SheetNames[0]; // 엑셀 파일의 첫번째 시트 이름 가져오기
  const firstSheet = workbook.Sheets[firstSheetName]; // 시트 이름을 사용해서 엑셀 파일의 첫번째 시트 가져오기
  
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); // utils.sheet_to_json 함수를 사용해서 첫번째 시트 내용을 json 데이터로 변환

  firstSheetJson.forEach(async (customer) => {
    await mysql.query('customerInsert', customer);  // 고객 정보 데이터를 한건씩 읽으면서 MySQL 데이터베이스에 insert 처리
  })
  
  res.send('ok');
});