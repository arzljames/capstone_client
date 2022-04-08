import React, { useContext, useState, useRef, useEffect } from "react";
import "./AdminHeader.css";
import NoUser from "../Assets/nouser.png";
import api from "../API/Api";
import AdminDropdown from "./AdminDropdown";
import DataContext from "../Context/DataContext";
import { motion } from "framer-motion";
import {
  HiDotsHorizontal,
  HiCheck,
  HiOutlineClock,
  HiOutlineX,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const AdminProfileHeader = () => {
  const { user, appState, setAppState, status, setStatus } = useAuth();
  const firstname = `${user.firstname} `;
  const fullName = firstname.split(" ");
  const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);

  const navigate = useNavigate();
  const path = window.location.pathname;

  const submitLogout = async () => {
    try {
      let response = await api.get("/api/auth/logout");
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [dropdown, setDropdown] = useState(false);
  let domNode = useClickOutside(() => {
    setDropdown(false);
  });

  return (
    <div ref={domNode} className="admin-profile-header">
      <motion.div
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={() => navigate(`/profile/${user.username}`)}
        className={
          path.includes(user.username)
            ? "admin-profile-name-active"
            : "admin-profile-name"
        }
      >
        <div className="admin-profile-picture">
          {/* <img src={!user.picture ? NoUser : user.picture} alt="Avatar" /> */}
          {!user.picture && <p>{initials}</p>}
          <div
            className={
              status === "Online"
                ? "active-status-online"
                : "active-status-offline"
            }
          ></div>
        </div>
        <h5>{user.firstname}</h5>
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={() => setDropdown(!dropdown)}
        className={dropdown ? "profile-settings-active" : "profile-settings"}
      >
        <p>
          <HiDotsHorizontal />
        </p>
      </motion.div>

      {dropdown && <AdminDropdown submitLogout={submitLogout} />}
    </div>
  );
};

export default AdminProfileHeader;
