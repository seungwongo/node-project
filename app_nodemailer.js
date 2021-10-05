const express = require("express");
require('dotenv').config({ path: 'nodemailer/.env' }); // nodemailer 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const nodemailer = require("./nodemailer"); // nodemailer 폴더의 index.js
const app = express();

app.use(express.json({
  limit: '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리


app.listen(3000, () => {
  // 3000번 포트로 웹 서버 실행
  console.log('Server started. port 3000.');
});

// localhost:3000/api/email 라우트로 이메일 데이터를 post로 전송하면 nodemailer의 send 함수를 실행
app.post('/api/email', async (req, res) => {
  const r = await nodemailer.send(req.body.param);
  res.send(r); // 결과를 클라이언트로 보냄
});

// localhost:3000/api/email2 라우트로 이메일 데이터를 post로 전송하면 nodemailer의 sendDemo 함수를 실행
app.post('/api/email2', async (req, res) => {
  const r = await nodemailer.sendDemo(req.body.param);
  res.send(r); // 결과를 클라이언트로 보냄
});

app.get('/api/email3', async (req, res) => {
  let content = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';

  
  let message = {
      from: 'seungwon.go@gmail.com',
      to: 'seungwon.go@returnvalues.com',
      subject: 'Appointment',
      text: 'Please see the attached appointment',
      icalEvent: {
          filename: 'invitation.ics',
          method: 'request',
          content: content
      }
  };
  const r = await nodemailer.send(message);
  res.send(r); // 결과를 클라이언트로 보냄
});