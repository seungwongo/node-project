const ics = require('ics');
require('dotenv').config({ path: 'nodemailer/.env' }); // nodemailer 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const nodemailer = require("./nodemailer"); // nodemailer 폴더의 index.js

const event = {
  start: [2021, 10, 30, 9, 30],
  duration: { hours: 1, minutes: 30 },
  title: '신제품 마케팅 회의',
  description: '신사업팀에서 개발한 신제품에 대한 해외 마케팅 회의',
  location: '더그레잇 3층',
  url: 'http://thegreat.io',
  geo: { lat: 30.12, lon: 50.45 },
  organizer: { name: 'Jeremy', email: 'orgainizer@mail.com' },
  attendees: [
    { name: '참석자1', email: 'addr1@mail.com', rsvp: true, role: 'REQ-PARTICIPANT' },
    { name: '참석자2', email: 'addr2@mail.com', role: 'OPT-PARTICIPANT' }
  ]
}

const sendIcs = async () => {
  ics.createEvent(event, async (error, value) => {
    if (error) {
      console.log(error)
      return
    }

    let message = {
      from: 'seungwon.go@gmail.com', // 보내는 사람 주소
      to: 'seungwon.go@returnvalues.com', // 받는 사람 주소
      subject: '신제품 마케팅 회의', // 이메일 제목
      text: '신사업팀에서 개발한 신제품에 대한 해외 마케팅 회의', // 이메일 내용
      icalEvent: {
          filename: 'invitation.ics', // iCalendar 첨부 파일 명
          method: 'REQTUEST', // REQUEST-요청, CACEL-취소
          content: value // iCalendar 이벤트
      }
  };
  const r = await nodemailer.send(message); // 이메일 발송
  });
}

sendIcs();