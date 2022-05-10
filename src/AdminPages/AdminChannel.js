import React from "react";
import "./AdminPeople.css";
import "./AdminDashboard.css";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";

const AdminChannel = () => {
  return (
    <>
      <div className="container">
        <AdminSidebar />

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <h2 className="heading">Reports</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChannel;
