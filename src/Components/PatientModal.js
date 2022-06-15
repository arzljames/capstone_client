import React, { useState, useEffect } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import {
  formVariant,
  containerVariant,
  dropdownVariants,
} from "../Animations/Animations";
import { HiX, HiUser, HiChevronDown, HiChevronUp } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import OutgoingCaseActive2 from "./OutgoingCaseActive2";
import { GrClear } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import "../Pages/CaseData.css";

const PatientModal = ({
  patientId,
  setPatientModal,
  patient,
  setDeleteModal,
}) => {
  let domNodePatient = useClickOutside(() => {
    setPatientModal(false);
  });

  const navigate = useNavigate();
  const { cases, facilities, user } = useAuth();

  const [tab, setTab] = useState("Patient Profile");
  const [dropdown, setDropdown] = useState(false);

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

  return (
    <>
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
          <div className="patient-modal-header">
            <p
              onClick={() => setPatientModal(false)}
              className="patient-modal-exit"
            >
              <HiX />
            </p>
          </div>
          <div className="patient-modal-container">
            <div className="patient-modal-nav">
              <ul>
                <li
                  className={tab === "Patient Profile" ? "li-active" : ""}
                  onClick={() => setTab("Patient Profile")}
                >
                  Patient Profile
                </li>
                {user.designation !== "623ec7fb80a6838424edaa29" && (
                  <li
                    className={tab === "Case History" ? "li-active" : ""}
                    onClick={() => setTab("Case History")}
                  >
                    Case History
                  </li>
                )}
                {user.designation !== "623ec7fb80a6838424edaa29" && (
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
                            (e) =>
                              e.patient._id === patient._id && e.active === true
                          ).length
                        }
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>
            {tab === "Patient Profile" && (
              <div className="patient-modal-content">
                {user.designation !== "623ec7fb80a6838424edaa29" && (
                  <div className="patient-modal-btns">
                    <motion.button
                      onClick={() => setDropdown(!dropdown)}
                      className={
                        dropdown
                          ? "action-dropdown-btn-active"
                          : "action-dropdown-btn"
                      }
                    >
                      Actions
                      <p>{dropdown ? <HiChevronUp /> : <HiChevronDown />}</p>
                      <AnimatePresence>
                        {dropdown && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="action-dropdown"
                          >
                            <ul>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/consultation/patients/edit-profile/${patient._id}`,
                                    { state: patient }
                                  )
                                }
                              >
                                Edit Profile
                              </li>
                              <li
                                onClick={() => {
                                  setPatientModal(false);

                                  setDeleteModal(true);
                                }}
                                className="delete"
                              >
                                Delete Patient
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                )}
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
                        <p>{getDate(patient.birthday)}</p>
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
                      <label>Contact No.</label>
                      <p>+63 {patient.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "Case History" && (
              <div className="patient-modal-content">
                <div className="case-history-table">
                  <div className="case-history-table-header">
                    <div className="ch-no">Case No.</div>
                    <div className="ch-department">Department</div>
                    <div className="ch-status">Status</div>
                  </div>

                  {cases
                    .filter((e) => e.patient._id === patient._id)
                    .map((item, index) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(`/consultation/case/case-data/${item._id}`)
                          }
                          className={
                            index % 2 === 0
                              ? "case-history-table-body"
                              : "case-history-table-body-2"
                          }
                        >
                          <div className="ch-no">{item.caseId}</div>
                          <div className="ch-department">
                            {/* {
                              facilities
                                .filter((e) => e._id === item.designation._id)
                                .map((f) => {
                                  return f.specialization.filter(
                                    (g) => g._id === item.specialization
                                  )[0];
                                })[0].name
                            } */}

                            {
                              facilities
                                .filter(
                                  (e) => e._id === "623ec7fb80a6838424edaa29"
                                )[0]
                                .specialization.filter((f) => {
                                  return item.specialization.includes(f._id);
                                })[0].name
                            }
                          </div>
                          <div className="ch-status">
                            {item.active ? "Active" : "Done"}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {cases.filter((e) => e.patient._id === patient._id).length ===
                  0 && (
                  <div className="no-active-case">
                    <h1>No Case History</h1>
                    <p>No history case found</p>
                  </div>
                )}
              </div>
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
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PatientModal;
