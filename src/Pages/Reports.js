import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import { Helmet } from "react-helmet";
import "./Reports.css";
import useAuth from "../Hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import FilterReportModal from "../Components/FilterReportModal";
import {
  HiPlus,
  HiFilter,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import "./Reports.css";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import "./Patients.css";
import ReactPaginate from "react-paginate";

const Reports = () => {
  const { reports, ToastContainer } = useAuth();
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

  const getTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(reports.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [term, setTerm] = useState("");

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
            <div className="container-heading">
              <h2>Reports</h2>
              <div className="reports-header-btns">
                <button
                  onClick={() => setFilterModal(true)}
                  className="add-patient-btn"
                >
                  <p>
                    <HiPlus />
                  </p>
                  Report
                </button>
              </div>
            </div>

            <div className="table">
              <div className="table-header">
                <div className="rp-id">Report ID</div>
                <div className="rp-created">Created By</div>
                <div className="rp-date">Date & Time</div>
                <div className="rp-modified">Last modified</div>
              </div>
              <div className="table-body-container">
                {reports
                  .slice(
                    term === "" ? pagesVisited : 0,
                    term === "" ? pagesVisited + usersPerPage : reports.length
                  )
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          index % 2 === 0 ? "table-body" : "table-body-2"
                        }
                      >
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
                        <div className="rp-date">
                          {getDate(item.createdAt) +
                            " " +
                            getTime(item.createdAt)}
                        </div>
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
              <div className="pagination-container">
                <ReactPaginate
                  previousLabel={<HiChevronLeft size={20} />}
                  nextLabel={<HiChevronRight size={20} />}
                  breakLabel="..."
                  pageCount={pageCount}
                  marginPagesDisplayed={3}
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  breakClassName="page-item"
                  nextClassName="page-item"
                  previousClassName="page-item"
                  activeClassName="active"
                  onPageChange={changePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
