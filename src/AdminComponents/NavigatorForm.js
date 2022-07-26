import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { motion } from "framer-motion";
import { formVariant, containerVariant } from "../Animations/Animations";
import api from "../API/Api";


//Registration for navigator user form-modal
const NavigatorForm = ({ setNavigator }) => {
  const { toast, ToastContainer } = useAuth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  //Handling submit post request using asynchronous axios api
  const handleSubmit = async () => {
    if (!firstname || !lastname || !username || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirm) {
      toast.error("Password did not match");
      return;
    }
    try {
      const response = await api.post("/api/auth/navigator", {
        firstname,
        lastname,
        username,
        password,
      });

      if (response.data.err) {
        toast.error("Username is already in use");
      } else {
        toast.success("Successfully registerd navigator");
        setFirstname("");
        setLastname("");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.div
          variants={formVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="form overflow"
        >
          <div className="form-header">
            <h1>Register Navigator</h1>
          </div>
          <div className="form-body">
            <label>
              First name <i>*</i>
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
            />

            <label>
              Last name <i>*</i>
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
            />

            <label>
              Username <i>*</i>
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />

            <label>
              Password <i>*</i>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <label>
              Confirm Password <i>*</i>
            </label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
            />
          </div>

          <div className="form-btns">
            <div></div>
            <div>
              <button
                onClick={() => setNavigator(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button onClick={() => handleSubmit()} className="green-cta">
                Submit
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NavigatorForm;
