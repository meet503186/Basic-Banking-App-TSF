const Transaction = require("../model/transactions");

const getTransactionsHistory = async (req, res, next) => {
  try {
    const transactionsHistory = await Transaction.find({});
    req.transactionsHistory = transactionsHistory;
    next();
  } catch (err) {
    res.status(401).send("Error");
    console.log(err);
  }
};

module.exports = getTransactionsHistory;
