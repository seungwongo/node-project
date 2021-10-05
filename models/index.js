'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // 노드 실행 환경 가져오기, 설정된 값이 없으면 development 
const config = require(__dirname + '/../config/config.json')[env]; // 실행 환경에 맞는 DB 접속 정보 가져오기
const db = {};

let sequelize;
if (config.use_env_variable) { // config 정보에 use_env_variable로 정의된 값이 있는지 확인
  // .env 같은 모듈을 사용해서 환경 변수에 데이터베이스 접속 정보를 등록해서 사용한다면, use_en_variable에 정의된 값을 키로 환경 변수에서 데이터베이스 접속 정보를 가져와서 Sequelize 객체 생성
  sequelize = new Sequelize(process.env[config.use_env_variable], config); 
} else { // config 정보에 use_env_variable로 정의된 값이 없으면
  // config에 있는 database, username, password 등을 사용해서 Sequelize 객체 생성
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// models 폴더에 있는 데이터베이스 테이블 맵핑을 위해 생성한 js 파일을 모두 읽어와서 Sequlize 모델로 변환하고 db 객체에 저장 
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); // index.js 파일을 제외한 models 폴더에 있는 js 파일을 가져옵니다.
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // 모델이 정의된 .js 파일을 통해서 Sequelize 모델 생성
    db[model.name] = model; // db 객체에 모델 정보 저장
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { 
    // 테이블 맵핑을 위해 생성한 model 파일의 associate 함수로 전체 모델 정보를 전달해서 모델 간의 연관 관계 설정합니다.
    // 여기서 연관 관계라는 것은 RDBMS에서 테이블간의 외래키를 설정하는 것과 같은 테이블의 연관 관계를 Sequelize 모델에서 하는 것입니다.
    db[modelName].associate(db); 
  }
});

db.sequelize = sequelize; // sequelize 할당
db.Sequelize = Sequelize; // Sequelize 할당

module.exports = db;
