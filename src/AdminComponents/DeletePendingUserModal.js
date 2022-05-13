import React, { useState } from "react";
import "./DeletePendingUserModal.css";
import { motion } from "framer-motion";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";

const modalVariant = {
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

const DeletePendingUser = ({ setModal, userId }) => {
  const [isClick, setIsClick] = useState(false);

  const handleDelete = async () => {
    setIsClick(true);

    try {
      let response = await api.delete(`/api/user/delete/${userId}`);
    } catch (error) {}
  };

  return (
    <div className="modal-container">
      <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="delete-pending-user-modal"
      >
        <h1>Delete User Registration</h1>

        <p>
          Are you sure you want to delete this pending user registration? You
          will no longer be able to revert this action.
        </p>

        <div className="delete-pending-user-modal-footer">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setModal(false)}
            className="dpum-cancel-btn"
          >
            Cancel
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDelete()}
            className={isClick ? "dpum-delete-btn-disable" : "dpum-delete-btn"}
          >
            Delete Request
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeletePendingUser;
