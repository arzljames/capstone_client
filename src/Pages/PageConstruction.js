import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Helmet } from "react-helmet";
import "../Components/UserManualNavbar";
import UserManualNavbar from "../Components/UserManualNavbar";
import "../Pages/UserManual/UserManual.css";
import { useNavigate } from "react-router-dom";
import "./PageConstruction.css";
import construction from "../Assets/construction.svg";

const PageConstruction = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Page Under Constructions | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <UserManualNavbar />
            <div style={{ position: "relative" }} className="content-body">
              <div className="content-wrapper">
                <div className="constructions">
                  <img src={construction} />
                  <br />
                  <h1>Coming Soon</h1>
                  <h2>The page is currently under constructions</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageConstruction;
