import React from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import "../../Components/UserManualNavbar";
import UserManualNavbar from "../../Components/UserManualNavbar";
import "./UserManual.css";
import homepage from "../../Assets/homepage.png";
import casea from "../../Assets/case.png";
import outgoing from "../../Assets/outgoing.png";

const Introduction = () => {
  return (
    <>
      <Helmet>
        <title>Introduction | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <UserManualNavbar />
            <div className="content-body">
              <div className="content-wrapper">
                <div className="usermanual-body">
                  <div className="manual-title">
                    <h2>
                      <span>#</span>Introduction
                    </h2>
                  </div>

                  <div className="content">
                    <h2>What is TeleMedicine?</h2>
                    <p>
                      TeleMedicine is a Web Application developed to cater the
                      necessity of other hospitals within the region. Snapshots
                      below shows the User Interface of the System:
                    </p>
                    <br />
                    <img src={homepage} alt="Homepage" />
                    <center>
                      {" "}
                      <em>Homepage</em>
                    </center>{" "}
                    <br />
                    <img src={casea} alt="Homepage" />
                    <center>
                      {" "}
                      <em>Consultation Case</em>
                    </center>{" "}
                    <br />
                    <img src={outgoing} alt="Homepage" />
                    <center>
                      {" "}
                      <em>Outgoing Request</em>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
