import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import TransactionsHistory from "./TransactionsHistory";
import AllCustomers from "./Users/AllCustomers";
import CustomerDetail from "./Users/CustomerDetail";
import TransferMoney from "./TransferMoney";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/transactionshistory"
          component={TransactionsHistory}
        />
        <Route exact path="/allcustomers" component={AllCustomers} />
        <Route exact path="/customerdetail" component={CustomerDetail} />
        <Route exact path="/transfermoney" component={TransferMoney} />
      </Switch>
    </>
  );
};

export default App;
