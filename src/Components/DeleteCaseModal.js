import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../Hooks/useClickOutside";


//Custom animation variants
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


//Component confirmation modal for deleting case
const DeleteCaseModal = ({ setDeleteModal, id }) => {
  let domNode = useClickOutside(() => {
    setDeleteModal(false);
  });
  const { setAppState, setToast, setIsError, setMessage, toast } = useAuth();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoader(true);
    try {
      let response = api.delete(`/api/patient/delete-case/${id}`);

      if (response) {
        toast.success("Successfullly deleted one case");
        navigate(-1);
        setAppState("Deleted");
        setTimeout(() => setAppState(""), 500);
        setLoader(false);
      } else {
        toast.error("An error occured");
        setLoader(false);
      }
    } catch (error) {
      toast.error("An error occured");
      setLoader(false);
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
        ref={domNode}
        className="popup-modal"
      >
        <h1>Are you really sure about this?</h1>
        <p>
          You are about to delete this case permanently. Once{" "}
          <b style={{ color: "#e72222" }} className="deleted-b">
            deleted
          </b>{" "}
          you will no longer be able to retrieve this record.
        </p>

        <div className="delete-modal-btns">
          <button
            onClick={() => setDeleteModal(false)}
            className="cancel-delete-patient-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className="delete-patient-btn2"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteCaseModal;
