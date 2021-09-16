const cron = require('node-cron');

// cron.schedule('* * * * * *', () => {
//   console.log('1초 마다 작업이 실행 됩니다.');
// });

// cron.schedule('* * * * *', () => {
//   console.log('1분 마다 작업이 실행 됩니다.');
// });

// cron.schedule('1,2,4,5 * * * *', () => {
//   console.log('매 시간의 1분, 2분, 4분, 5분에 실행 됩니다.'); // 예 13:01, 13:02, 13:04, 13:05, 14:01. 14:02, 14:04, 14:05 등
// });

// cron.schedule('1-5 * * * *', () => {
//   console.log('매 시간의 1분, 2분, 3분, 4분, 5분에 실행 됩니다.');
// });

// cron.schedule('* * * January,September Sunday', () => {
//   console.log('1월과 9월의 일요일에 실행 됩니다.'); 
// });

// cron.schedule('0 9 * * Monday', () => {
//   console.log('매주 월요일 09:00에 실행 됩니다.'); 
// });


// cron.schedule('0 1 * * *', () => {
//   console.log('매일 America/Sao_Paulo 타임존 기준으로 01:00 마다 작업이 실행 됩니다.');
// }, {
//   scheduled: true,
//   timezone: "America/Sao_Paulo"
// });


// const task = cron.schedule('* * * * *', () =>  {
//   console.log('start() 함수 실행 후 부터 매 1분 마다 실행 됩니다.');
// }, {
//   scheduled: false // start() 함수로 시작하기 전까지는 스케줄링된 작업이 실행이 되지 않음
// });

// task.start(); // 스케줄링 작업을 시작함


// const task = cron.schedule('* * * * *', () =>  {
//   console.log('매 1분 마다 실행되는 작업이 stop() 함수 실행 후에는 중지가 됨.');
// });

// task.stop(); // 스케줄링된 작업을 중지 시킴

// const task = cron.schedule('* * * * *', () =>  {
//   console.log('매 1분 마다 실행되는 작업이 destroy() 함수 실행 후에는 완전히 삭제 됨.');
// });

// task.destroy(); // 스케줄링된 작업을 삭제 함

var valid = cron.validate('59 * * * *'); // true
var invalid = cron.validate('60 * * * *'); // false

console.log(valid)