import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { Helmet } from "react-helmet";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import { HiPlus } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import NewCase from "../Components/NewCase";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import "./Case.css";
import PatientModal from "../Components/PatientModal";

import DeletePatientModal from "../Components/DeletePatientModal";
import CaseTable from "../Components/CaseTable";

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

  const {
    cases,
    facilities,
    user,

    hospitalSpec,
    toast,
    ToastContainer,
    specializations,
  } = useAuth();

  const [patientModal, setPatientModal] = useState(false);
  const [patient, setPatient] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);

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
                      Case
                    </button>
                  )}
                </div>
              </div>

              <div style={{paddingBottom: '70px'}} className="content-wrapper">
                <CaseTable
                  setPatient={setPatient}
                  setPatientModal={setPatientModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Case;
