import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import { containerVariant, formVariant } from "../Animations/Animations";

const DeletePatientModal = ({ setDeleteModal, id, name, toast }) => {
  const [confirm, setConfirm] = useState("");
  const { setAppState } = useAuth();
  const [loader, setLoader] = useState(false);

  const handleDelete = async () => {
    setLoader(true);
    try {
      let response = await api.delete(`/api/patient/delete/${id}`);

      if (response.data.ok) {
        toast.success(`Deleted one patient`);
        setDeleteModal(false);
        setAppState(id);
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
      setAppState(id);
    }
  };
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
        className="popup-modal"
      >
        <h1>Are you really sure about this?</h1>
        <p style={{ marginBottom: "20px" }}>
          You are about to delete this patient permanently. Once{" "}
          <b className="deleted-b">deleted</b> you will no longer be able to
          retrieve all data, information, and medical records of <b>{name}</b>
          . <br />
          <br />
          Please type <b>{name}</b> to confirm.
        </p>
        <input
          style={{ marginBottom: "40px" }}
          type="text"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <div className="popup-modal-btns">
          <button
            onClick={() => setDeleteModal(false)}
            className="cancel-delete-patient-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className={
              confirm === name && loader === false
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

export default DeletePatientModal;
