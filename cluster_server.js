const cluster = require('cluster');
const http = require('http');
const { cpus } = require('os');
const process = require('process');

const numCPUs = cpus().length; // CPU 수 가져오기

if (cluster.isPrimary) {  // 클러스터가 마스터 일때
  console.log(`Primary ${process.pid} is running`);

  // CPU 수 만큼 워커를 포크(생성) 합니다. 
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {  // 클러스터가 워커일 때
  // 워커들은 TPC 연결를 서로 공유할 수 있습니다.
  // HTTP 서버를 8000번 포트를 열고 다른 워크들과 8000번 포트를 공유합니다. 
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`); // 실행되는 워커의 프로세스 id를 콘솔에 출력
}