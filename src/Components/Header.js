import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-header">
      <h1 onClick={() => navigate("/")}>Telemedicine</h1>

      <ProfileHeader />
    </div>
  );
};

export default Header;
