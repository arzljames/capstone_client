import React from "react";
import { useNavigate } from "react-router-dom";

const UserManualNavbar = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  return (
    <div className="usermanual-nav">
      <div className="usermanual-nav-header">
        <h1>Documentation</h1>
      </div>
      <h5>Getting Started</h5>
      <ul>
        <li
          className={path.includes("introduction") ? "active" : ""}
          onClick={() => navigate("/user-manual/guide/introduction")}
        >
          Introduction
        </li>
        <li
          className={path.includes("quick-start") ? "active" : ""}
          onClick={() => navigate("/user-manual/guide/quick-start")}
        >
          Quick Start
        </li>
      </ul>

      <h5>Modules</h5>
      <ul>
        <li onClick={() => navigate("/constructions")}>Adding Patient</li>
        <li onClick={() => navigate("/constructions")}>Adding Case</li>
        <li onClick={() => navigate("/constructions")}>Chat</li>
        <li onClick={() => navigate("/constructions")}>Reports</li>
      </ul>
    </div>
  );
};

export default UserManualNavbar;
