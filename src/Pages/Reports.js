import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import { Helmet } from "react-helmet";
import "./Reports.css";
import useAuth from "../Hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import FilterReportModal from "../Components/FilterReportModal";
import { HiPlus, HiFilter } from "react-icons/hi";
import "./Reports.css";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import "./Patients.css";
import { toast, ToastContainer } from "react-toastify";

const Reports = () => {
  const { reports } = useAuth();
  const [filterModal, setFilterModal] = useState(false);

  const getDate = (date) => {
    let todate = new Date(date);
    let today =
      todate.toLocaleString("en-us", { month: "short" }) +
      " " +
      todate.getDate() +
      "," +
      " " +
      todate.getFullYear();

    return today;
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Reports | ZCMC Telemedicine</title>
      </Helmet>

      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        />
        <AnimatePresence>
          {filterModal && <FilterReportModal setFilterModal={setFilterModal} />}
        </AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            <div className="content-wrapper">
              <div className="reports-header">
                <h2>Reports</h2>
                <div className="reports-header-btns">
                  <button
                    onClick={() => setFilterModal(true)}
                    className="create-report"
                  >
                    <p>
                      <HiPlus />
                    </p>
                    Create Report
                  </button>
                </div>
              </div>

              <div className="table">
                <div className="table-header">
                  <div className="rp-id">Report ID</div>
                  <div className="rp-created">Created By</div>
                  <div className="rp-date">Date Created</div>
                  <div className="rp-modified">Last modified</div>
                </div>
                {reports.map((item, index) => {
                  return (
                    <div key={index} className="table-body">
                      <div className="rp-id">
                        <p
                          onClick={() =>
                            navigate(`/reports/${item._id}/${item.reportId}`)
                          }
                        >
                          {item.reportId}
                        </p>
                      </div>
                      <div className="rp-created">
                        Dr.{" "}
                        {item.creator.firstname + " " + item.creator.lastname}
                      </div>
                      <div className="rp-date">{getDate(item.createdAt)}</div>
                      <div className="rp-modified">
                        {
                          <ReactTimeAgo
                            date={item.updatedAt}
                            locale="en-US"
                            timeStyle="round-minute"
                          />
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
