import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "./AccountSettings.css";
import { HiChevronLeft, HiCheck } from "react-icons/hi";
import NoUser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import ChangePasswordModal from "../Components/ChangePasswordModal";
import Helmet from "react-helmet";
import { IoKey } from "react-icons/io5";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, facilities, specializations } = useAuth();
  const [account, setAccount] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        let response = await api.get("/api/user/users");

        if (response) {
          setAccount(response.data.filter((e) => e._id === user.userId)[0]);
          console.log(account);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccount();
  }, [user]);

  if (account === null) {
    return (
      <div className="wait-spinner-container">
        <PulseLoader size={8} margin={2} color="#058e46" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Account Settings | ZCMC Telemedicine</title>
      </Helmet>
      <AnimatePresence>
        {modal && <ChangePasswordModal setModal={setModal} />}
      </AnimatePresence>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            <div className="content-wrapper">
              <div className="account">
                <div className="acc-header">
                  <p onClick={() => navigate(-1)}>
                    <HiChevronLeft />
                  </p>
                  <h2>My Account</h2>
                </div>

                <div className="acc-overview">
                  <img
                    src={!account.picture ? NoUser : account.picture}
                    alt="Avatar"
                  />
                  <div className="acc-overview-name">
                    <h3>Dr. {account.firstname + " " + account.lastname}</h3>
                    <p>{account.email}</p>
                  </div>
                </div>
                <div className="acc-personal">
                  <label>Account Status</label>
                  <p>
                    {account.verified === false
                      ? "Unverified"
                      : "Verified User"}{" "}
                    <div>
                      <HiCheck />
                    </div>
                  </p>
                  <label>Display name</label>
                  <p>{account.firstname + " " + account.lastname}</p>

                  <label>Email</label>
                  <p>{account.email}</p>

                  <label>Password</label>
                  <p className="password">******************</p>

                  <button
                    onClick={() => setModal(true)}
                    className="change-password-btn"
                  >
                    <p className="key">
                      <IoKey />
                    </p>{" "}
                    Change Password
                  </button>
                </div>

                <div className="acc-personal">
                  <label>Hospital</label>
                  <p>
                    {
                      facilities.filter((e) => e._id === user.designation)[0]
                        .facility
                    }
                  </p>
                  <label>Specialization</label>

                  {user.designation !== "623ec7fb80a6838424edaa29" ? (
                    <p>N/A</p>
                  ) : (
                    <p>
                      {
                        specializations.filter(
                          (e) => e._id === user.specialization
                        )[0].specialization
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
