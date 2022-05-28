import React, { useEffect, useState } from "react";
import "./Header.css";
import "../AdminComponents/AdminHeader.css";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

const Header = () => {
  return (
    <div className="admin-header">
      {/* <Link to="/"> */}
      <h1>TeleMedicine</h1>
      {/* </Link> */}

      <ProfileHeader />
    </div>
  );
};

export default Header;
