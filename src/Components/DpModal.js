import React from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";

const DpModal = ({ setDp }) => {
  let domNode = useClickOutside(() => {
    setDp(false);
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
        className="dp-modal"
      >
        <h1>Change Profile Picture</h1>
        <p>
          It will take some time to reflect profile changes across the system.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DpModal;
