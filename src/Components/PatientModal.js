import React, { useState, useEffect } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import { motion } from "framer-motion";
import { formVariant, containerVariant } from "../Animations/Animations";
import { HiX } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import OutgoingCaseActive2 from "./OutgoingCaseActive2";

const PatientModal = ({ patientId, setPatientModal, patient }) => {
  let domNodePatient = useClickOutside(() => {
    setPatientModal(false);
  });

  const { cases } = useAuth();

  const [tab, setTab] = useState("Patient Profile");

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

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
    >
      <motion.div
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={domNodePatient}
        className="patient-modal"
      >
        {/* <div
          onClick={() => setPatientModal(false)}
          className="patient-modal-exit"
        >
          <HiX />
        </div> */}
        <div className="patient-modal-nav">
          <ul>
            <li
              className={tab === "Patient Profile" ? "li-active" : ""}
              onClick={() => setTab("Patient Profile")}
            >
              Patient Profile
            </li>
            <li
              className={tab === "Case History" ? "li-active" : ""}
              onClick={() => setTab("Case History")}
            >
              Case History
            </li>
            <li
              className={tab === "Active Case" ? "li-active" : ""}
              onClick={() => setTab("Active Case")}
            >
              Active Case{" "}
              {cases.filter(
                (e) => e.patient._id === patient._id && e.active === true
              ).length === 0 ? null : (
                <div>
                  {
                    cases.filter(
                      (e) => e.patient._id === patient._id && e.active === true
                    ).length
                  }
                </div>
              )}
            </li>
          </ul>
        </div>
        {tab === "Patient Profile" && (
          <div className="patient-modal-content">
            <div className="patient-personal">
              <h2>Personal Information</h2>

              <div className="patient-content-name">
                <div className="info">
                  <div>
                    <label>Last name</label>
                    <p>{patient.lastname}</p>
                  </div>

                  <div>
                    <label>First name</label>
                    <p>{patient.firstname}</p>
                  </div>

                  <div>
                    <label>Middle name</label>
                    <p>{patient.middlename}</p>
                  </div>
                </div>

                <div className="info">
                  <div>
                    <label>Sex</label>
                    <p>{patient.sex}</p>
                  </div>
                  <div>
                    <label>Birthday</label>
                    <p>{patient.birthday}</p>
                  </div>

                  <div>
                    <label>Age</label>
                    <p>{getAge(patient.birthday)}</p>
                  </div>
                </div>

                <div className="info">
                  <div>
                    <label>Civil Status</label>
                    <p>{patient.civilStatus}</p>
                  </div>

                  <div>
                    <label>Religion</label>
                    <p>{patient.religion}</p>
                  </div>

                  <div></div>
                </div>

                <div className="info">
                  <div>
                    <label>Guardian</label>
                    <p>{patient.guardian.name}</p>
                  </div>

                  <div>
                    <label>Relation</label>
                    <p>{patient.guardian.relationship}</p>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>

            <div className="patient-personal">
              <h2>Address</h2>

              <div className="patient-content-name">
                <div className="info">
                  <div>
                    <label>Street</label>
                    <p>{patient.address.street}</p>
                  </div>

                  <div>
                    <label>Barangay</label>
                    <p>{patient.address.barangay}</p>
                  </div>

                  <div>
                    <label>City/Municipality</label>
                    <p>{patient.address.city}</p>
                  </div>
                </div>

                <div className="info">
                  <div>
                    <label>Birth Place</label>
                    <p>{patient.birthplace}</p>
                  </div>

                  <div>
                    <label>Ethnicity</label>
                    <p>{patient.ethnicity}</p>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>

            <div className="patient-personal">
              <h2>Contact</h2>

              <div className="info">
                <div>
                  <label>Contact #</label>
                  <p>+63 {patient.contact}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Case History" && (
          <div className="patient-modal-content">Case History</div>
        )}

        {tab === "Active Case" && (
          <div className="patient-modal-content">
            {cases.filter(
              (e) => e.patient._id === patient._id && e.active === true
            ).length === 0 ? (
              <div className="no-active-case">
                <h1>No Case</h1>
                <p>No active case found</p>
              </div>
            ) : (
              cases
                .filter(
                  (e) => e.patient._id === patient._id && e.active === true
                )
                .map((item, key) => {
                  return (
                    <OutgoingCaseActive2
                      key={key + 1}
                      item={item}
                      patientid={item.patient._id}
                    />
                  );
                })
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PatientModal;
