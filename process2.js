const { nextTick } = require('process');

console.log('start');

setTimeout(() => {
  console.log('timeout callback');
}, 0);

nextTick(() => {
  console.log('nextTick callback');
});
console.log('end');

// 콘솔창 출력 순서
// start
// end
// nextTick callback
// timeout callback