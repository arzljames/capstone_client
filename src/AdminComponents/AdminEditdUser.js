import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { containerVariant, formVariant } from "../Animations/Animations";
import { useClickOutside } from "../Hooks/useClickOutside";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";

const AdminEditdUser = ({ userData, setModal, toast }) => {

  //AdminEditUser Component States
  const [isClick, setIsClick] = useState(false);
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [firstname, setFirstname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState(userData.designation._id);
  const { specializations, facilities, setAppState } = useAuth();

  useEffect(() => {
    setLastname(userData.lastname);
    setMiddlename(userData.middlename);
    setFirstname(userData.firstname);
    setSpecialization(
      userData.specialization === null ? null : userData.specialization._id
    );
    setHospital(userData.designation._id);
  }, []);

  //Custom hook to close modal when clicked outside
  const domNode = useClickOutside(() => {
    setModal(false);
  });


    //Handling submit put request using asynchronous axios api
  const handleUpdate = async () => {
    setIsClick(true);
    try {
      const response = await api.put(`/api/user/update/${userData._id}`, {
        firstname,
        middlename,
        lastname,
        designation: hospital,
        specialization,
      });

      if (response.data.ok) {
        toast.success("Updated user profile");
        setIsClick(false);
        setModal(false);
        setAppState("Updated");
        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      toast.error(error.message);
      setIsClick(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" className="modal-container">
      <motion.div
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={domNode}
        className="popup-modal"
      >
        <h1>Edit User</h1>
        <label>Last name</label>
        <input
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
        />

        <label>Middle name</label>
        <input
          placeholder="Optional"
          value={middlename}
          onChange={(e) => setMiddlename(e.target.value)}
          type="text"
        />

        <label>First name</label>
        <input
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
        />

        <label>Hospital</label>
        <select value={hospital} onChange={(e) => setHospital(e.target.value)}>
          <option value="" disabled>
            - Please Select -
          </option>
          {facilities.map((e, index) => {
            return (
              <option key={index} value={e._id}>
                {e.facility}
              </option>
            );
          })}
        </select>

        {userData.designation._id !== "623ec7fb80a6838424edaa29" ? null : (
          <>
            <label>Specialization</label>
            <select
              value={userData.specialization === null ? null : specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option
                value=""
                disabled
                selected={specialization === null ? true : false}
              >
                - Please Select -
              </option>
              {specializations.map((e, index) => {
                return (
                  <option key={index} value={e._id}>
                    {e.specialization}
                  </option>
                );
              })}
            </select>
          </>
        )}

        <div className="popup-modal-btns">
          <button onClick={() => setModal(false)} className="grey-cta">
            Cancel
          </button>
          <button
            onClick={() => handleUpdate()}
            className={isClick ? "green-cta-disable" : "green-cta"}
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminEditdUser;
