import React, { useState } from "react";
import "./Login.css";
import Axios from "axios";
import { HiEyeOff, HiEye, HiLockClosed, HiUser } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import api from "../API/Api";
import PendingModal from "../Components/PendingModal";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  formVariant,
  loginContainerVariant,
  loginFormVariant,
} from "../Animations/Animations";
import useAuth from "../Hooks/useAuth";
import Logo from "../Assets/zcmc_logo.png";

const formVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
  },
};

const Login = () => {
  Axios.defaults.withCredentials = true;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [verification, setVerification] = useState(false);
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  //POST login request function
  const handleLogin = async () => {
    setLoader(true);
    try {
      const response = await api.post("/api/auth/login", {
        username: login.username,
        password: login.password,
      });

      if (response.data.verfied) {
        setVerification(true);
        setLoader(false);
        setMessage("");
        setPrompt(false);
        setUserEmail(response.data.email);
        return;
      }

      if (response.data && response.data.loggedIn) {
        window.location.reload();
      } else {
        setLogin({ username: login.username, password: "" });
        setUsernameError(true);
        setLoader(false);
        setPrompt(true);
        setMessage(response.data.err);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In to ZCMC Telemedicine | ZCMC Telemedicine</title>
      </Helmet>
      <div className="login-container">
        <AnimatePresence>
          {verification === true && userEmail !== "" ? (
            <PendingModal
              userEmail={userEmail}
              setVerification={setVerification}
            />
          ) : null}
        </AnimatePresence>
        <motion.div
          variants={loginFormVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="form-container"
        >
          <div className="login-header">
            <img src={Logo} alt="Logo" />
            <div>
              <h1>Sign In</h1>
              <p>Enter your credentials to continue</p>
            </div>
          </div>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Username <i>*</i>
            </label>

            <div
              className={
                usernameError
                  ? "login-username-container-error"
                  : "login-username-container"
              }
            >
              <input
                className={usernameError ? "error-input" : "username"}
                name="username"
                value={login.username}
                placeholder="Enter username"
                onChange={(e) => {
                  setLogin({
                    username: e.target.value,
                    password: login.password,
                  });
                }}
                type="text"
              />
              <p className="login-icon">
                <HiUser />
              </p>
            </div>

            <AnimatePresence>
              {usernameError ? (
                <p style={{ marginTop: "5px" }} className="error-input-text">
                  {message}
                </p>
              ) : null}
            </AnimatePresence>

            <label>
              Password <i>*</i>
            </label>
            <div className="form-input-container">
              <input
                name="password"
                value={login.password}
                placeholder="Enter password"
                onChange={(e) => {
                  setLogin({
                    username: login.username,
                    password: e.target.value,
                  });
                }}
                type={showPassword ? "text" : "password"}
              />
              <p className="login-icon">
                <HiLockClosed />
              </p>
              {login.password.length > 0 ? (
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-password"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className={loader ? "login-form-btn-disable" : "login-form-btn"}
              onClick={() => handleLogin()}
            >
              {loader ? "Signing In" : "Sign In"}
            </button>
            <div className="form-link">
              <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/register")}>Create one.</span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
