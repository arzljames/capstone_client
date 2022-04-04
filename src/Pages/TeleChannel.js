import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./TeleChannel.css";
import {Helmet} from 'react-helmet'

const TeleChannel = () => {
  return (
    <>
    <Helmet>
      <title>Channels | ZCMC Telemedicine</title>
    </Helmet>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            <div className="admin-subheading">
              <h2>Channels</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeleChannel;
