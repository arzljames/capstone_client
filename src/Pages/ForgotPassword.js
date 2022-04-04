import React, { useContext, useState } from "react";
import "./Login.css";
import ForgotPasswordModal from "../Components/ForgotPasswordModal";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DataContext from "../Context/DataContext";

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
  const location = useLocation();
  const {user} = useContext(DataContext)
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    {/* {user.userType === 'admin' && <Navigate to="/dashboard" state={{ from: location }} replace /> }
    {user.userType === 'user' && <Navigate to="/" state={{ from: location }} replace /> } */}
      <div className="login-container">
        {showModal && <ForgotPasswordModal />}
        <div className="forgot-password-container">
          <h1>Reset Password</h1>
          <p className="enter-email-msg">
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </p>
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
                placeholder="example@mail.com"
              />
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
