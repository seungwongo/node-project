const express = require('express')
const app = express() 
const port = 3000 // 서버 포트번호

app.use(express.static('public')); // public 폴더에 있는 모든 정적 파일을 URL로 제공할 수 있게 됩니다.
app.use(express.static('files')); // files 폴더에 있는 모든 정적 파일을 URL로 제공할 수 있게 됩니다.

app.use('/static', express.static('public')); 

// 클라이언트에서 HTTP 요청 메소드 중 GET를 이용해서 'host:port'로 요청을 보내면 실행되는 라우트입니다.
app.get('/', (req, res) => {
  res.send('Hello World!')
})



// 클라이언트에서 HTTP 요청 메소드 GET 방식으로 'host:port/about'을 호출했을 때
app.get('/about', function (req, res) {
  res.send('about'); // 클라이언트에 about 문자열 전송
});


app.get('/error', function (req, res) {
  throw new Error('에러발생'); // 라우트에서 에러가 발생하면 익스프레스가 알아서 이를 잡아서 처리합니다. 클라이언트로 500에러 코드와 에러 정보를 전달합니다.
});

app.get('/error2', function (req, res, next) {
  next(new Error('에러발생')); // next() 함수를 사용해서 에러 처리 핸들러로 에러 전달합니다.
});

// 에러 처리 핸들러 미들웨어
app.use(function (err, req, res, next) {
  res.status(500).json({statusCode:res.statusCode, err:err.message}); // 상태코드 500, 에러 메시지 전달
});

// app.listen 함수를 사용해서 서버를 실행합니다.
// 클라이언트는 'host:port'로 노드 서버에 요청을 보낼 수 있습니다.
app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`)
})




// const express = require('express');
// const customerRoute = require('./routes/customer');
// const productRoute = require('./routes/product');
// const app = express();

// app.use(express.json({
//   limit: '50mb' // 최대 50메가
// })); // 클라이언트 요청 body를 json으로 파싱 처리


// app.listen(3000, () => {
//   // 3000번 포트로 웹 서버 실행
//   console.log('Server started. port 3000.');
// });

// app.use('/customer', customerRoute); // customer 라우트를 추가하고 기본 경로로 /customer 사용
// app.use('/product', productRoute); // product 라우트를 추가하고 기본 경로로 /product 사용


// // 클라이언트에서 HTTP 요청 메소드 GET 방식으로 'host:port'을 호출했을 때
// app.get('/', function (req, res) {
//   res.send('root'); // 클라이언트에 root 문자열 전송
// });

// // 클라이언트에서 HTTP 요청 메소드 GET 방식으로 'host:port/about'을 호출했을 때
// app.get('/about', function (req, res) {
//   res.send('about'); // 클라이언트에 about 문자열 전송
// });

app.use(express.json({
  limit: '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리

// 클라이언트에서 HTTP 요청 메소드 POST 방식으로 'host:port/customer'를 호출했을 때
app.post('/customer', function (req, res) {
  console.log(req.body.param)
  res.send(req.body.param); // 클라이언트로 부터 요청 받은 데이터를 다시 클라이언트로 응답
});

// // GET 방식으로 'host:port/acd' 혹은 'host:port/abcd'를 호출했을 때
// // 'b?'는 문자 'b'가 0개 혹은 1개 있다는 것을 의미
// app.get('/ab?cd', function(req, res) {
//   res.send('ab?cd');
// });

// // 클라이언트에서 요청한 라우트 경로가 abcd, abbcd, abbbcd 등과 일치
// // 'b+'는 문자 'b'가 1개 이상 있다는 것을 의미
// app.get('/ab+cd', function(req, res) {
//   res.send('ab+cd');
// });

// // 클라이언트에서 요청한 라우트 경로가 abcd, abxcd, abanycd, ab123cd 등과 일치
// // 'ab*cd'는 문자 'ab'와 문자 'cd' 사이에 문자가 없거나 혹은 어떤 문자도 올 수 있다는 것을 의미
// app.get('/ab*cd', function(req, res) {
//   res.send('ab*cd');
// });

// // 클라이언트에서 요청한 라우트 경로가 abe 혹은 abcde와 일치
// // '(cd)?'는 문자 'cd' 0번 혹은 1번 있을 수 있음을 의미
// app.get('/ab(cd)?e', function(req, res) {
//   res.send('ab(cd)?e');
// });

// // 클라이언트에서 요청한 라우트 경로에 'a'가 포함되어 있는 경우
// app.get(/a/, function(req, res) {
//   res.send('/a/');
// });

// // 클라이언트에서 요청한 라우트 경로가 문자 'insert'로 시작하는 경우
// // insertCustomer, insertProduct 
// app.get(/^insert/, function(req, res) {
//   res.send('/^insert/');
// });


// app.get('/contact', function (req, res) {
//   res.send('contact');
// });

// // 콜백 함수에 세번째 파라미터로 next 오브젝트
// app.get('/example', function (req, res, next) {
//   console.log('첫번째 콜백 함수');
//   next(); // 다음 콜백 함수 호출
// }, function (req, res) {
//   res.send('두번째 콜백 함수'); // 클라이언트로 응답
// });


// const ex0 = function (req, res, next) {
//   console.log('첫번째 콜백 함수');
//   next(); // 다음 콜백 함수 호출
// }

// const ex1 = function (req, res, next) {
//   console.log('두번째 콜백 함수');
//   next(); // 다음 콜백 함수 호출
// }

// const ex2 = function (req, res) {
//   res.send('세번째 콜백 함수'); // 클라이언트로 응답
// }

// app.get('/examples', [ex0, ex1, ex2]); // 콜백 함수 배열로 정의

// // 모듈식 라우터 - 하나의 라우트 경로로 각 라우트 메소드 처리
// app.route('/customer')  
//   .get(function(req, res) { // HTTP 메소드 GET 요청에 대한 조회 처리
//     res.send('고객 정보 조회');
//   })
//   .post(function(req, res) { // HTTP 메소드 POST 요청에 대한 저장 처리
//     res.send('신규 고객 추가');
//   })
//   .put(function(req, res) { // HTTP 메소드 PUT 요청에 대한 수정 처리
//     res.send('고객 정보 수정');
//   })
//   .delete(function(req, res) { // HTTP 메소드 DELETE 요청에 대한 삭제 처리
//     res.send('고객 정보 삭제');
//   });