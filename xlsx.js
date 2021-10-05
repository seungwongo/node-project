const xlsx = require('xlsx');

const workbook = xlsx.readFile('./xlsx/test.xlsx'); // 엑셀 파일 읽어서 workbook로 변환
const firstSheetName = workbook.SheetNames[0]; // 엑셀 파일의 첫번째 시트 이름 가져오기
const firstSheet = workbook.Sheets[firstSheetName]; // 시트 이름을 사용해서 엑셀 파일의 첫번째 시트 가져오기

console.log(firstSheet['A2'].v); // 엑셀 시트의 특정 셀(A2)의 값을 읽음, 'John Doe' 출력
firstSheet['B2'].v = 'john@gmail.com'; // 이메일 주소 변경
firstSheet['A3'] = {t:'s', v:'Jeremy'}; // 새로운 셀에 기록

xlsx.writeFile(workbook, './xlsx/test2.xlsx'); // 변경된 내용을 저장하여 새로운 엑셀 파일 생성

// const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); // utils.sheet_to_json 함수를 사용해서 첫번째 시트 내용을 json 데이터로 변환
// console.log(firstSheetJson); // 콘솔창에 josn 출력
