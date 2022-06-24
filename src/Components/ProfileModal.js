import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";
import "./ProfileModal.css";
import { HiCheck } from "react-icons/hi";

const ProfileModal = ({
  setProfileModal,
  image,
  users,
  specc,
  desig,
  totalPt,
  totalCs,
}) => {
  let domNode = useClickOutside(() => {
    setProfileModal(false);
  });

  useEffect(() => {
    console.log(users);
  }, []);
  return (
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
        className="profile-modal"
      >
        <div className="profile-modal-info">
          <img src={image} alt="Profile Picture" />
          <div className="profile-modal-info-name">
            <h1>
              Dr. {users.firstname + " " + users.lastname}{" "}
              <div>
                <HiCheck />
              </div>
            </h1>
            <p style={{marginBottom: '0px'}}>{specc}</p>
            <p>{desig}</p>
          </div>
        </div>

        <div className="total-section">
          <div>
            <h5>{totalPt}</h5>
            <p>Total Patients</p>
          </div>
          <div>
            <h5>{totalCs}</h5>
            <p>Total Cases</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;
