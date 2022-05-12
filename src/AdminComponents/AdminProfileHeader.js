import React, { useState, useRef, useEffect } from "react";
import "./AdminHeader.css";
import NoUser from "../Assets/nouser.png";
import api from "../API/Api";
import AdminDropdown from "./AdminDropdown";
import DataContext from "../Context/DataContext";
import { motion } from "framer-motion";
import { HiDotsHorizontal } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import { socket } from "../Components/Socket";

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchChat = () => {
      socket.emit("chat");
      socket.on("get_chat", (data) => {
        setUsers(data.filter((e) => e._id === user.userId)[0]);
      });
    };

    fetchChat();
  }, [socket]);

  return (
    <div ref={domNode} className="admin-profile-header">
      <motion.div className="admin-profile-name">
        <div className="admin-profile-picture">
          <img src={!users.picture ? NoUser : users.picture} alt="Avatar" />
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

      {dropdown && <AdminDropdown users={users} submitLogout={submitLogout} />}
    </div>
  );
};

export default AdminProfileHeader;
