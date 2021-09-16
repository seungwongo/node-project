const express = require('express');
const router = express.Router();

// 고객 정보 조회를 위한 라우트
// app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer 라우트 경로를 가짐
router.get('/', function(req, res) {
  res.send('customer 라우트 루트'); 
});
// 고객 정보 추가를 위한 라우트
// app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer/insert 라우트 경로를 가짐
router.post('/insert', function(req, res) {
  res.send('/customer/insert 라우트'); 
});

// 고객 정보 수정을 위한 라우트
// app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer/update 라우트 경로를 가짐
router.put('/update', function(req, res) {
  res.send('/customer/udate 라우트'); 
});

// 고객 정보 삭제를 위한 라우트
// app.js에서 기본 경로에 /customer를 사용하기 때문에 /customer/delete 라우트 경로를 가짐
router.delete('/delete', function(req, res) {
  res.send('/customer/delete 라우트');
});

module.exports = router;