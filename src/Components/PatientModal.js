import React, { useState } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import { motion } from "framer-motion";
import { formVariant, containerVariant } from "../Animations/Animations";
import { HiX } from "react-icons/hi";

const PatientModal = ({ patientId, setPatientModal }) => {
  let domNodePatient = useClickOutside(() => {
    setPatientModal(false);
  });

  const [tab, setTab] = useState("Patient Profile");
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
        <div
          onClick={() => setPatientModal(false)}
          className="patient-modal-exit"
        >
          <HiX />
        </div>
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
              Active Case
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PatientModal;
