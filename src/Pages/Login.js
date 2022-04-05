import React, { useState } from "react";
import "./Login.css";
import Axios from "axios";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";
import FormMessage from "../Components/FormMessage";
import PendingModal from "../Components/PendingModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const navigate = useNavigate();

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
      <div className="login-container">
        <h1>Sign in to ZCMC Telemedicine</h1>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="login-form"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* <AnimatePresence>
            {prompt && <FormMessage setPrompt={setPrompt} message={message} />}
          </AnimatePresence> */}

          <AnimatePresence>
            {verification && (
              <PendingModal
                userEmail={userEmail}
                setVerification={setVerification}
              />
            )}
          </AnimatePresence>

          <label>
            Username <i>*</i>
          </label>
          <motion.input
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={usernameError ? "error-input" : null}
            name="username"
            value={login.username}
            onChange={(e) => {
              setLogin({
                username: e.target.value,
                password: login.password,
              });
            }}
            type="text"
          />
          <AnimatePresence>
            {usernameError && <p className="error-input-text">{message}</p>}
          </AnimatePresence>
          <label>
            Password <i>*</i>
          </label>
          <div className="form-input-container">
            <input
              name="password"
              value={login.password}
              onChange={(e) => {
                setLogin({
                  username: login.username,
                  password: e.target.value,
                });
              }}
              type={showPassword ? "text" : "password"}
            />
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
            {loader ? (
              <PulseLoader size={7} margin={2} color="#fff" />
            ) : (
              "Sign In"
            )}
          </button>
          <div className="form-link">
            <p>
              <span onClick={() => navigate("/reset-password")}>
                Forgot password?
              </span>
            </p>
            <p>
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>Create one.</span>
            </p>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
