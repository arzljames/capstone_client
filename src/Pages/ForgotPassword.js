import React, {useState } from "react";
import "./Login.css";
import ForgotPasswordModal from "../Components/ForgotPasswordModal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {HiOutlineMail} from 'react-icons/hi'

const formVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="login-container">
        {showModal && <ForgotPasswordModal />}
        <div className="forgot-password-container">
          <div className="login-header">
            <h1>Reset Password</h1>
            <p>
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>
          </div>
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="login-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <label>
              Email <i>*</i>
            </label>
            <div className="form-input-container">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="forgot-input"
                type="email"
                placeholder="example@gmail.com"
              />
              <p className="login-icon">
              <HiOutlineMail />
            </p>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={!email ? "login-form-btn-disable" : "login-form-btn"}
            >
              Submit
            </button>
            <div className="form-link">
              <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/register")}>Create one.</span>
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
