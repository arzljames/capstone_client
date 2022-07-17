import React, { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import "../AdminComponents/AdminSidebar.css";
import "./Sidebar.css";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import { IoMdPeople } from "react-icons/io";
import { IoMedkitOutline, IoMedkit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import notif from "../Assets/notif.mp3";
import useSound from "use-sound";

const Sidebar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [playbackRate, setPlaybackRate] = useState(1);
  const [play] = useSound(notif, { playbackRate });

  const { cases, user, setNotification, setCases } = useAuth();

  useEffect(() => {
    const fetchNotif = () => {
      socket.emit("notif", user.userId);
      socket.emit("case");
      socket.on("get_notif", (data) => {
        setNotification(data);
      });
      socket.on("get_case", (data) => {
        setCases(data);
      });
    };

    if (user !== null) {
      fetchNotif();
    }
  }, [socket]);

  const [refBadge, setRefBadge] = useState(false);
  const [docBadge, setDocBadage] = useState(false);

  useEffect(() => {
    const fetchBadge = () => {
      if (
        cases.filter(
          (e) => e.physician._id === user.userId && e.active === true
        ).length > 0
      ) {
        setRefBadge(true);
      } else if (
        cases.filter(
          (e) =>
            (e.specialization.includes(user.specialization) &&
              e.active === true) ||
            (e.subSpecialization
              .map((f) => f._id)
              .includes(user.specialization) &&
              e.active === true)
        ).length > 0
      ) {
        setDocBadage(true);
      } else {
        setDocBadage(false);
        setRefBadge(false);
      }
    };

    fetchBadge();
  }, [cases]);

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
            {(item.name === "Consult" && refBadge) ||
            (item.name === "Consult" && docBadge) ? (
              <div className="sidebar-badge"></div>
            ) : null}
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
