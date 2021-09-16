const os = require('os');
console.log(os.arch()); // x64
console.log(os.cpus()); // 컴퓨터의 CPU 코어 정보를 배열로 리턴
console.log(os.hostname()); // 운영체제 호스트명
console.log(os.networkInterfaces()); //네트워크 정보
console.log(os.type()); // 운영체제 타입
console.log(os.platform()); //darwin
console.log(os.release()); //운영체제 버전
console.log(os.homedir()); //홈 디렉터리 경로
console.log(os.tmpdir()); //임시 파일 저장 경로
console.log(os.totalmem()); //전체 메모리 크기
console.log(os.freemem()); //사용 가능한 메모리 크기
