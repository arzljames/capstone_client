import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "./AccountSettings.css";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import NoUser from "../Assets/nouser.png";

const AccountSettings = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            <div className="account">
              <div className="acc-header">
                <p onClick={() => navigate(-1)}>
                  <HiChevronLeft />
                </p>
                <h2>My Account</h2>
              </div>

              <div className="acc-overview">
                <img src={NoUser} alt="Avatar" />
                <div className="acc-overview-name">
                  <h3>Dr. John Lee</h3>
                  <p>arzljames15@gmail.com</p>
                </div>
              </div>
              <div className="acc-personal">
                <label>Display name</label>
                <p>John Lee</p>

                <label>Email</label>
                <p>arzljames15@gmail.com</p>

                <label>Password</label>
                <p>*************</p>
              </div>

              <div className="acc-personal">
                <label>Specialization</label>
                <p>Psyciatry</p>

                <label>Hospital</label>
                <p>Zamboanga City Medical Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
