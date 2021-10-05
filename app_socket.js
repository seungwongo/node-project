const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const io = require('socket.io')(server, {
  cors: { // CORS 처리
    origin: 'http://localhost:8080',  // 허용할 호스트
    methods: ['GET', 'POST'] // 허용할 HTTP 메소드 정의
  }
});

io.on('connection', (socket) => { 
  socket.on('disconnect', () => {
    // socket 연결이 종료됐을 때
  });

  socket.on('', () => {

  });
});
server.listen(3000);