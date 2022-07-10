import React, { useEffect, useState, useRef } from "react";
import "./Login.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";
import {
  formVariant,
  containerVariant,
  loginFormVariant,
} from "../Animations/Animations";
import Logo from "../Assets/zcmc_logo.png";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);
  const [retypeError, setRetypeError] = useState(false);
  const [firstnameErr, setFirstnameErr] = useState(false);
  const [lastnameErr, setLastnameErr] = useState(false);
  const [hospitalErr, setHospitalErr] = useState(false);
  const [specErr, setSpecErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [retypMsg, setRetypeMsg] = useState("");
  const [firstnameMsg, setFirstnameMsg] = useState("");
  const [lastnameMsg, setLastnameMsg] = useState("");
  const [hospitalMsg, setHospitalMsg] = useState("");
  const [specMsg, setSpecMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const { facilities, specializations } = useAuth();
  const [rePassword, setRePassword] = useState("");
  const [spec, setSpec] = useState([]);
  const [register, setRegister] = useState({
    firstname: "",
    lastname: "",
    specialization: "",
    designation: "",
    email: "",
    username: "",
    password: "",
  });

  const clearForm = () => {
    setRePassword("");
    setRegister({
      firstname: "",
      lastname: "",
      specialization: "",
      designation: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoader(true);
    try {
      if (register.firstname === "") {
        setFirstnameErr(true);
        setFirstnameMsg("First name field required");
        setLoader(false);
      } else if (register.lastname === "") {
        setLastnameErr(true);
        setLastnameMsg("Last name field required");
        setLoader(false);
      } else if (register.designation === "") {
        setHospitalErr(true);
        setHospitalMsg("Hospital field required");
        setLoader(false);
      } else if (
        register.designation === "623ec7fb80a6838424edaa29" &&
        register.specialization === ""
      ) {
        setSpecErr(true);
        setSpecMsg("Specialization field required");
        setLoader(false);
      } else if (register.email === "") {
        setEmailErr(true);
        setEmailMsg("Email field required");
        setLoader(false);
      } else if (
        !register.email.includes("@") ||
        !register.email.includes(".")
      ) {
        setEmailErr(true);
        setEmailMsg("Input a valid email address");
        setLoader(false);
      } else if (register.username === "") {
        setUsernameErr(true);
        setUsernameMsg("Username field required");
        setLoader(false);
      } else if (register.password === "") {
        setPasswordErr(true);
        setPasswordMsg("Password field required");
        setLoader(false);
      } else if (register.password.length < 6) {
        setPasswordErr(true);
        setPasswordMsg("Password must be at least 6 characters");
        setLoader(false);
      } else if (register.password !== rePassword) {
        setRetypeError(true);
        setRetypeMsg("Password did not match");
        setLoader(false);
      } else {
        let response = await api.post("/api/auth/register", {
          firstname: register.firstname,
          lastname: register.lastname,
          specialization: register.specialization,
          designation: register.designation,
          email: register.email,
          username: register.username,
          password: register.password,
        });

        // if (response.data.ok) {
        //   setSuccess(true);
        //   clearForm();
        // }

        if (response.data.emailErr) {
          setEmailErr(true);
          setEmailMsg(response.data.emailErr);
          setLoader(false);
        } else if (response.data.usernameErr) {
          setUsernameErr(true);
          setUsernameMsg(response.data.usernameErr);
          setLoader(false);
        } else {
          setSuccess(true);
          clearForm();
          setLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    facilities
      .filter((item) => item._id === register.designation)
      .map((e) => e.specialization)
      .map((r) => {
        return setSpec(r);
      });

    console.log(spec);
  }, [register.designation]);

  return (
    <>
      <Helmet>
        <title>Sign up to ZCMC Telemedicine | ZCMC Telemedicine</title>
      </Helmet>
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
                <h1>Register Successful</h1>
                <p onClick={() => setSuccess(false)}>
                  <HiX />
                </p>
              </div>

              <div className="register-successful-body">
                <p>
                  Your account is pending for approval. We will send you an
                  email with instructions on how you can verify and activate
                  your account. Thank you!
                </p>
              </div>
              <button onClick={() => setSuccess(false)}>Confirm</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="register-container">
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
              <h1>Sign up</h1>
              <p>Enter necessary information</p>
            </div>
          </div>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              First name <i>*</i>
            </label>
            <input
              placeholder="e.g. John"
              id={firstnameErr ? "error-input" : ""}
              className={firstnameErr ? "error-input" : ""}
              value={register.firstname}
              onChange={(e) => {
                setFirstnameErr(false);
                let value = e.target.value;
                setRegister({
                  firstname: value,
                  lastname: register.lastname,
                  specialization: register.specialization,
                  designation: register.designation,
                  email: register.email,
                  username: register.username,
                  password: register.password,
                });
              }}
              type="text"
            />
            {firstnameErr && <p className="error-input-text">{firstnameMsg}</p>}

            <label>
              Last name <i>*</i>
            </label>
            <input
              placeholder="e.g. Dela Cruz"
              className={lastnameErr ? "error-input" : ""}
              value={register.lastname}
              onChange={(e) => {
                setLastnameErr(false);
                let value = e.target.value;
                setRegister({
                  firstname: register.firstname,
                  lastname: value,
                  specialization: register.specialization,
                  designation: register.designation,
                  email: register.email,
                  username: register.username,
                  password: register.password,
                });
              }}
              type="text"
            />
            {lastnameErr && <p className="error-input-text">{lastnameMsg}</p>}

            <label>
              HOSPITAL <i>*</i>
            </label>
            <select
              className={hospitalErr ? "error-input" : ""}
              onChange={(e) => {
                setHospitalErr(false);
                let value = e.target.value;
                setRegister({
                  firstname: register.firstname,
                  lastname: register.lastname,
                  specialization: register.specialization,
                  designation: value,
                  email: register.email,
                  username: register.username,
                  password: register.password,
                });
              }}
            >
              <option
                value=""
                disabled
                selected={register.designation === "" ? true : false}
              >
                - Please Select -
              </option>

              {facilities.map((item) => {
                return <option value={item._id}>{item.facility}</option>;
              })}
            </select>
            {hospitalErr && <p className="error-input-text">{hospitalMsg}</p>}

            {register.designation === "623ec7fb80a6838424edaa29" && (
              <>
                <label>
                  Specialization <i>*</i>
                </label>
                <select
                  className={specErr ? "error-input" : "spec"}
                  onChange={(e) => {
                    setSpecErr(false);
                    let value = e.target.value;
                    setRegister({
                      firstname: register.firstname,
                      lastname: register.lastname,
                      specialization: value,
                      designation: register.designation,
                      email: register.email,
                      username: register.username,
                      password: register.password,
                    });
                  }}
                >
                  <option
                    value=""
                    disabled
                    selected={register.specialization === "" ? true : false}
                  >
                    - Please Select -
                  </option>

                  {specializations.map((item) => {
                    return (
                      <option value={item._id}>{item.specialization}</option>
                    );
                  })}
                </select>

                {specErr && <p className="error-input-text spec">{specMsg}</p>}
              </>
            )}

            <label>
              Email <i>*</i>
            </label>
            <input
              placeholder="example@gmail.com"
              className={emailErr ? "error-input" : ""}
              value={register.email}
              onChange={(e) => {
                setEmailErr(false);
                let value = e.target.value;
                setRegister({
                  firstname: register.firstname,
                  lastname: register.lastname,
                  specialization: register.specialization,
                  designation: register.designation,
                  email: value,
                  username: register.username,
                  password: register.password,
                });
              }}
              type="text"
            />
            {emailErr && <p className="error-input-text">{emailMsg}</p>}

            <label>
              Username <i>*</i>
            </label>
            <input
              className={usernameErr ? "error-input" : ""}
              value={register.username}
              onChange={(e) => {
                setUsernameErr(false);
                let value = e.target.value;
                setRegister({
                  firstname: register.firstname,
                  lastname: register.lastname,
                  specialization: register.specialization,
                  designation: register.designation,
                  email: register.email,
                  username: value,
                  password: register.password,
                });
              }}
              type="text"
            />
            {usernameErr && <p className="error-input-text">{usernameMsg}</p>}

            <label>
              Password <i>*</i>
            </label>
            <input
              className={passwordErr ? "error-input" : ""}
              value={register.password}
              onChange={(e) => {
                setPasswordErr(false);
                let value = e.target.value;
                setRegister({
                  firstname: register.firstname,
                  lastname: register.lastname,
                  specialization: register.specialization,
                  designation: register.designation,
                  email: register.email,
                  username: register.username,
                  password: value,
                });
              }}
              placeholder="At least 6 characters"
              type="password"
            />
            {passwordErr && <p className="error-input-text">{passwordMsg}</p>}

            <label>
              Confirm Password <i>*</i>
            </label>

            <input
              className={retypeError ? "error-input" : ""}
              value={rePassword}
              onChange={(e) => {
                setRetypeError(false);
                setRePassword(e.target.value);
                setRetypeError(false);
              }}
              type="password"
              placeholder="Type password again"
            />

            {retypeError && <p className="error-input-text">{retypMsg}</p>}

            <button
              onClick={() => {
                handleRegister();
              }}
              className={loader ? "login-form-btn-disable" : "login-form-btn"}
            >
              <a href="#error-input">{loader ? "Signing Up" : "Sign Up"}</a>
            </button>

            <div className="form-link">
              <p onClick={() => navigate("/login")}>
                Already have an account? <span>Sign in.</span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
