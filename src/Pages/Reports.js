import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import { Helmet } from "react-helmet";
import "./Reports.css";
import GenerateReport from "../Components/GenerateReport";
import GenerateReport2 from "../Components/GenerateReport2";
import useAuth from "../Hooks/useAuth";

const Reports = () => {
  const { user } = useAuth();
  const [filterModal, setFilterModal] = useState(false)

  return (
    <>
      <Helmet>
        <title>Reports | ZCMC Telemedicine</title>
      </Helmet>

      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            {/* {user.designation === "623ec7fb80a6838424edaa29" ? (
              <GenerateReport2 />
            ) : (
              <GenerateReport />
            )} */}
            <GenerateReport filterModal={filterModal} setFilterModal={setFilterModal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
