import process from 'process';

process.on('beforeExit', (code) => {
  console.log('2. 이벤트 루프에 등록된 작업이 모두 종료된 후 노드 프로세스를 종료하기 직전: ', code);
});

process.on('exit', (code) => {
  console.log('3. 노드 프로세스가 종료될 때: ', code);
});

console.log('1. 콘솔에 출력되는 첫번째 메시지');
//콘솔에 출력되는 순서
//1. 콘솔에 출력되는 첫번째 메시지
//2. 이벤트 루프에 등록된 작업이 모두 종료된 후 노드 프로세스를 종료하기 직전: 0
//3. 노드 프로세스가 종료될 때: 0