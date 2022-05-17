import React, { useEffect, useState } from "react";
import "./VerificationPage.css";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import hooray from "../Assets/hooray.svg";
import { HiArrowNarrowRight } from "react-icons/hi";
import { containerVariant, formVariant } from "../Animations/Animations";

const VerificationPage = () => {
  const [loader, setLoader] = useState(true);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleVerification = async () => {
      let response = await api.put(`/api/user/verify/${id}`);
      if (response.data.err) {
        setVerified(true);
      } else if (response.data.already) {
        setLoader(false);
        setMessage("Your account is already activated.");
      } else {
        setLoader(false);
        setMessage("Account Activated!");
      }
    };

    handleVerification();
  }, []);
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
          className="verification-modal"
        >
          <img src={hooray} alt="Welcome" />
          <h1>Account Activated!</h1>
          <p>
            Let's get started. You and your team can now use the ZCMC
            TeleMedicine System. Explore our documentation guide or jump right
            into your dashboard.
          </p>
          <button onClick={() => navigate("/login")}>
            Proceed to Sign In{" "}
            <p>
              <HiArrowNarrowRight />
            </p>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default VerificationPage;
