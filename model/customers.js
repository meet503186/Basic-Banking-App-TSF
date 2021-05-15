const mongoose = require("mongoose");

const customers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model("USER", customers);

module.exports = Customer;
