import React from "react";
import "./PendingModal.css";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

const modalVariant = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

const PendingModal = ({ setVerification, userEmail }) => {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
    >
      <motion.div
        variants={modalVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="pending-modal"
      >
        <h1>Check Your Email</h1>
        <p id="user-email">{userEmail}</p>
        <p>
          Your account is currently in the queue list for account verification.
          We will send you an email with instructions on how you can activate
          your account. Thank you!
        </p>

        <div className="got-it-container">
          <button onClick={() => setVerification(false)}>Got it, thanks</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PendingModal;
