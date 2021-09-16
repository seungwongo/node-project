const cron = require('node-cron');
require('dotenv').config({ path: 'nodemailer/.env' }); // nodemailer 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const nodemailer = require("./nodemailer"); // nodemailer 폴더의 index.js
require('dotenv').config({ path: 'mysql/.env' }); // mysql 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const mysql = require("./mysql"); // mysql 폴더의 index.js

cron.schedule('0 9 * * Monday', async () => { // 매주 월요일 09:00에 이메일이 발송됩니다.
  const customers = await mysql.query('customerList'); //sql.js 파일에 작성된 customerList 쿼리를 실행

  let h = []; // 고객 목록 테이블 html 문자열을 담을 배열
  h.push('<table style="border:1px solid black;border-collapse:collapse;">');
  h.push('<thead>');
  h.push('<tr>');
  h.push('<th style="border:1px solid black;">Name</th>');
  h.push('<th style="border:1px solid black;">Email</th>');
  h.push('<th style="border:1px solid black;">Phone</th>');
  h.push('</tr>');
  h.push('</thead>');
  h.push('<tbody>');
  for(const customer of customers) {
    h.push('<tr>');
    h.push(`<td style="border:1px solid black;">${customer.name}</td>`);
    h.push(`<td style="border:1px solid black;">${customer.email}</td>`);
    h.push(`<td style="border:1px solid black;">${customer.phone}</td>`);
    h.push('</tr>');
  }
  h.push('</tbody>');
  h.push('</table>');

  const emailData = {
    from: 'seungwon.go@gmail.com',
    to: 'seungwon.go@returnvalues.com',
    subject: '신규 고객 목록',
    html: h.join('') // 데이터베이스에서 가져온 고객 목록을 html 테이블로 추가
  }

  await nodemailer.send(emailData);
});