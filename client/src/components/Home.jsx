import React from "react";
import { NavLink } from "react-router-dom";
import transferMoney from "../Images/transfer money.png";
const Home = () => {
  return (
    <>
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row d-fllex align-items-center justify-content-around">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <h1>
                    Transact Securly With
                    <strong className="brand-name"> Instant Bank </strong>
                  </h1>
                  <div className="mt-3">
                    <NavLink to="/allcustomers" className="btn-get-started">
                      Get Started
                    </NavLink>
                  </div>
                </div>

                <div className="col-lg-6 order-1 order-lg-1 header-img">
                  <img
                    src={transferMoney}
                    className="img-fluid animated"
                    alt="Home"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
