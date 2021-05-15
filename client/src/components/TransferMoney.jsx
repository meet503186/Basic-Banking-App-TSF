import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomerData from "./Users/CustomerData";
const TransferMoney = () => {
  const history = useHistory();
  const [receiver, setReceiver] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);

  const [selectCustomer, setSelectCustomer] = useState({
    customersData: [],
  });

  const getCustomersList = async () => {
    try {
      const res = await fetch("/allcustomers", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const customersList = await res.json();

      setSelectCustomer({ customersData: customersList });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomersList();
  }, []);

  const transferMoney = async (event) => {
    event.preventDefault();

    const senderEmail = document.getElementById("sender").innerText;
    const receiverEmail = receiver;
    const amount = paymentAmount;

    const res = await fetch("/transfermoney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail,
        receiverEmail,
        amount,
      }),
    });

    const data = await res.json();
    console.log(res.status);
    if (res.status === 422) {
      window.alert("Insufficient Amount");
    } else if (res.status === 201) {
      window.alert("Transaction Successfull");
      history.push("/transactionshistory");
    } else {
      window.alert("All fields are required");
    }
  };

  return (
    <>
      <div className="main-container">
        <form method="POST" className="transfer-money-form shadow">
          <h1> Transfer Money </h1>

          <div className="input-group my-5">
            <span className="input-group-text">Sender</span>
            <select id="disabled" className="form-select" disabled>
              {selectCustomer.customersData.map((arrEle, index) => {
                return index === CustomerData[0] ? (
                  <option id="sender" defaultValue>
                    {arrEle.email}
                  </option>
                ) : null;
              })}
            </select>
          </div>

          <div className="input-group my-5">
            <span className="input-group-text">Receiver</span>
            <select
              className="form-select"
              onChange={(event) =>
                setReceiver(event.target[event.target.selectedIndex].text)
              }
            >
              <option defaultValue>Choose Receiver</option>
              {selectCustomer.customersData.map((customer, index) => {
                return (
                  <>
                    {index !== CustomerData[0] ? (
                      <option key={customer._id} value={customer._id}>
                        {customer.email}
                      </option>
                    ) : null}
                  </>
                );
              })}
            </select>
          </div>

          <div className="input-group my-5">
            <span className="input-group-text">Amount</span>
            <input
              type="Number"
              className="form-control input-amount"
              placeholder="Enter Amount in INR"
              onChange={(event) => setPaymentAmount(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn-transfer-money"
            onClick={transferMoney}
          >
            Transfer
          </button>
        </form>
      </div>
    </>
  );
};

export default TransferMoney;
