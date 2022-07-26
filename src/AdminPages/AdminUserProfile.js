import React from "react";
import "./AdminUserProfile.css";
import "./AdminDashboard.css";
import { useContext } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import DataContext from "../Context/DataContext";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";


//Component used for admin header component
const AdminUserProfile = () => {
  const { user } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {user.userType === "user" && (
        <Navigate to="/" state={{ from: location }} replace />
      )}
      {user.loggedIn === false && (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
      <div className="container">
        <AdminSidebar />
        <AdminHeader />
      </div>
    </>
  );
};

export default AdminUserProfile;
