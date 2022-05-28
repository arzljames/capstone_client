import React from "react";
import "./PendingModal.css";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { formVariant, containerVariant } from "../Animations/Animations";

const PendingModal = ({ setVerification, userEmail }) => {
  // const regex = /(?<!^)./g;
  // const splitBefore =
  //   userEmail !== "" ? userEmail.substring(userEmail.indexOf("@")) : "";
  // const splitAfter =
  //   userEmail !== "" ? userEmail.substring(0, userEmail.indexOf("@")) : "";
  // const replacedEmail =
  //   userEmail !== "" ? splitAfter.replace(regex, "*") + splitBefore : "";

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
        className="register-successful"
      >
        <div className="register-successful-header">
          <h1>Check Your Email</h1>
          <p onClick={() => setVerification(false)}>
            <HiX />
          </p>
        </div>

        <div className="register-successful-body">
          {/* <p>{replacedEmail}</p> <br /> */}
          <p>
            Your account is currently in the queue list for account
            verification. We will send you an email with instructions on how you
            can verify and activate your account.
          </p>
        </div>
        <button onClick={() => setVerification(false)}>Confirm</button>
      </motion.div>
    </motion.div>
  );
};

export default PendingModal;
