import React, { useContext, useState, useRef, useEffect } from "react";
import NoUser from "../Assets/nouser.png";
import api from "../API/Api";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import { IoNotifications } from "react-icons/io5";
import NotificationDropdown from "./NotificationDropdown";
import { useClickOutside } from "../Hooks/useClickOutside";
import { socket } from "./Socket";
import { IoCaretDown } from "react-icons/io5";

const ProfileHeader = () => {
  const { user, appState, setAppState, listUsers } = useAuth();

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
  const [dropdownNotif, setDropdownNotif] = useState(false);
  let domNode = useClickOutside(() => {
    setDropdown(false);
    setDropdownNotif(false);
  });

  const { notification, pp, setPp, status, setStatus } = useAuth();

  useEffect(() => {
    const fetchStatus = async () => {
      let response = await api.get("/api/user/users");

      if (response) {
        setStatus(
          response.data.filter((id) => id._id === user.userId)[0].activeStatus
        );
      }
    };

    fetchStatus();
  }, []);

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    setProfilePicture(users.picture);
  }, [socket]);

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
    <div ref={domNode} className="admin-profile-header">
      <motion.div
        className={
          path.includes(user !== null ? user.username : "")
            ? "admin-profile-name-active"
            : "admin-profile-name"
        }
      >
        <div className="admin-profile-picture">
          <img src={!pp ? NoUser : pp} alt="Avatar" />
          <div
            className={
              status === "Online"
                ? "active-status-online"
                : "active-status-offline"
            }
          ></div>
        </div>
        <h5>{user !== null ? user.firstname : ""}</h5>
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={() => {
          setDropdownNotif(!dropdownNotif);
          setDropdown(false);
        }}
        className={
          dropdownNotif ? "profile-settings-active" : "profile-settings"
        }
      >
        <p>
          <IoNotifications />
        </p>
        {notification.filter(
          (item) =>
            item.specialization === user.specialization && item.active === true
        ).length !== 0 ? (
          <div className="notif-badge">
            {
              notification.filter(
                (item) =>
                  item.specialization === user.specialization &&
                  item.active === true
              ).length
            }
          </div>
        ) : null}
      </motion.div>
      <motion.div
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={() => {
          setDropdown(!dropdown);
          setDropdownNotif(false);
        }}
        className={dropdown ? "profile-settings-active" : "profile-settings"}
      >
        <p>
          <IoCaretDown />
        </p>
      </motion.div>

      {dropdownNotif && (
        <NotificationDropdown setDropdownNotif={setDropdownNotif} />
      )}
      {dropdown && (
        <ProfileDropdown
          setDropdown2={setDropdown}
          profilePicture={profilePicture}
          users={users}
          submitLogout={submitLogout}
        />
      )}
    </div>
  );
};

export default ProfileHeader;
