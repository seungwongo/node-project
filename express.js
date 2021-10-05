const express = require('express')
const app = express() 

app.listen(3000, () => { // 3000번 포트로 웹 서버 실행
  console.log('Server started. port 3000.')
})

