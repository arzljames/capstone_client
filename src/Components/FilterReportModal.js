import React from "react";
import { formVariant, containerVariant } from "../Animations/Animations";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import useAuth from "../Hooks/useAuth";

const FilterReportModal = ({
  setFilterModal,
  setRefer,
  setSpecialization,
  setAge,
  setGender,
}) => {
  let domNode = useClickOutside(() => {
    setFilterModal(false);
  });

  const { facilities, listUsers } = useAuth();

  const today = new Date();
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
        className="filter-modal"
      >
        <div className="date-range">
          <div>
            <label>From</label> <input type="date" />
          </div>
          <div>
            <label>To</label> <input value={today} max={today} type="date" />
          </div>
        </div>

        <div className="date-range">
          <div>
            <label>Sex</label>
            <select>
              <option value="All">None</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div>
            <label>Age</label> <input type="number" />
          </div>
        </div>

        <label>Referring Hospital</label>
        <select>
          <option value="All">None</option>

          {facilities
            .filter((e) => e._id !== "623ec7fb80a6838424edaa29")
            .map((item, index) => {
              return (
                <option key={index} selected value={item._id}>
                  {item.facility}
                </option>
              );
            })}
        </select>

        <label>Service Type</label>
        <select>
          <option value="All">None</option>
          {facilities
            .filter((e) => e._id === "623ec7fb80a6838424edaa29")
            .map((item, index) => {
              return item.specialization.map((f) => {
                return (
                  <option key={index} selected value={f._id}>
                    {f.name}
                  </option>
                );
              });
            })}
        </select>

        <label>Physician</label>
        <select>
          <option value="All">None</option>
          {listUsers
            .filter(
              (e) =>
                e.userType !== "admin" &&
                e.designation !== "623ec7fb80a6838424edaa29"
            )
            .map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  Dr. {item.firstname}
                </option>
              );
            })}
        </select>

        <div className="btns">
          <button onClick={() => setFilterModal(false)} className="close">
            Close
          </button>
          <button className="apply">Apply</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterReportModal;
