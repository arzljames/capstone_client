import React, { useState } from "react";
import "./AddFacilityForm.css";
import { motion } from "framer-motion";
import { HiX, HiInformationCircle, HiCheck } from "react-icons/hi";
import InfoHover from "../Components/InfoHover";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const formVariant = {
  hidden: {
    opacity: 0,
    y: "-20px",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: "-20px",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 1,
  },
};

const AddFacilityForm = ({ setShowModal }) => {
  const [isClick, setIsClick] = useState(false);
  const { setAppState, toast } = useAuth();
  const [showHover, setShowHover] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const onHover = () => {
    setShowHover(true);
  };

  const offHover = () => {
    setShowHover(false);
  };

  const addSpec = (e) => {
    setSpecializations([{ name: temp }, ...specializations]);
    setTemp("");
    console.log(specializations);
  };

  const removeItem = (index) => {
    setSpecializations(specializations.filter((o, i) => index !== i));
  };

  const handleSubmit = async () => {
    setIsClick(true);
    setAppState("Updating Lists");
    let response = await api.post("/api/facility/add", {
      name,
      specializations,
      street,
      city,
      barangay,
    });

    if (response.data.err) {
      setAppState("error occure");
      setTimeout(() => setAppState(""), 500);
      setIsClick(false);
      toast.error("Please input the name of hospital");
    } else {
      setShowModal(false);
      setIsClick(false);
      setAppState("hospital added");
      setTimeout(() => setAppState(""), 500);
      toast.success("Successfully added hospital");
    }
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="modal-container"
    >
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="add-facility-form"
      >
        <div className="form-header">
          <h3>Add Hospital</h3>
          <p onClick={() => setShowModal(false)}>
            <HiX />
          </p>
        </div>

        <div className="form-body">
          <label>
            Hospital name <i>*</i>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />

          <div className="address-container">
            <label>Address</label>
            <p>Street</p>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              placeholder="Complete street address"
            />

            <div className="input-divider">
              <div>
                <p>Barangay</p>
                <input
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <p>City / Municipality</p>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          </div>

          
         
          <div className="specializations-container">
            {specializations.map((item, index) => {
              return (
                <p>
                  {item.name}
                  <div onClick={() => removeItem(index)} key={index + 1}>
                    <HiX />
                  </div>
                </p>
              );
            })}
          </div>
        </div>
        <div className="form-btns">
          <div></div>
          <div>
            <button
              onClick={() => setShowModal(false)}
              className="facility-close-btn"
            >
              Cancel
            </button>
            <motion.button
              onClick={() => handleSubmit()}
              whileTap={{ scale: 0.9 }}
              className={isClick ? "green-cta-disable" : "green-cta"}
            >
              Save
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddFacilityForm;
