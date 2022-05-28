import React, { useEffect } from "react";
import { SidebarData } from "./SidebarData";
import "../AdminComponents/AdminSidebar.css";
import "./Sidebar.css";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import { IoMdPeople } from "react-icons/io";
import { IoMedkitOutline, IoMedkit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const { notification, user, setNotification } = useAuth();

  useEffect(() => {
    const fetchNotif = () => {
      socket.emit("notif", user.userId);
      socket.on("get_notif", (data) => {
        setNotification(data);
      });
    };

    if (user !== null) {
      fetchNotif();
    }
  }, [socket]);

  return (
    <div className="admin-sidebar">
      {SidebarData.map((item) => {
        return (
          <div
            onClick={() => navigate(item.link)}
            key={item.name}
            className={
              item.link === path ||
              path.includes(item.link2) ||
              path.includes(item.link3) ||
              path.includes(item.link4) ||
              path.includes(item.link5)
                ? "icon-container-active"
                : "icon-container"
            }
          >
            <div className="icon">
              {item.link === path ||
              path.includes(item.link2) ||
              path.includes(item.link3) ||
              path.includes(item.link4) ||
              path.includes(item.link5)
                ? item.activeIcon
                : item.icon}
            </div>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
