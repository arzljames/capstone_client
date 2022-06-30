import React from "react";
import "./Header.css";
import ProfileHeader from "./ProfileHeader";
import { useNavigate } from "react-router-dom";
import ZCMCLOGO from "../Assets/zcmc_logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-header">
      <h1 onClick={() => navigate("/")}>
        <img src={ZCMCLOGO} alt="Logo" /> TeleMedicine
      </h1>

      <ProfileHeader />
    </div>
  );
};

export default Header;
