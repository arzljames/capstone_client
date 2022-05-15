import React from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import "../../Components/UserManualNavbar";
import UserManualNavbar from "../../Components/UserManualNavbar";
import "./UserManual.css";

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
              <div className="usermanual-body">
                <div className="manual-title">
                  <h2>
                    <span>#</span>Introduction
                  </h2>
                </div>

                <div className="content">
                  <h2>What is Telemedicine?</h2>
                  <p>Telemedicine is a Web Application for </p>
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
