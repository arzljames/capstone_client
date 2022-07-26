import React, { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import "../AdminComponents/AdminSidebar.css";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoMedkitOutline,
  IoMedkit,
} from "react-icons/io5";


//Component sidebar for navigator user
const NavigatorSidebar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <div className="admin-sidebar">
      <div
        onClick={() => navigate("/navigator/dashboard")}
        className={
          "/navigator/dashboard" === path ||
          path.includes("/navigator/dashboard")
            ? "icon-container-active"
            : "icon-container"
        }
      >
        <div className="icon">
          {"/navigator/dashboard" === path ||
          path.includes("/navigator/dashboard") ? (
            <IoHome />
          ) : (
            <IoHomeOutline />
          )}
        </div>
        <p>Dashboard</p>
      </div>

      <div
        onClick={() => navigate("/navigator/case")}
        className={
          "/navigator/case" === path || path.includes("/navigator/case")
            ? "icon-container-active"
            : "icon-container"
        }
      >
        <div className="icon">
          {"/navigator/case" === path || path.includes("/navigator/case") ? (
            <IoMedkit />
          ) : (
            <IoMedkitOutline />
          )}
        </div>
        <p>Case</p>
      </div>
    </div>
  );
};

export default NavigatorSidebar;
