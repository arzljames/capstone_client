import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../Components/Header.css";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import Welcome from "../Assets/Welcome.svg";
import { Helmet } from "react-helmet";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Loader";
import { Redirect } from "react-router-dom";

const Homepage = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Loader />;
  }

  if (!user.loggedIn && user.userType !== "user") {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Helmet>
        <title>Consultation | ZCMC Telemedicine</title>
      </Helmet>

      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="no-content">
                <img src={Welcome} alt="Welcome Doctors" />
                <p>
                  Welcome to ZCMC's <b>Telemedicine</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
