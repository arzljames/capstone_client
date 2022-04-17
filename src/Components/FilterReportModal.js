import React from "react";
import { formVariant, containerVariant } from "../Animations/Animations";
import { motion } from "framer-motion";

const FilterReportModal = () => {
  return (
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
        className="filter-modal"
      ></motion.div>
    </motion.div>
  );
};

export default FilterReportModal;
