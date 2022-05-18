import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import { HiChevronLeft, HiCheck } from "react-icons/hi";
import NoUser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import ChangePasswordModal from "../Components/ChangePasswordModal";
import Helmet from "react-helmet";

const AdminAccountSettings = () => {
  const navigate = useNavigate();
  const { user, facilities } = useAuth();
  const [account, setAccount] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        let response = await api.get("/api/user/users");

        if (response) {
          setAccount(response.data.filter((e) => e.userType === "admin")[0]);
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
        <AdminSidebar />
        <div className="content">
          <AdminHeader />
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
                    <h3>{account.firstname}</h3>
                    <p>@{account.username}</p>
                  </div>
                </div>
                <div className="acc-personal">
                  <label>Account Status</label>
                  <p>
                    System Administrator
                    <div>
                      <HiCheck />
                    </div>
                  </p>
                  <label>Display name</label>
                  <p>{account.firstname}</p>

                  <label>Password</label>
                  <p className="password">*************</p>

                  <button
                    onClick={() => setModal(true)}
                    className="change-password-btn"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAccountSettings;
