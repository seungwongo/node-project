const express = require('express')
const app = express() 

app.listen(3000, () => { // 3000번 포트로 웹 서버 실행
  console.log('Server started. port 3000.')
})

const COLOR_RED = '#ff0000'; // 빨간색
const COLOR_BLUE = '#0000ff'; // 파란색
const COLOR_BLACK = '#000000'; // 검정색
const COLOR_WHITE = '#ffffff'; // 흰색

