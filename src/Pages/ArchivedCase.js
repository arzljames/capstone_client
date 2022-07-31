import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Helmet } from "react-helmet";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import {
  HiPlus,
  HiOutlineSearch,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import NewCase from "../Components/NewCase";
import useAuth from "../Hooks/useAuth";
import "./Case.css";
import PatientModal from "../Components/PatientModal";
import DeletePatientModal from "../Components/DeletePatientModal";
import ReactPaginate from "react-paginate";
import { VscBracketError } from "react-icons/vsc";
import api from "../API/Api";
import { socket } from "../Components/Socket";
import { useNavigate } from "react-router-dom";

const ArchivedCase = () => {
  const [showCase, setShowCase] = useState(false);
  const [term, setTerm] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);

  const {
    cases,
    facilities,
    user,

    patients,
    toast,
    ToastContainer,
    specializations,
  } = useAuth();

  const navigate = useNavigate();

  const [patientModal, setPatientModal] = useState(false);
  const [patient, setPatient] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
  });

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const pagesVisited = pageNumber * usersPerPage;

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

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const pageCount = Math.ceil(
    cases.filter((val) => {
      if (
        (user.designation === "623ec7fb80a6838424edaa29" &&
          val.specialization.includes(user.specialization)) ||
        (user.designation === "623ec7fb80a6838424edaa29" &&
          val.subSpecialization.map((f) => f._id).includes(user.specialization))
      ) {
        return val;
      } else if (user.userId === val.physician._id) {
        return val;
      }
    }).length / usersPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const filterPatient = (id) => {
    setPatient(patients.filter((e) => e._id === id)[0]);
  };

  const handleStatus = async (id) => {
    try {
      let response = await api.put(`/api/patient/case-status/${id}`);

      if (response) {
        socket.emit("case");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {showCase && <NewCase overflow={true} setShowCase={setShowCase} />}

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
              <div className="container-heading">
                <div className="patient-input-container">
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    type="search"
                    onFocus={() => setSearchDropdown(true)}
                    placeholder="Search case (case ID or patient name)"
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
                <div className="subheading-btns">
                  {user.designation !== "623ec7fb80a6838424edaa29" && (
                    <button
                      onClick={() => setShowCase(true)}
                      className="add-case-btn"
                    >
                      <p>
                        <HiPlus />
                      </p>
                      Case
                    </button>
                  )}
                </div>
              </div>

              <div className="table-header">
                <div className="cs-id">Case ID</div>
                <div className="cs-name">Patient</div>

                <div className="cs-department">Service</div>
                <div className="cs-date">Date</div>
                <div className="cs-status">Status</div>
              </div>
              <div className="table">
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
                  .filter((e) => e.active === "Done")
                  .filter((val) => {
                    if (
                      (user.designation === "623ec7fb80a6838424edaa29" &&
                        val.specialization.includes(user.specialization)) ||
                      (user.designation === "623ec7fb80a6838424edaa29" &&
                        val.subSpecialization
                          .map((f) => f._id)
                          .includes(user.specialization))
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
                      <div
                        onClick={() => {
                          navigate(`/consultation/case/case-data/${item._id}`);
                        }}
                        index={index}
                        className="table-body"
                      >
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
                          <div className="cs-info-container">
                            <div>Follow Ups: {item.followUp?.length}</div>
                          </div>
                        </div>
                        <div className="cs-name">
                          <p
                            onClick={(e) => {
                              filterPatient(item.patient._id);
                              setPatientModal(true);
                              e.stopPropagation();
                            }}
                          >
                            {item.patient.lastname +
                              "," +
                              " " +
                              item.patient.firstname +
                              " " +
                              item.patient.middlename[0] +
                              "."}
                          </p>
                          <div className="cs-info-container">
                            <div>Gender: {item.patient.sex}</div>
                            <div>
                              Age: {getAge(item.patient.birthday) + " yrs old"}
                            </div>
                            <div>Civil Status: {item.patient.civilStatus}</div>
                          </div>
                        </div>

                        <div className="cs-department">
                          {specializations.length === 0
                            ? null
                            : specializations.filter((e) => {
                                return item.specialization.includes(e._id);
                              })[0].specialization}
                        </div>
                        <div className="cs-date">{getDate(item.createdAt)}</div>
                        <div className="cs-status">
                          <p
                            className={
                              item.active === "Active"
                                ? "active"
                                : item.active === "Done"
                                ? "done"
                                : "pending"
                            }
                          >
                            <div
                              className={
                                item.active === "Active"
                                  ? "indicator active"
                                  : item.active === "Done"
                                  ? "indicator done"
                                  : "indicator pending"
                              }
                            ></div>
                            {item.active}
                          </p>
                        </div>
                      </div>
                    );
                  })}

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
                  .filter((e) => e.active === "Done")
                  .filter((val) => {
                    if (
                      (user.designation === "623ec7fb80a6838424edaa29" &&
                        val.specialization.includes(user.specialization)) ||
                      (user.designation === "623ec7fb80a6838424edaa29" &&
                        val.subSpecialization
                          .map((f) => f._id)
                          .includes(user.specialization))
                    ) {
                      return val;
                    } else if (user.userId === val.physician._id) {
                      return val;
                    }
                  }).length === 0 && (
                  <div className="no-data">
                    <span>
                      <VscBracketError />
                    </span>
                    <p>No data found</p>
                  </div>
                )}
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

export default ArchivedCase;
