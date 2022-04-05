import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    document.addEventListener("scroll", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
      document.removeEventListener("scroll", maybeHandler);
    };
  });

  return domNode;
};

const formVariant = {
  hidden: {
    opacity: 0,
    y: "-20px",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: "-20px",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 1,
  },
};

const DeleteMultiplePatientModal = ({ setDeleteModal, patientsId }) => {
  let domNode = useClickOutside(() => {
    setDeleteModal(false);
  });
  const [confirm, setConfirm] = useState("");
  const { user, setToast, setMessage, setIsError, setAppState } = useAuth();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      let response = await api.put("/api/patient/multiple-delete", {
        patientsId: patientsId,
      });

      if (response.data.ok) {
        setToast(true);
        setMessage(`You have successfully removed multiple patients.`);
        setIsError(false);
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
        setDeleteModal(false);
      }
    } catch (error) {
      setToast(true);
      setMessage(error.message);
      setIsError(true);
      setAppState("error");
      setTimeout(() => setAppState(""), 500);
    }
  };

  useEffect(() => {
    console.log(patientsId);
  }, []);

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
        ref={domNode}
        className="delete-patient-modal"
      >
        <div className="delete-patient-modal-body">
          <h1>Deleting Multiple Patients</h1>
          <p>
            You are about to delete these patients permanently. Once{" "}
            <b className="deleted-b">deleted</b> you will no longer be able to
            retrieve all of their data, information, and medical records.
            <br />
            <br />
            Please type <b>/Delete-Multiple-Patients</b> to confirm.
          </p>
          <input type="text" onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <div className="delete-patient-modal-btns">
          <button
            onClick={() => setDeleteModal(false)}
            className="cancel-delete-patient-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className={
              confirm === "/Delete-Multiple-Patients"
                ? "delete-patient-btn2"
                : "delete-patient-btn2-disable"
            }
          >
            Yes, delete this patient
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteMultiplePatientModal;
