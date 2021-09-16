const express = require('express');
const router = express.Router();

// 고객 정보 조회를 위한 라우트
// app.js에서 기본 경로에 /product를 사용하기 때문에 /product 라우트 경로를 가짐
router.get('/', function(req, res) {
  res.send('product 라우트 루트'); 
});
// 고객 정보 추가를 위한 라우트
// app.js에서 기본 경로에 /product를 사용하기 때문에 /product/insert 라우트 경로를 가짐
router.post('/insert', function(req, res) {
  res.send('/product/insert 라우트'); 
});

// 고객 정보 수정을 위한 라우트
// app.js에서 기본 경로에 /product를 사용하기 때문에 /product/update 라우트 경로를 가짐
router.put('/update', function(req, res) {
  res.send('/product/udate 라우트'); 
});

// 고객 정보 삭제를 위한 라우트
// app.js에서 기본 경로에 /product를 사용하기 때문에 /product/delete 라우트 경로를 가짐
router.delete('/delete', function(req, res) {
  res.send('/product/delete 라우트');
});

module.exports = router;