import React from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";
import { motion } from "framer-motion";

const PatientAdvanceSearch = ({ setShowAdvance }) => {
  let domNode = useClickOutside(() => {
    setShowAdvance(false);
  });
  return (
    <>
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
          ref={domNode}
          className="advance-search-modal"
        >
          PatientAdvanceSearch
        </motion.div>
      </motion.div>
    </>
  );
};

export default PatientAdvanceSearch;
