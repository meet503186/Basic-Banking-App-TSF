import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomerData from "./CustomerData";

const AllCustomers = (props) => {
  const [customersList, setCustomersList] = useState({
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

      setCustomersList({ customersData: customersList });

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

  return (
    <>
      <h1
        style={{ marginTop: "3rem", textAlign: "center", fontSize: "3.5rem" }}
      >
        All Customers
      </h1>
      <div className="customers-container">
        <div className="customers">
          <h2> S. No. </h2>
          <h2> Name </h2>
          <h2> Email Id </h2>
          <h2> Balance </h2>
          <h2> Operation </h2>
        </div>
        {customersList.customersData.map((customer, index) => {
          return (
            <div className="customers">
              <h2 className="id"> {index + 1} </h2>
              <h2 className="name"> {customer.name} </h2>
              <h2 className="email"> {customer.email} </h2>
              <h2 className="balance"> {customer.balance} </h2>

              <NavLink
                to="/customerdetail"
                className="details-btn outlined-btn"
                value={index}
                onClick={(e) => {
                  console.log(index);
                  CustomerData[0] = index;
                  console.log(CustomerData);
                }}
              >
                Details
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllCustomers;
