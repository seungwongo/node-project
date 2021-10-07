const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const httpServer = createServer(app);


const corsOptions = {
  origin: 'http://localhost:5500', // 허용할 도메인 설정
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions)) // cors를 모든 라우터에 적용

const io = new Server(httpServer, { 
    cors: { // CORS 처리
    origin: 'http://localhost:5500',  // 허용할 호스트
    methods: ['GET', 'POST'] // 허용할 HTTP 메소드 정의
  }
 });

io.on('connection', (socket) => { 
  socket.on('disconnect', () => {
    // socket 연결이 종료됐을 때
  });

  // 클라이언트에서 서버로 메시지 전달 시 지정한 이벤트명(event_name)과 동일한 이름으로 socket 객체의 on 함수를 정의
  socket.on('client2server', (data) => {
    console.log(data); // 클라이언트로 부터 전달된 메시지
  });
});

const sendMsgToClient = () => {
  setInterval(() => {
    // 데이터가 변경이 되었는지 코드 구현
    // 데이터가 변경이 되었으면 클라이언트로 변경된 데이터 전송
    io.emit('server2client', {code:`item${Math.random()}`, price:Math.random()});
  }, 1000);
}

// /socket 라우트로 접속하면 1초 마다 데이터 변경 여부 체크 후 변경이 되었다면 변경된 데이터 전송 
app.get('/socket', (req, res) => {
  sendMsgToClient(); // 클라이언트로 메시지 전송 함수 호출
  res.send('메시지 전송 시작');
});

httpServer.listen(3000, () => {
  console.log('서버가 실행됐습니다. http://localhost:3000');
});