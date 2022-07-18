import React from "react";
import "./AdminSidebar.css";
import { AdminSidebarData } from "./AdminSidebarData";
import { useNavigate } from "react-router-dom";



//Admin siderbar navigation
const AdminSidebar = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();

  return (
    <div className="admin-sidebar">
      {AdminSidebarData.map((item) => {
        return (
          <div
            key={item.name}
            onClick={() => navigate(item.link)}
            className={
              item.link === path || path.includes(item.link)
                ? "icon-container-active"
                : "icon-container"
            }
          >
            <div className="icon">
              {item.link === path || path.includes(item.link)
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

export default AdminSidebar;
