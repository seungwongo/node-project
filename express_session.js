const express = require('express');
const session = require('express-session');	
const fileStore = require('session-file-store')(session);
const app = express();

app.use(session({
  secret: 'secret key',	//암호화하는 데 쓰일 키
  resave: false,	// 세션에 변경사항이 없어도 항상 다시 저장할지 여부
  saveUninitialized: true,	// 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true, // true 이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
    secure: true, // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리,
    maxAge: 60000 // 쿠키가 유지되는 시간 (밀리세컨드 단위)
  },
  store: new fileStore() // 세션 저장소로 fileStore 사용
}));

app.get('/', (req, res, next) => {
  console.log(req.session); // 세션 정보 출력
  res.send(req.session);
  // if (req.session.num === undefined) 
  //   req.session.num = 1;
  // else
  //   req.session.num += 1;
  // res.send(`${req.session.num}번 접속`);
});


// 로그인 요청시 사용자 정보 확인 후 세션에 사용자 정보 저장
app.post('/login', (req, res, next) => {
  const {email, pw} = req.body.param;
  // 데이터베이스의 사용자 테이블에서 로그인 인증 처리 코드 작성
  // 사용자가 존재하면(로그인 처리가 성공하면)
  req.session.email = email; // 세션에 사용자 이메일 정보 저장
  req.session.is_logined = true; // 세션에 로그인 여부 저장
  req.session.save(err => { // 세션 저장
    if(err) throw err;
    res.redirect('/home'); // 로그인 후 홈화면으로 이동
  });
});

// 로그아웃 요청시 세션 삭제 후 로그인 페이지로 이동
app.post('/logout', (req, res, next) => {
  req.session.destroy(); // destroy() 함수를 사용해서 세션 삭제
  res.redirect('/login'); // 로그인 페이지로 이동
});

app.listen(3000, () => {
  console.log("3000번 포트로 서버를 실행했습니다.");
});
