const express = require('express')
const timeout = require('connect-timeout')

const app = express()

app.use(timeout('5s')) // 모든 라우터에 대해서 5초의 타임아웃을 설정함

app.post('/save', timeout('5s'), express.json(), haltOnTimedout, function (req, res, next) {
  savePost(req.body, function (err, id) {
    if (err) return next(err)
    if (req.timedout) return
    res.send('saved as id ' + id)
  })
})

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

function savePost (post, cb) {
  setTimeout(function () {
    cb(null, ((Math.random() * 40000) >>> 0))
  }, (Math.random() * 7000) >>> 0)
}

app.listen(3000)