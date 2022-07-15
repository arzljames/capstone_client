import React, { useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { formVariant, containerVariant } from "../Animations/Animations";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const AddSpecModal = ({ setModal, toast }) => {
  const domNode = useClickOutside(() => {
    setModal(false);
  });

  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const { setAppState } = useAuth();
  const [isClick, setIsClick] = useState(false);

  const handleSubmit = async () => {
    setIsClick(true);
    try {
      let response = await api.post("/api/spec/add", {
        specialization,
        description,
      });

      if (specialization === "") {
        toast.error("Input specialization");
        setIsClick(false);
        return;
      }

      if (response) {
        console.log(response);
        setAppState("Added Successfully");
        toast.success("Added specialization successfully");
        setTimeout(() => setAppState(""), 500);
        setModal(false);
        setIsClick(false);
      }
    } catch (error) {
      console.log(error);
      setAppState("Error");
      toast.error("An error occured");
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
        className="form"
      >
        <div className="form-header">
          <h1>Add Specialization</h1>
        </div>

        <div className="form-body">
          <label>Name</label>
          <input
            onChange={(e) => setSpecialization(e.target.value)}
            value={specialization}
            type="text"
          />

          <label>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Optional"
          ></textarea>
        </div>
        <div className="form-btns">
          <div></div>
          <div>
            <button
              className="facility-close-btn"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className={isClick ? "green-cta-disable" : "green-cta"}
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddSpecModal;
