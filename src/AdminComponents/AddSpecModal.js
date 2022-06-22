import React, { useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { formVariant, containerVariant } from "../Animations/Animations";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const AddSpecModal = ({ setModal }) => {
  const domNode = useClickOutside(() => {
    setModal(false);
  });

  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const { toast, setAppState } = useAuth();
  const [isClick, setIsClick] = useState(false);

  const handleSubmit = async () => {
    setIsClick(true);
    try {
      let response = await api.post("/api/spec/add", {
        specialization,
        description,
      });

      if (response) {
        console.log(response);
        setAppState("Added Successfully");
        setTimeout(() => setAppState(""), 500);
        setModal(false);
        setIsClick(false);
      }
    } catch (error) {
      console.log(error);
      setAppState("Error");
      setTimeout(() => setAppState(""), 500);
      setIsClick(false);
    }
  };

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
        <input
          onChange={(e) => setSpecialization(e.target.value)}
          value={specialization}
          type="text"
        />

        <label style={{ marginBottom: "50px" }}>Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Optional"
        />

        <div className="popup-modal-btns">
          <button onClick={() => setModal(false)}>Cancel</button>
          <button
            onClick={() => handleSubmit()}
            className={isClick ? "green-cta-disable" : "green-cta"}
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddSpecModal;
