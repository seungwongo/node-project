const fs = require('fs'); //fs는 파일시스템 모듈로 파일 읽기,쓰기 등을 할 수 있는 내장 모듈
const {Console} = require('console'); //console 모듈 사용

const output = fs.createWriteStream('./stdout.log');  //파일 쓰기가 가능하도록 스트림 생성
const errorOutput = fs.createWriteStream('./stderr.log');  //파일 쓰기가 가능하도록 스트림 생성

const logger = new Console({ stdout: output, stderr: errorOutput }); //콘솔 클래스 생성
const count = 5;
logger.log('count: %d', count); //stdout.log 파일에 count: 5 기록
logger.error('count: ' + count); //stderr.log 파일에 count: 5 기록