const xlsx = require('xlsx');

const workbook = xlsx.readFile('./xlsx/test.xlsx'); // 엑셀 파일 읽어서 workbook로 변환
const firstSheetName = workbook.SheetNames[0]; // 엑셀 파일의 첫번째 시트 이름 가져오기
const firstSheet = workbook.Sheets[firstSheetName]; // 시트 이름을 사용해서 엑셀 파일의 첫번째 시트 가져오기

console.log(firstSheet['A2'].v); // 엑셀 시트의 특정 셀의 값을 읽음, 'John Doe' 출력

const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet); // utils.sheet_to_json 함수를 사용해서 첫번째 시트 내용을 json 데이터로 변환
console.log(firstSheetJson); // 콘솔창에 josn 출력
