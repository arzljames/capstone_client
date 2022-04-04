import React, { useEffect, useState, useRef } from "react";
import "./Login.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import Toast from "../Components/Toast";
import { useClickOutside } from "../Hooks/useClickOutside";

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

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    zIndex: -1,
    transition: {
      duration: 0,
    },
  },
};

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // let domNode = useClickOutside(() => {
  //   setSuccess(false);
  // });

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

  const { facilities } = useAuth();
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
    try {
      if (register.firstname === "") {
        setFirstnameErr(true);
        setFirstnameMsg("First name field required");
      } else if (register.lastname === "") {
        setLastnameErr(true);
        setLastnameMsg("Last name field required");
      } else if (register.designation === "") {
        setHospitalErr(true);
        setHospitalMsg("Hospital field required");
      } else if (register.specialization === "") {
        setSpecErr(true);
        setSpecMsg("Specialization field required");
      } else if (register.email === "") {
        setEmailErr(true);
        setEmailMsg("Email field required");
      } else if (
        !register.email.includes("@") ||
        !register.email.includes(".")
      ) {
        setEmailErr(true);
        setEmailMsg("Input a valid email address");
      } else if (register.username === "") {
        setUsernameErr(true);
        setUsernameMsg("Username field required");
      } else if (register.password === "") {
        setPasswordErr(true);
        setPasswordMsg("Password field required");
      } else if (register.password.length < 6) {
        setPasswordErr(true);
        setPasswordMsg("Password must be at least 6 characters");
      } else if (register.password !== rePassword) {
        setRetypeError(true);
        setRetypeMsg("Password did not match");
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
        } else if (response.data.usernameErr) {
          setUsernameErr(true);
          setUsernameMsg(response.data.usernameErr);
        } else {
          setSuccess(true);
          clearForm();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    facilities
      .filter((item) => item.facility === register.designation)
      .map((e) => e.specialization)
      .map((r) => {
        return setSpec(r);
      });

    console.log(spec);
  }, [register.designation]);

  return (
    <>
      {success && (
        <div className="modal-container">
          <div className="register-successful">
            <div className="success-icon">
              <HiCheck />
            </div>
            <h1>Success</h1>

            <p>
              Your account is pending for approval. We will send you an email
              with instructions on how you can activate your account.
            </p>
            <button onClick={() => setSuccess(false)}>Confirm</button>
          </div>
        </div>
      )}
      <div className="login-container">
        {/* <Toast /> */}
        <h1>Sign up to ZCMC Telemedicine</h1>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="login-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>
            First name <i>*</i>
          </label>
          <input
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
            REFERRING HOSPITAL <i>*</i>
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
              return <option value={item.facility}>{item.facility}</option>;
            })}
          </select>
          {hospitalErr && <p className="error-input-text">{hospitalMsg}</p>}

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

            {spec.map((item) => {
              return <option value={item.name}>{item.name}</option>;
            })}
          </select>

          {specErr && <p className="error-input-text spec">{specMsg}</p>}

          <label>
            Email <i>*</i>
          </label>
          <input
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
            Re-type Password <i>*</i>
          </label>
          <div className="form-input-container">
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
          </div>
          {retypeError && <p className="error-input-text">{retypMsg}</p>}

          <button onClick={() => handleRegister()} className="login-form-btn">
            Sign Up
          </button>
          <div className="form-link">
            <p onClick={() => navigate("/login")}>
              Already have an account? <span>Sign in.</span>
            </p>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Register;