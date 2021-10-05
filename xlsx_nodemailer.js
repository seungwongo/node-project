require('dotenv').config({ path: 'mysql/.env' }); // mysql 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const mysql = require("./mysql"); // mysql 폴더의 index.js
require('dotenv').config({ path: 'nodemailer/.env' }); // nodemailer 폴더에 있는 .env 파일을 찾아서 환경변수를 설정
const nodemailer = require("./nodemailer"); // nodemailer 폴더의 index.js
const xlsx = require('xlsx');

const sendAttachedEmail = async () => {
  const workbook = xlsx.utils.book_new(); // 가상의 엑셀 파일 생성
  const customers = await mysql.query('customerList'); //sql.js 파일에 작성된 customerList 쿼리를 실행

  // json_to_sheet 방식으로 데이터 생성"
  const firstSheet = xlsx.utils.json_to_sheet( customers, { header : ["id", "name", "email", "phone", "address"] } ); 

  // 컬럼(열) 넓이 지정
  firstSheet["!cols"] = [
    { wpx : 50 },   // id열
    { wpx : 200 },  // name열
    { wpx : 200 },  // email열
    { wpx : 140 },  // phone열
    { wpx : 200 },  // address열
  ];

  // 첫번째 시트에 작성한 데이터를 넣는다.
  xlsx.utils.book_append_sheet( workbook, firstSheet, "Customers" );

  const data = {
    from: 'seungwon.go@gmail.com',
    to: 'seungwon.go@returnvalues.com',
    subject: '파일 첨부 이메일',
    text: '엑셀 파일을 첨부해서 이메일을 보냅니다.',
    attachments: [{
        'filename': 'Customers.xlsx',
        'content': Buffer.from(xlsx.write(workbook, {type:'buffer'}), 'base64') // 첨부파일 내용 생성
    }]  
  };

  await nodemailer.send(data); // 이메일 전송
}

sendAttachedEmail();




