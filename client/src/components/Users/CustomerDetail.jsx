import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomerData from "./CustomerData";

const CustomerDetail = (props) => {
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
      <div className="detail-container">
        <div className="detail shadow">
          <div className="user-img">
            <i className="fas fa-user"></i>
          </div>
          <div className="text">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Name
              </span>
              <select className="form-select" disabled>
                {customersList.customersData.map((arrEle, index) => {
                  return index === CustomerData[0] ? (
                    <option defaultValue> {arrEle.name}</option>
                  ) : null;
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Email Id
              </span>
              <select className="form-select" disabled>
                {customersList.customersData.map((arrEle, index) => {
                  return index === CustomerData[0]
                    ? <option defaultValue> {arrEle.email}</option>
                    : null;
                })}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Balance
              </span>
              <select className="form-select" disabled>
                {customersList.customersData.map((arrEle, index) => {
                  return index === CustomerData[0]
                    ? <option defaultValue> {arrEle.balance}</option>
                    : null;
                })}
              </select>
            </div>
            <div className="mt-5 d-flex">
              <NavLink
                className="btn-transfer-money common"
                to="/transfermoney"
                style={{ width: "11rem" }}
              >
                Transfer Money
              </NavLink>
              <NavLink
                className="outlined-btn common"
                to="/allcustomers"
                style={{ width: "11rem" }}
              >
                All Cutomers
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail;
