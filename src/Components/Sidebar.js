import React, { useEffect } from "react";
import { SidebarData } from "./SidebarData";
import "../AdminComponents/AdminSidebar.css";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import { IoMdPeople } from "react-icons/io";
import { IoMedkitOutline, IoMedkit } from "react-icons/io5";

const Sidebar = () => {
  const path = window.location.pathname;
  const { notification, user, setNotification } = useAuth();

  useEffect(() => {
    const fetchNotif = () => {
      socket.emit("notif", user.userId);
      socket.on("get_notif", (data) => {
        setNotification(data);
      });
    };

    fetchNotif();
  }, [socket]);

  return (
    <div className="admin-sidebar">
      {SidebarData.map((item) => {
        return (
          <Link
            to={item.link}
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
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
