import React, { useState, useEffect } from "react";

const TransactionsHistory = () => {
  const [transactionsList, setTransactionsList] = useState({
    transactionsData: [],
  });

  const getTransactionsList = async () => {
    try {
      const res = await fetch("/transactionshistory", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const transactionsList = await res.json();

      setTransactionsList({ transactionsData: transactionsList });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransactionsList();
  }, []);

  return (
    <>
      <h1
        style={{ marginTop: "3rem", textAlign: "center", fontSize: "3.5rem" }}
      >
        Transaction History
      </h1>
      <div className="transactions-container">
        <div className="transaction">
          <h2> S. No. </h2>
          <h2> Sender's Email </h2>
          <h2> Receiver's Email </h2>
          <h2> Amount </h2>
        </div>
        {transactionsList.transactionsData.map((transaction, index) => {
          return (
            <div className="transaction">
              <h2> {index + 1} </h2>
              <h2> {transaction.senderEmail} </h2>
              <h2> {transaction.receiverEmail} </h2>
              <h2> {transaction.amount} </h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TransactionsHistory;
