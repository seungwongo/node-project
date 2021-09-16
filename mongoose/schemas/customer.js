const mongoose = require('mongoose');

const {Schema} = mongoose;
const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  }
})

const Customer = mongoose.model('Customer', customerSchema); // 스키마를 사용해서 모델 생성

module.exports = Customer;