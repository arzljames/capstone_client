import React, { useEffect, useState } from "react";
import "./Header.css";
import "../AdminComponents/AdminHeader.css";
import ProfileHeader from "./ProfileHeader";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-header">
      <h1 onClick={() => navigate("/")}>TeleMedicine</h1>

      <ProfileHeader />
    </div>
  );
};

export default Header;
