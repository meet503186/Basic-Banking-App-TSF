const mongoose = require("mongoose");

const transactions = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("TRANSACTION", transactions);

module.exports = Transaction;
