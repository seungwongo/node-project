const express = require("express");
const mongodb = require("./mongoose"); // mongoose 폴더의 index.js
const Customer = require("./mongoose/schemas/customer");

const app = express();

mongodb.connect(); // MongoDB 연결

app.listen(3000, () => {
  // 3000번 포트로 웹 서버 실행
  console.log("Server started. port 3000.");
});

app.get("/customers", async (req, res) => {
  // localhost:3000/customers 접속 시 실행
  const customers = await Customer.find(); // 별도의 조회 조건 없이 customers 컬렉션이 모든 문서 조회
  console.log(customers);
});

app.post("/customers/insert", async (req, res) => {
  const r = await Customer.create({
    name: "Jeremy Go2",
    email: "jeremy2@mail.com",
    phone: "010-2222-1111",
    address: "",
  });
  console.log(r);

  res.send(r);
});