const express = require("express");
const router = express.Router();
const Customer = require("../model/customers");
const Transaction = require("../model/transactions");
const getCustomersList = require("../middleware/getCustomersList");
const getTransactionsHistory = require("../middleware/getTransactionsHistory");

router.get("/", (req, res) => {
  res.send(`Hello world from Server router`);
});

// Adding users to the database
router.post("/createUser", async (req, res) => {
  const { name, email, balance } = req.body;

  if (!name || !email || !balance) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    const userExist = await Customer.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    }

    const user = new Customer({ name, email, balance });

    const userCreated = await user.save();

    if (userCreated) {
      res.status(201).json({ message: "User added successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Adding transactions to the database
router.post("/transfermoney", async (req, res) => {
  const { senderEmail, receiverEmail, amount } = req.body;

  if (!senderEmail || !receiverEmail || !amount) {
    return res.status(422).json({ error: "All fields are required" });
  }
  console.log(senderEmail);

  try {
    const sender = await Customer.findOne({
      email: senderEmail,
    });
    const receiver = await Customer.findOne({
      email: receiverEmail,
    });

    if (sender.balance < amount) {
      return res.status(422).json({ error: "Insufficient Amount" });
    }
    sender.balance = parseInt(sender.balance) - parseInt(amount);
    receiver.balance = parseInt(receiver.balance) + parseInt(amount);

    await Customer.findOneAndUpdate(
      { email: senderEmail },
      { $set: { balance: sender.balance } }
    );
    await Customer.findOneAndUpdate(
      { email: receiverEmail },
      { $set: { balance: receiver.balance } }
    );

    const transaction = new Transaction({
      senderEmail,
      receiverEmail,
      amount,
    });
    const transactionAdded = await transaction.save();
    if (transactionAdded) {
      res.status(201).json({ message: "Transaction Successfull" });
    } else {
      res.status(422).json({ error: "Transaction Failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

// All Customers page

router.get("/allcustomers", getCustomersList, (req, res) => {
  res.send(req.customersList);
});

// Transactions History Page

router.get("/transactionshistory", getTransactionsHistory, (req, res) => {
  res.send(req.transactionsHistory);
});

module.exports = router;
