const xlsx = require('xlsx');
const workbook = xlsx.utils.book_new(); // 가상의 엑셀 파일 생성

const customers = [
  {A: '고객명', B:'이메일', C:'연락처'},  // 첫번째 행 - 컬럼명에 해당하는 데이터
  {A: '유재석', B:'ryu@mail.com', C:'010-0000-1111'},
  {A: '김종국', B:'kim@mail.com', C:'010-0000-2222'},
  {A: '지석진', B:'ji@mail.com', C:'010-0000-3333'},
  {A: '하하', B:'ha@mail.com', C:'010-0000-4444'}
];

// json_to_sheet 방식으로 데이터 생성
const firstSheet = xlsx.utils.json_to_sheet( customers, { header : ["A", "B", "C"], skipHeader : true } ); // skipHeader가 false 이면 엑셀시트의 첫번째 행에 header에 해당하는 A, B, C 가 삽입됨.

// 컬럼(열) 넓이 지정
firstSheet["!cols"] = [
  { wpx : 120 },   // A열
  { wpx : 250 },   // B열
  { wpx : 200 }    // C열
];

// 첫번째 시트에 작성한 데이터를 넣는다.
xlsx.utils.book_append_sheet( workbook, firstSheet, "Customers" );

// 엑셀파일을 생성하고 저장한다.
xlsx.writeFile( workbook, "./xlsx/customers.xlsx" ); 