import React, { useState } from "react";
import { motion } from "framer-motion";
import { formVariant, containerVariant } from "../Animations/Animations";
import { useClickOutside } from "../Hooks/useClickOutside";
import "./ChangePasswordModal.css";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

//Component modal for changing password
const ChangePasswordModal = ({ setModal }) => {
  let domNode = useClickOutside(() => {
    setModal(false);
  });

  const { toast, ToastContainer, user } = useAuth();
  const [old, setOld] = useState("");
  const [newP, setNewP] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [loader, setLoader] = useState(false);

  const submitPassword = async () => {
    setLoader(true);

    if (newP.length < 6) {
      toast.error("Password must be at least 6 characters length");
      setLoader(false);
      return;
    }

    if (newP !== confirmP) {
      toast.error("Password did not match");
      setLoader(false);
      return;
    }

    try {
      let response = await api.put(`/api/user/change-password/${user.userId}`, {
        old,
        newP,
      });

      if (response.data.ok) {
        toast.success(response.data.ok);
        setLoader(false);
        setNewP("");
        setOld("");
        setConfirmP("");
      } else {
        toast.error(response.data.err);
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoader(false);
    }
  };

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal-container"
      >
        <motion.div
          ref={domNode}
          variants={formVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="form"
        >
          <div className="form-header">
            <h1>Change Password</h1>
          </div>
          <div className="form-body">
            <label>
              Old Password <span>*</span>
            </label>
            <input
              value={old}
              onChange={(e) => setOld(e.target.value)}
              type="password"
            />

            <label>
              New Password <span>*</span>
            </label>
            <input
              value={newP}
              onChange={(e) => setNewP(e.target.value)}
              type="password"
            />

            <label>
              Confirm Password <span>*</span>
            </label>
            <input
              value={confirmP}
              onChange={(e) => setConfirmP(e.target.value)}
              type="password"
            />
          </div>
          <div className="form-btns">
            <div></div>
            <div>
              <button onClick={() => setModal(false)} className="gray-cta">
                Cancel
              </button>
              <button
                className={loader ? "green-cta-disable" : "green-cta"}
                onClick={() => submitPassword()}
              >
                Save Password
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ChangePasswordModal;
