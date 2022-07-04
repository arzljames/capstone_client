import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { HiChevronLeft, HiUser, HiTrash } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import NoUser from "../Assets/nouser.png";
import PatientGeneralInfo from "../Components/PatientGeneralInfo";
import PatientActiveCase from "../Components/PatientActiveCase";
import DeletePatientModal from "../Components/DeletePatientModal";
import PatientInactiveCase from "../Components/PatientInactiveCase";
import useAuth from "../Hooks/useAuth";
import Toast from "../Components/Toast";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {},
};

const PatientsData = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { tab, setTab, toast, cases, patients } = useAuth();
  const { id } = useParams();

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

  const [deleteModal, setDeleteModal] = useState(false);

  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let response = await api.get("/api/patient");

        if (response.data) {
          setPatient(response.data.filter((e) => e._id === id)[0]);
        }
      } catch (error) {}
    };

    fetchPatients();
  }, []);

  if (patient.length === 0) {
    return (
      <div className="wait-spinner-container">
        <PulseLoader size={10} margin={2} color="#058e46" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {deleteModal && (
          <DeletePatientModal
            id={patient._id}
            name={patient.firstname}
            setDeleteModal={setDeleteModal}
          />
        )}
      </AnimatePresence>
      <div className="container">
        {toast && <Toast />}
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="content-body"
            >
              <div className="above-patient-profile">
                <button onClick={() => navigate(-1)} className="back-btn">
                  <HiChevronLeft /> <p>Back</p>
                </button>

                <div className="above-patient-profile-btns">
                  <button
                    onClick={() => setDeleteModal(true)}
                    className="delete-patient-btn"
                  >
                    <p>
                      <HiTrash />
                    </p>
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/consultation/patients/edit-profile/${patient._id}`,
                        { state: patient }
                      )
                    }
                    className="edit-profile-btn"
                  >
                    <p>
                      <HiUser />
                    </p>
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="patient-profile-container">
                <div className="patient-profile">
                  <div className="patient-profile-content-1">
                    <div className="patient-profile-image-container">
                      <img src={NoUser} alt="Avatar" />
                    </div>

                    <div className="patient-name-infos">
                      <h1>
                        {patient.firstname +
                          " " +
                          patient.middlename[0] +
                          "." +
                          " " +
                          patient.lastname}
                      </h1>
                      <p>Patient</p>
                    </div>

                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        <h5>Sex: </h5>
                      </div>
                      <div className="patient-infos-2">
                        <h5>{patient.sex}</h5>
                      </div>
                    </div>

                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        <h5>Age:</h5>
                      </div>
                      <div className="patient-infos-2">
                        <h5>{getAge(patient.birthday)}</h5>
                      </div>
                    </div>

                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        <h5>Birthday:</h5>
                      </div>
                      <div className="patient-infos-2">
                        <h5>{patient.birthday}</h5>
                      </div>
                    </div>

                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        <h5>Civil Status: </h5>
                      </div>
                      <div className="patient-infos-2">
                        <h5>{patient.civilStatus}</h5>
                      </div>
                    </div>
                  </div>

                  <div className="patient-profile-content-2">
                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        {cases.filter(
                          (f) =>
                            f.patient._id === patient._id && f.active === true
                        ).length > 1 ? (
                          <h5>Active Cases:</h5>
                        ) : (
                          <h5>Active Case:</h5>
                        )}
                      </div>
                      <div className="patient-infos-2">
                        <h5>
                          {
                            cases.filter(
                              (f) =>
                                f.patient._id === patient._id &&
                                f.active === true
                            ).length
                          }
                        </h5>
                      </div>
                    </div>
                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        {cases.filter(
                          (f) =>
                            f.patient._id === patient._id && f.active === false
                        ).length > 1 ? (
                          <h5>Inactive Cases:</h5>
                        ) : (
                          <h5>Inactive Case:</h5>
                        )}
                      </div>

                      <div className="patient-infos-2">
                        <h5>
                          {
                            cases.filter(
                              (f) =>
                                f.patient._id === patient._id &&
                                f.active === false
                            ).length
                          }
                        </h5>
                      </div>
                    </div>
                    <div className="patient-infos-2col">
                      <div className="patient-infos-1">
                        {cases.filter((f) => f.patient._id === patient._id)
                          .length > 1 ? (
                          <h5>Total Cases:</h5>
                        ) : (
                          <h5>Total Case:</h5>
                        )}
                      </div>

                      <div className="patient-infos-2">
                        <h5>
                          {
                            cases.filter((f) => f.patient._id === patient._id)
                              .length
                          }
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-info">
                  <div className="patient-tabs">
                    <button
                      onClick={() => setTab("General")}
                      className={
                        tab === "General" ? "active-tab" : "inactive-tab"
                      }
                    >
                      Personal Info
                    </button>
                    <button
                      onClick={() => setTab("Active Case")}
                      className={
                        tab === "Active Case" ? "active-tab" : "inactive-tab"
                      }
                    >
                      Active Case
                    </button>
                    <button
                      onClick={() => setTab("History")}
                      className={
                        tab === "History" ? "active-tab" : "inactive-tab"
                      }
                    >
                      Case History
                    </button>
                  </div>
                  <div className="patient-content">
                    {tab === "General" && (
                      <PatientGeneralInfo state={patient} />
                    )}
                    {tab === "Active Case" && (
                      <PatientActiveCase
                        state={patient}
                        name={
                          patient.firstname +
                          " " +
                          patient.middlename[0] +
                          "." +
                          " " +
                          patient.lastname
                        }
                      />
                    )}
                    {tab === "History" && (
                      <PatientInactiveCase
                        state={patient}
                        name={
                          patient.firstname +
                          " " +
                          patient.middlename[0] +
                          "." +
                          " " +
                          patient.lastname
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsData;
