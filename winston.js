const winston = require('winston'); // winston 모듈
const winstonDaily = require('winston-daily-rotate-file'); // 로그파일을 일자별로 생성 
const appRoot = require('app-root-path'); // app root 경로를 가져오는 lib
const process = require('process');

const logDir = `${apRoot}/logs`; // logs 디렉토리 하위에 로그 파일 저장

const {combine, timestamp, label, printf} = winston.format;

const logFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // 로그 출력 포맷 정의
});

const logger = winston.createLogger({
  format: combine(
    label({
      lable: 'System Name'
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({  // info 레벨 로그를 저장할 파일 설정
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // 최근 30일치 로그 파일만 저장
      zippedArchiv: true
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.error.log`,
      maxFiles: 30, // 최근 30일치 로그 파일만 저장
      zippedArchiv: true
    })
  ],
  exceptionHandlers: [  // uncaughtException 발생시
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30, // 최근 30일치 로그 파일만 저장
      zippedArchiv: true
    })
  ]
})

// 운영 환경이 아닌 경우 콘솔로도 로그 출력
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), // 색상 넣어서 출력
      winston.format.simple() // 간단한 포맷으로 출력
    )
  }));
}

module.exports = logger;