const mongoose = require('mongoose');

const connect = () => {
  if(process.env.NODE_ENV !== 'production') { // 운영환경이 아닌 개발 환경일때만
    mongoose.set('debug', true);  // 콘솔에서 쿼리 내용을 확인할 수 있도록 디버그 모드 활성화 
  }

  // mongodb://[사용자이름]:[비밀번호]@호스트:포트번호/데이터베이스
  mongoose.connect('mongodb://root:1234@localhost:27017/admin', {
    dbName: 'dev', // 접속할 데이터베이스
  }, (error) => {
    if(error) {
      console.error('MongoDB 연결 에러', error);
    }else {
      console.log('MongoDB 연결 성공', 'localhost:27017/admin')
    }
  });
};

mongoose.connection.on('error', (error) => { // MongoDB 연결시 에러가 있을 때 발생하는 이벤트
  console.error('MongoDB 연결 에러', error);
});


mongoose.connection.on('disconnected', () => { // MongoDB 연결이 종료되었을 때 발생하는 이벤트
  console.error('MongoDB 연결이 종료되어 연결을 재시도 합니다.');
  connect();
});

module.exports = connect;