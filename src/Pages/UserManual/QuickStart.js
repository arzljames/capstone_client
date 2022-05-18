import React from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Helmet } from "react-helmet";
import "../../Components/UserManualNavbar";
import UserManualNavbar from "../../Components/UserManualNavbar";
import "./UserManual.css";
import { useNavigate } from "react-router-dom";
import register1 from "../../Assets/register1.png";
import register2 from "../../Assets/register2.png";
import register3 from "../../Assets/register3.png";

const QuickStart = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Quick Start | ZCMC Telemedicine</title>
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
                      <span>#</span>Quick Start
                    </h2>
                  </div>

                  <div className="content">
                    <h2>Registration</h2>
                    <p>
                      You will be needing an account to be able to use and
                      access the System. You will aslo need a valid gmail/email
                      account to receive the verification link that will send to
                      you in order to activate your TeleMedicine account. Click{" "}
                      <span onClick={() => window.open("/register", "_blank")}>
                        here
                      </span>{" "}
                      to register or by visiting this link:{" "}
                      <span onClick={() => window.open("/register", "_blank")}>
                        https://zcmc.vercel.app/register
                      </span>
                    </p>
                    <br />
                    <img src={register1} alt="Register" />
                    <br />
                    <p>
                      Fill up all the necessary input fields <br />
                      Note: All fields are required so you will get an error if
                      you skipped any of it.
                    </p>
                    <br />
                    <img src={register2} alt="Register" />
                    <p>
                      After that you will need to take wait for the
                      verificiation link that will send through your email. This
                      will verify and activate your account.{" "}
                    </p>{" "}
                    <br />
                    <br />
                    <h2>Signing In</h2>
                    <p>
                      To Sign In to TeleMedicine, use your authenticated
                      account. Enter your username and password in the input
                      field. <br />
                      <br />
                      Note: Before you Sign In make sure that you have already
                      activated and verified your account otherwise you cannot
                      access the System.
                    </p>
                    <br />
                    <img src={register3} alt="Register" />
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

export default QuickStart;
