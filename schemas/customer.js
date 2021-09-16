const mongoose = require('mongoose');

const {Schema} = mongoose;
const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  }
})

module.exports = mongoose.model('Customer', customerSchema);