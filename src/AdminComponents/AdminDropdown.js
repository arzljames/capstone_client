import React, { useState, useEffect } from "react";
import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import NoUser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import { HiCamera } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import DpModal from "../Components/DpModal";
import LogoutModal from "../Components/LogoutModal";
import { Navigate, useNavigate } from "react-router-dom";

const AdminDropdown = ({ submitLogout, users }) => {

  //AdminDropdown Component States
  const [dp, setDp] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();


  //Framer motion animation variant 
  const variant = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      <AnimatePresence>
        {dp && (
          <DpModal
            image={!users.picture ? NoUser : users.picture}
            setDp={setDp}
          />
        )}

        {logout && (
          <LogoutModal setLogout={setLogout} submitLogout={submitLogout} />
        )}

        <motion.div
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="profile-container-dropdown"
        >
          <div className="profile-name-picture">
            <div className="profile-name-picture-container">
              <span
                onClick={() => {
                  setDp(true);
                }}
              >
                <HiCamera />
              </span>

              <img src={!users.picture ? NoUser : users.picture} alt="Avatar" />
            </div>
            <div className="text-wrapper">
              <h5>
                {user.firstname} {user.lastname}
              </h5>
              <p className="p-active-status">System Administrator</p>
            </div>
          </div>
          <ul style={{ border: "none" }}>
            <li onClick={() => navigate("/settings/admin-account")}>
              <p>
                <IoSettingsOutline />
              </p>
              Account Settings
            </li>
            <li onClick={() => setLogout(true)}>
              <p>
                <IoExitOutline />
              </p>
              Sign Out
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AdminDropdown;
