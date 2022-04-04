import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Profile = () => {
  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
