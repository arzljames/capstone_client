import React from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { formVariant, containerVariant } from "../Animations/Animations";

const AddSpecModal = ({ setModal }) => {
  const domNode = useClickOutside(() => {
    setModal(false);
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
        className="popup-modal"
      >
        <h1>Add Specialization</h1>
        <label>Name</label>
        <input type="text" />

        <label>Description</label>
        <input type="text" placeholder="Optional" />

        <div className="popup-modal-btns">
          <button>Cancel</button>
          <button className="green-cta">Save</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddSpecModal;
