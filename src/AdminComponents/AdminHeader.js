import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";
import AdminProfileHeader from "./AdminProfileHeader";

const AdminHeader = () => {
 
  const navigate = useNavigate();
  return (
    <div className="admin-header">
      <div className="admin-header-brand">
        <h1 onClick={() => navigate("/dashboard")}>Telemedicine</h1>
      </div>

      <AdminProfileHeader />
    </div>
  );
};

export default AdminHeader;
