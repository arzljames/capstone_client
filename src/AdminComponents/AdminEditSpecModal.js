import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { formVariant, containerVariant } from "../Animations/Animations";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const AdminEditSpecModal = ({ setEditModal, toast, spec, desc, id }) => {

   //Custom hook to close modal when clicked outside
  const domNode = useClickOutside(() => {
    setEditModal(false);
  });

  //AdminEditSpecModal Component States
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const { setAppState } = useAuth();
  const [isClick, setIsClick] = useState(false);


  //Handling submit put request using asynchronous axios api
  const handleSubmit = async () => {
    setIsClick(true);
    try {
      let response = await api.put(`/api/spec/edit/${id}`, {
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
        toast.success("Updated specialization");
        setTimeout(() => setAppState(""), 500);
        setEditModal(false);
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

  useEffect(() => {
    setSpecialization(spec);
    setDescription(desc);
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
        className="popup-modal"
      >
        <h1>Edit Specialization</h1>
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

        <div className="popup-modal-btns">
          <button onClick={() => setEditModal(false)}>Cancel</button>
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

export default AdminEditSpecModal;
