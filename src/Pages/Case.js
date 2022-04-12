import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Helmet } from "react-helmet";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import {
  HiPlus,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiOutlineFilter,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import NewCase from "../Components/NewCase";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import Toast from "../Components/Toast";
import "./Case.css";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

const Case = () => {
  const [showCase, setShowCase] = useState(false);
  const [term, setTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("None");
  const [sort, setSort] = useState("Oldest");

  const navigate = useNavigate();
  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  let domNodeFilter = useClickOutside(() => {
    setIsFilter(false);
  });

  const { cases, hospitalSpec, user, toast } = useAuth();

  const getDate = (date) => {
    let dates = new Date(date);
    let today =
      dates.toLocaleString("en-us", { month: "short" }) +
      " " +
      dates.getDate() +
      "," +
      " " +
      dates.getFullYear();

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

  return (
    <>
      <Helmet>
        <title>Consultation Case | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <AnimatePresence>
          {showCase && <NewCase setShowCase={setShowCase} />}
          {toast && <Toast />}
        </AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="admin-subheading">
                <h2>Consultation Case</h2>
                <div className="subheading-btns">
                  {user.designation !== "623ec7fb80a6838424edaa29" && (
                    <button
                      onClick={() => setShowCase(true)}
                      className="add-case-btn"
                    >
                      <p>
                        <HiPlus />
                      </p>
                      Add Case
                    </button>
                  )}
                </div>
              </div>

              <div className="above-patient-table">
                <div className="patient-input-container">
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    type="search"
                    placeholder="Search case"
                  />
                  <div className="patient-input-icon">
                    <HiOutlineSearch />
                  </div>
                </div>

                <div className="above-patient-table-btns">
                  <button
                    className={isFilter ? "btn-active" : "btn-inactive"}
                    onClick={() => {
                      setIsFilter(!isFilter);
                      setIsSort(false);
                    }}
                  >
                    <p>
                      <HiOutlineFilter />
                    </p>
                    Filter by: {filter}
                    <AnimatePresence>
                      {isFilter && (
                        <motion.div
                          ref={domNodeFilter}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="filter-dropdown"
                        >
                          <ul>
                            <li onClick={() => setFilter("None")}>None</li>
                            <li
                              onClick={() => {
                                setFilter("Active");
                              }}
                            >
                              Active
                            </li>
                            <li
                              onClick={() => {
                                setFilter("Done");
                              }}
                            >
                              Done
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                  <button
                    className={isSort ? "btn-active" : "btn-inactive"}
                    onClick={() => {
                      setIsSort(!isSort);
                      setIsFilter(false);
                    }}
                  >
                    <p>
                      <HiOutlineSortDescending />
                    </p>
                    Sort by: {sort}
                    <AnimatePresence>
                      {isSort && (
                        <motion.div
                          ref={domNodeSort}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="sort-dropdown"
                        >
                          <ul>
                            <li>Oldest</li>
                            <li>Newest</li>

                            <li>Name (A-Z)</li>
                            <li>Name (Z-A)</li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="table-container">
                <div className="table">
                  <div className="table-header">
                    <div className="pt-no">#</div>
                    <div className="cs-id">Case No.</div>
                    <div className="cs-name">Patient</div>

                    <div className="cs-department">Department</div>
                    <div className="cs-date">Date & Time</div>
                    <div className="cs-status">Status</div>
                  </div>

                  {cases
                    .filter((e) =>
                      filter === "None"
                        ? e
                        : filter === "Active"
                        ? e.active === true
                        : e.active === false
                    )
                    .filter((val) => {
                      if (
                        user.designation === "623ec7fb80a6838424edaa29" &&
                        user.specialization === val.specialization
                      ) {
                        return val;
                      } else if (user.userId === val.physician._id) {
                        return val;
                      }
                    })
                    .map((item, index) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(`/consultation/case/case-data/${item._id}`)
                          }
                          className={
                            index % 2 === 0 ? "table-body" : "table-body-2"
                          }
                        >
                          <div className="pt-no">{index + 1}</div>
                          <div className="cs-id">{item.caseId}</div>
                          <div className="cs-name">
                            {item.patient.firstname +
                              " " +
                              item.patient.lastname}
                          </div>

                          <div className="cs-department">
                            {hospitalSpec
                              .filter((id) => id._id === item.specialization)
                              .map((e) => {
                                return e.name;
                              })}
                          </div>
                          <div className="cs-date">
                            {getDate(item.createdAt)} {getTime(item.createdAt)}
                          </div>
                          <div className="cs-status">
                            
                            <p className={item.active ? "active" : "done"}>
                            <div
                              className={
                                item.active
                                  ? "indicator active"
                                  : "indicator done"
                              }
                            ></div>{item.active ? "Active" : "Done"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Case;
