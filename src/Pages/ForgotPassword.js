import React, { useState } from "react";
import "./Login.css";
import ForgotPasswordModal from "../Components/ForgotPasswordModal";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiMail, HiX } from "react-icons/hi";
import api from "../API/Api";
import { formVariant, containerVariant } from "../Animations/Animations";

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
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoader(true);
    try {
      let response = await api.get(`api/auth/recover/${email}`);

      if (response.data.ok) {
        setLoader(false);
        setSuccess(true);
        setError(false);
        setEmail("");
      } else {
        setLoader(false);
        setError(true);
        setMessage(response.data.err);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <AnimatePresence>
          {success && (
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
                  <h1>Email Sent</h1>
                  <p onClick={() => setSuccess(false)}>
                    <HiX />
                  </p>
                </div>

                <div className="register-successful-body">
                  <p>
                    We send you an email with instructions on how to reset your
                    password. Please open your email. Thank you!
                  </p>
                </div>
                <button onClick={() => setSuccess(false)}>Confirm</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="forgot-password-container">
          {error && <div className="error-msg">{message}</div>}
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
                <HiMail />
              </p>
            </div>
            <button
              type={email.length > 0 ? "submit" : "button"}
              onClick={() => handleSubmit()}
              className={loader ? "login-form-btn-disable" : "login-form-btn"}
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
