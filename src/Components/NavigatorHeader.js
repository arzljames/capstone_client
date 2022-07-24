import React, { useState, useEffect } from "react";
import "./Header.css";
import ProfileHeader from "./ProfileHeader";
import { useNavigate } from "react-router-dom";
import ZCMCLOGO from "../Assets/zcmc_logo.png";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import NoUser from "../Assets/nouser.png";
import { IoCaretDown } from "react-icons/io5";
import "./Header.css";
import "../AdminComponents/AdminHeader.css";

const NavigatorHeader = () => {
  const { user, pp, setPp, listUsers } = useAuth();

  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const path = window.location.pathname;

  let domNode = useClickOutside(() => {
    setDropdown(false);
  });

  useEffect(() => {
    const fetchPP = async () => {
      try {
        let response = await listUsers.filter((id) => id._id === user.userId)[0]
          .picture;

        if (response) {
          setPp(response);
        }
      } catch (error) {}
    };

    fetchPP();
  }, [listUsers]);
  return (
    <div className="admin-header">
      <h1 onClick={() => navigate("/navigator/dashboard")}>
        <img src={ZCMCLOGO} alt="Logo" /> TeleMedicine
      </h1>

      <div ref={domNode} className="admin-profile-header">
        <motion.div
          style={{ display: "flex", alignItems: "center" }}
          className={
            path.includes(user !== null ? user.username : "")
              ? "admin-profile-name-active"
              : "admin-profile-name"
          }
        >
          <div className="admin-profile-picture">
            <img src={!pp ? NoUser : pp} alt="Avatar" />
          </div>
          <h5>{user !== null ? user.firstname : ""}</h5>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          onClick={() => {
            setDropdown(!dropdown);
          }}
          className={dropdown ? "profile-settings-active" : "profile-settings"}
        >
          <p>
            <IoCaretDown />
          </p>
        </motion.div>

        {dropdown && <div></div>}
      </div>
    </div>
  );
};

export default NavigatorHeader;
