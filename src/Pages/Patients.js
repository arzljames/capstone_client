import React, { useEffect, useState, useRef } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import {
  HiPlus,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiTrash,
} from "react-icons/hi";
import { motion } from "framer-motion";
import "./Patients.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import { useNavigate } from "react-router-dom";
import AddPatientForm from "../Components/AddPatientForm";
import { AnimatePresence } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import Toast from "../Components/Toast";
import { AiFillCaretDown } from "react-icons/ai";
import { HiUpload, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useClickOutside } from "../Hooks/useClickOutside";
import { parse } from "papaparse";
import ImportModal from "../Components/ImportModal";
import DeleteMultiplePatientModal from "../Components/DeleteMultiplePatientModal";
import PatientAdvanceSearch from "../Components/PatientAdvanceSearch";
import { dropdownVariants } from "../Animations/Animations";
import PatientTableData from "../Components/PatientTableData";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";
import PatientModal from "../Components/PatientModal";

const Patients = () => {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    patients,
    cases,
    appState,
    setToast,
    setMessage,
    setIsError,
    toast,
  } = useAuth();

  const [isSort, setIsSort] = useState(false);
  const [sort, setSort] = useState("Oldest");

  const [showImport, setShowImport] = useState(false);

  const [term, setTerm] = useState("");

  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  let domNodeImport = useClickOutside(() => {
    setShowImport(false);
  });

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const [CSV, setCSV] = useState([]);

  const [patientState, setPatientState] = useState([]);
  const [patientsId, setPatientsId] = useState([]);
  const [patientModal, setPatientModal] = useState(false);
  const [patientId, setPatientId] = useState("");

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

  useEffect(() => {
    setPatientState(
      patients

        .filter((id) => id.physician._id === user.userId)
        .map((e) => {
          return {
            select: false,
            _id: e._id,
            createdAt: e.createdAt,
            physician: e.physician,
            fullname: e.fullname,
            firstname: e.firstname,
            lastname: e.lastname,
            sex: e.sex,
            age: getAge(e.birthday),
          };
        })
    );
  }, [patients]);

  useEffect(() => {
    const arr = [];
    patientState.forEach((d) => {
      if (d.select) {
        arr.push(d._id);
      }
    });

    setPatientsId(arr);
  }, [patientState]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [showAdvance, setShowAdvance] = useState(false);

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
  });

  const sortAscName = (a, b) => {
    return a.firstname.localeCompare(b.firstname);
  };

  const sortDscName = (a, b) => {
    return b.firstname.localeCompare(a.firstname);
  };

  const sortAscDate = (a, b) => {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? 1 : -1;
  };

  const sortDscDate = (a, b) => {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA < dateB ? 1 : -1;
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(patientState.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [patient, setPatient] = useState([]);

  const filterPatient = (id) => {
    setPatient(patients.filter((e) => e._id === id)[0]);
  };

  // const [deleteModal, setDeleteModal] = useState(false);
  return (
    <>
      <Helmet>
        <title>Patients | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <AnimatePresence>
          {CSV.length !== 0 && <ImportModal setCSV={setCSV} CSV={CSV} />}
          {toast && <Toast />}
          {deleteModal && (
            <DeleteMultiplePatientModal
              setDeleteModal={setDeleteModal}
              patientsId={patientsId}
            />
          )}
          {showAdvance && (
            <PatientAdvanceSearch setShowAdvance={setShowAdvance} />
          )}

          {patientModal && (
            <PatientModal
              patient={patient}
              setPatientModal={setPatientModal}
              patientId={patientId}
            />
          )}
          {/* {deleteModal && (
          <DeletePatientModal
            id={patient._id}
            name={patient.firstname}
            setDeleteModal={setDeleteModal}
          />
        )} */}
        </AnimatePresence>

        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="container-heading">
                <h2>Patients</h2>

                <div className="subheading-btns">
                  {patientsId.length !== 0 && (
                    <button
                      onClick={() => setDeleteModal(true)}
                      className={
                        patientsId.length === 0
                          ? "delete-patient-btn-disable"
                          : "delete-patient-btn"
                      }
                    >
                      <p>
                        <HiTrash />
                      </p>
                      Delete ({patientsId.length} selected)
                    </button>
                  )}
                  <motion.button
                    onClick={() => navigate("/consultation/patients/admission")}
                    className="add-patient-btn"
                    whileTap={{
                      scale: 0.99,
                      y: 2,
                      x: 2,
                      transition: {
                        delay: 0,
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <p>
                      <HiPlus />
                    </p>
                    Add Patient
                  </motion.button>
                  <div
                    onClick={() => setShowImport(!showImport)}
                    className="import-patient-btn"
                  >
                    <AiFillCaretDown />
                    {showImport && (
                      <motion.div
                        ref={domNodeImport}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="import-patient-container"
                      >
                        <div onClick={() => onBtnClick()}>
                          <p>
                            <HiUpload />
                          </p>
                          Import CSV
                        </div>
                      </motion.div>
                    )}

                    <input
                      ref={inputFileRef}
                      className="import-patient-input"
                      type="file"
                      onChange={async (e) => {
                        const text = await e.target.files[0].text();
                        const result = parse(text, { header: true });
                        if (e.target.files[0].type !== "text/csv") {
                          setToast(true);
                          setMessage("Not a CSV file.");
                          setIsError(true);

                          return;
                        }

                        setCSV([
                          ...CSV,
                          result.data.map((e) => {
                            return {
                              firstname: e.FIRST_NAME,
                              middlename: e.MIDDLE_NAME,
                              lastname: e.LAST_NAME,
                              fullname:
                                e.LAST_NAME +
                                "," +
                                " " +
                                e.FIRST_NAME +
                                " " +
                                e.MIDDLE_NAME[0] +
                                ".",
                              contact: e.CONTACT,
                              sex: e.SEX,
                              birthday: e.BIRTHDAY,
                              civilStatus: e.CIVIL_STATUS,
                              religion: e.RELIGION,
                              birthplace: e.PLACE_OF_BIRTH,
                              address: {
                                street: e.STREET,
                                barangay: e.BARANGAY,
                                city: e.CITY,
                              },
                              ethnicity: e.ETHNICITY,
                              guardian: {
                                name: e.GUARDIAN_FULLNAME,
                                relationship: e.RELATION,
                              },
                              physician: user.userId,
                            };
                          }),
                        ]);

                        e.target.value = null;
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="above-patient-table">
                <div className="patient-input-container">
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    type="search"
                    onFocus={() => setSearchDropdown(true)}
                    placeholder="Search patient (last name, first name)"
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
                  <button
                    className={isSort ? "btn-active" : "btn-inactive"}
                    onClick={() => {
                      setIsSort(!isSort);
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
                            <li
                              onClick={() => {
                                setSort("Oldest");
                              }}
                            >
                              Oldest
                            </li>
                            <li
                              onClick={() => {
                                setSort("Newest");
                              }}
                            >
                              Newest
                            </li>

                            <li
                              onClick={() => {
                                setSort("Name (A-Z)");
                              }}
                            >
                              Name (A-Z)
                            </li>
                            <li
                              onClick={() => {
                                setSort("Name (Z-A)");
                              }}
                            >
                              Name (Z-A)
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
              <PatientTableData
                sortAscDate={sortAscDate}
                sortDscDate={sortDscDate}
                sortAscName={sortAscName}
                sortDscName={sortDscName}
                setPatientState={setPatientState}
                patientState={patientState}
                term={term}
                usersPerPage={usersPerPage}
                pagesVisited={pagesVisited}
                sort={sort}
                setPatientId={setPatientId}
                setPatientModal={setPatientModal}
                filterPatient={filterPatient}
              />
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
    </>
  );
};

export default Patients;
