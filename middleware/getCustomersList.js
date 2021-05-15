const Customer = require("../model/customers");

const getCustomersList = async (req, res, next) => {
  try {
    const customersList = await Customer.find({});
    req.customersList = customersList;
    next();
  } catch (err) {
    res.status(401).send("Error");
    console.log(err);
  }
};

module.exports = getCustomersList;
