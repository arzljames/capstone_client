import React from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";

const ProfileModal = ({ setProfileModal }) => {
  let domNode = useClickOutside(() => {
    setProfileModal(false);
  });
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
        <div className="profile-modal-header"></div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;
