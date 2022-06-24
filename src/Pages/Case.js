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
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import NewCase from "../Components/NewCase";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import "./Case.css";
import PatientModal from "../Components/PatientModal";
import ReactPaginate from "react-paginate";
import DeletePatientModal from "../Components/DeletePatientModal";

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

  const {
    cases,
    facilities,
    user,
    patients,
    hospitalSpec,
    toast,
    ToastContainer,
    specializations
  } = useAuth();

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

  const [patientModal, setPatientModal] = useState(false);
  const [patient, setPatient] = useState([]);

  const filterPatient = (id) => {
    setPatient(patients.filter((e) => e._id === id)[0]);
  };

  const [searchDropdown, setSearchDropdown] = useState(false);

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
  });

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(cases.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [deleteModal, setDeleteModal] = useState(false);


  // useEffect(() => {
  //   console.log(specializations.filter(e => e._id === '62b42301fb9b0f2c8bb1bb1a')[0].specialization)
  // }, [specializations])

  useEffect(() => {
    console.log(cases)
  },[cases])

  return (
    <>
      <Helmet>
        <title>Consultation Case | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        <AnimatePresence>
          {showCase && <NewCase setShowCase={setShowCase} />}

          {patientModal && (
            <PatientModal
              patient={patient}
              setPatientModal={setPatientModal}
              setDeleteModal={setDeleteModal}
            />
          )}

          {deleteModal && (
            <DeletePatientModal
              id={patient._id}
              name={patient.firstname}
              setDeleteModal={setDeleteModal}
              toast={toast}
              ToastContainer={ToastContainer}
            />
          )}
        </AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="content-wrapper">
                <div className="container-heading">
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
                      onFocus={() => setSearchDropdown(true)}
                      placeholder="Search case (ID, Patient, Service)"
                    />
                    <div className="patient-input-icon">
                      <HiOutlineSearch />
                    </div>

                    {searchDropdown && (
                      <div ref={domNodeSearch} className="advance-search">
                        {!term ? (
                          <p>Type in the search bar</p>
                        ) : (
                          <p>You searched for "{term}"</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="above-patient-table-btns">
                    {/* <button
                      className={isFilter ? "btn-active" : "btn-inactive"}
                      onClick={() => {
                        setIsFilter(true);
                        setIsSort(false);
                      }}
                    >
                      <p>
                        <HiOutlineFilter />
                      </p>
                      Filter
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
                            <h5>Status</h5>
                            <ul>
                              <li
                                onClick={() => {
                                  setFilter("Active");
                                }}
                              >
                                <input type="checkbox" /> Active
                              </li>
                              <li
                                onClick={() => {
                                  setFilter("Done");
                                }}
                              >
                                <input type="checkbox" /> Done
                              </li>
                            </ul>

                            <h5>Service</h5>
                            <ul>
                              {hospitalSpec.map((e) => {
                                return (
                                  <li key={e._id}>
                                    <input type="checkbox" />
                                    {e.name}
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button> */}
                    {/* <button
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
                    </button> */}
                  </div>
                </div>

                <div className="table">
                  <div className="table-header">
                    <div className="cs-id">Case ID</div>
                    <div className="cs-name">Patient</div>

                    <div className="cs-department">Service</div>
                    <div className="cs-date">Date & Time</div>
                    <div className="cs-status">Status</div>
                  </div>

                  {cases
                    .filter((vals) => {
                      if (term === "") {
                        return vals;
                      } else if (
                        vals.caseId
                          .toLowerCase()
                          .includes(term.toLocaleLowerCase()) ||
                        vals.patient.fullname
                          .toLowerCase()
                          .includes(term.toLocaleLowerCase())
                      ) {
                        return vals;
                      }
                    })
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
                        val.specialization.includes(user.specialization)
                      ) {
                        return val;
                      } else if (user.userId === val.physician._id) {
                        return val;
                      }
                    })
                    .slice(
                      term === "" ? pagesVisited : 0,
                      term === "" ? pagesVisited + usersPerPage : cases.length
                    )
                    .map((item, index) => {
                      return (
                        <div index={index} className="table-body">
                          <div className="cs-id">
                            <p
                              onClick={() => {
                                navigate(
                                  `/consultation/case/case-data/${item._id}`
                                );
                              }}
                            >
                              {item.caseId} 
                            </p>
                          </div>
                          <div className="cs-name">
                            <p
                              onClick={(e) => {
                                filterPatient(item.patient._id);
                                setPatientModal(true);
                                e.stopPropagation();
                              }}
                            >
                              {item.patient.firstname +
                                " " +
                                item.patient.lastname}
                            </p>
                          </div>

                          <div className="cs-department">
                            {/* {
                              facilities
                                .filter(
                                  (e) => e._id === "623ec7fb80a6838424edaa29"
                                )[0]
                                .specialization.filter((f) => {
                                  return item.specialization.includes(f._id);
                                })[0].name
                            } */} 

                            {specializations.filter(e => {
                              return item.specialization.includes(e._id)
                            })[0].specialization }
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
                              ></div>
                              {item.active ? "Active" : "Done"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <br />
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
      </div>
    </>
  );
};

export default Case;
