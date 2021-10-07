const express = require("express");
require('dotenv').config({ path: 'mysql/.env' }); // mysql 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const mysql = require("./mysql"); // mysql 폴더의 index.js
const app = express();

app.use(express.json({
  limit: '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리


app.listen(3000, () => {
  // 3000번 포트로 웹 서버 실행
  console.log('Server started. port 3000.');
});

// 고객 정보 조회 라우터
app.get('/api/customers', async (req, res) => {
  // localhost:3000/customers 접속 시 실행
  const customers = await mysql.query('customerList'); //sql.js 파일에 작성된 customerList 쿼리를 실행
  console.log(customers);
  res.send(customers); // 결과를 클라이언트로 보냄
});

// 고객 정보 추가 라우터
app.post('/api/customer/insert', async (req, res) => {
  console.log(req.body)
  const result = await mysql.query('customerInsert', req.body.param);
  res.send(result); // 결과를 클라이언트로 보냄
});

// 고객 정보 수정 라우터
app.put('/api/customer/update', async (req, res) => {
  console.log(req.body)
  const result = await mysql.query('customerUpdate', req.body.param);
  res.send(result); // 결과를 클라이언트로 보냄
});

// 고객 정보 삭제 라우터
app.delete('/api/customer/delete/:id', async (req, res) => {
  const {id} = req.params;  // 라우트 경로의 :id 에 맵핑되는 값
  const result = await mysql.query('customerDelete', id);
  res.send(result); // 결과를 클라이언트로 보냄
});
 