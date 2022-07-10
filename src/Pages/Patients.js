import React, { useEffect, useState, useRef } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import {
  HiPlus,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiTrash,
  HiArrowNarrowLeft
} from "react-icons/hi";
import { motion } from "framer-motion";
import "./Patients.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import { Navigate, useNavigate } from "react-router-dom";
import AddPatientForm from "../Components/AddPatientForm";
import { AnimatePresence } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import { AiFillCaretDown } from "react-icons/ai";
import { HiUpload, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useClickOutside } from "../Hooks/useClickOutside";
import { parse } from "papaparse";
import ImportModal from "../Components/ImportModal";
import PatientAdvanceSearch from "../Components/PatientAdvanceSearch";
import { dropdownVariants, pageVariant } from "../Animations/Animations";
import PatientTableData from "../Components/PatientTableData";

import { Helmet } from "react-helmet";
import PatientModal from "../Components/PatientModal";
import DeletePatientModal from "../Components/DeletePatientModal";
import PatientTable from "../Components/PatientTable";

const Patients = () => {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    patients,

    toast,
    ToastContainer,
  } = useAuth();

  const [isSort, setIsSort] = useState(false);
  const [sort, setSort] = useState("Oldest");

  const [showImport, setShowImport] = useState(false);

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
            middlename: e.middlname,
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

  const sortAscName = (a, b) => {
    return a.lastname.localeCompare(b.lastname);
  };

  const sortDscName = (a, b) => {
    return b.lastname.localeCompare(a.lastname);
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

  const [patient, setPatient] = useState([]);

  const filterPatient = (id) => {
    setPatient(patients.filter((e) => e._id === id)[0]);
  };

  // const [deleteModal, setDeleteModal] = useState(false);

  if (user.designation === "623ec7fb80a6838424edaa29") {
    return <Navigate to="/consultation/case" />;
  }
  return (
    <>
      <Helmet>
        <title>Patients | ZCMC Telemedicine</title>
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
          {CSV.length !== 0 && (
            <ImportModal setCSV={setCSV} CSV={CSV} toast={toast} />
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
          {showAdvance && (
            <PatientAdvanceSearch setShowAdvance={setShowAdvance} />
          )}

          {patientModal && (
            <PatientModal
              patient={patient}
              setPatientModal={setPatientModal}
              patientId={patientId}
              setDeleteModal={setDeleteModal}
            />
          )}
        </AnimatePresence>

        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <motion.div variants={pageVariant} initial="hidden" animate="visible" exit="exit" className="content-body">
              <div className="consultation-wrapper">
                <div className="container-heading">
                  <h2>Patients</h2>

                  <div className="subheading-btns">
                    {patientsId.length !== 0 && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
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
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() =>
                        navigate("/consultation/patients/admission")
                      }
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
                      Patient
                    </motion.button>
                    <motion.div
                      whileTap={{
                        scale: 0.75,
                      }}
                      onClick={() => setShowImport(!showImport)}
                      className="import-patient-btn"
                      ref={domNodeImport}
                    >
                      <AiFillCaretDown />
                      {showImport && (
                        <motion.div
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
                            toast.error("Not a CSV file.");

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
                    </motion.div>
                  </div>
                </div>

                {/* <PatientTable
                  sortAscDate={sortAscDate}
                  sortDscDate={sortDscDate}
                  sortAscName={sortAscName}
                  sortDscName={sortDscName}
                  setPatientState={setPatientState}
                  patientState={patientState}
                  sort={sort}
                  isSort={isSort}
                  setSort={setSort}
                  setIsSort={setIsSort}
                  setPatientId={setPatientId}
                  setPatientModal={setPatientModal}
                  setDeleteModal={setDeleteModal}
                  filterPatient={filterPatient}
                  searchDropdown={searchDropdown}
                  setSearchDropdown={setSearchDropdown}
                /> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patients;
