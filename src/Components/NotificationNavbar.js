import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const NotificationNavbar = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  const { patients, user, notification } = useAuth();

  return (
    <div className="notification-nav">
      <div className="notification-header">
        <h1>Notifications</h1>
      </div>
      <div className="notification-body"></div>
    </div>
  );
};

export default NotificationNavbar;
