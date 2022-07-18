import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";
import AdminProfileHeader from "./AdminProfileHeader";
import ZCMCLOGO from "../Assets/zcmc_logo.png";


//Header for admin page(s)
const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-header">
      <div className="admin-header-brand">
        <h1 onClick={() => navigate("/")}>
          <img src={ZCMCLOGO} alt="Logo" />
          TeleMedicine
        </h1>
      </div>

      <AdminProfileHeader />
    </div>
  );
};

export default AdminHeader;
