import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";
import { HiPencil, HiInformationCircle, HiCheck, HiX } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import InfoHover from "../Components/InfoHover";

const AdminHospitalModal = ({ setShowHospitalModal, hospital }) => {
  const { setAppState, appState, facilities, toast } = useAuth();
  const [showHover, setShowHover] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [specializations, setSpecializations] = useState([]);
  let domNode = useClickOutside(() => {
    setShowHospitalModal(false);
  });

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
    setAppState("Updaing Lists");
    let response = await api.put(`/api/facility/update/${hospital._id}`, {
      name,
      street,
      city,
      barangay,
    });

    if (response.data.err) {
      toast.error("Please input the name of hospital");
    } else {
      setShowHospitalModal(false);
      setAppState("updated");
      setTimeout(() => setAppState(""), 500);
      toast.success("Successfully added hospital");
    }
  };

  useEffect(() => {
    setName(hospital.facility);
    setBarangay(hospital.address.barangay);
    setStreet(hospital.address.street);
    setCity(hospital.address.city);

    // {
    //   facilities
    //     .filter((e) => e._id === hospital._id)
    //     .map((e) => {
    //       setSpecializations(e.specialization);
    //     });
    // }

    const fetchSpec = async () => {
      try {
        let response = await api.get("/api/facility/");

        if (response) {
          setSpecializations(
            response.data
              .filter((e) => e._id === hospital._id)
              .map((e) => {
                return e.specialization;
              })[0]
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpec();
  }, [hospital, appState]);

  const inputRef = useRef(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [spec, setSpec] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const updateSpec = async () => {
    try {
      setIsClick(true);
      let response = await api.put(`/api/facility/update-spec/${spec._id}`, {
        name: spec.name,
      });

      if (response.data.ok) {
        setShowEditModal(false);
        setIsClick(false);
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      setShowEditModal(false);
      setIsClick(false);
      setAppState(error.message);
      setTimeout(() => setAppState(""), 500);
    }
  };

  return (
    <>
      {showEditModal && (
        <div className="edit-spec-modal">
          <div className="s">
            <h1>Rename Specialization</h1>
            <input
              value={spec.name}
              onChange={(e) => setSpec({ ...spec, name: e.target.value })}
              type="text"
            />
          </div>
          <div className="form-btns">
            <div></div>
            <div>
              <button
                onClick={() => setShowEditModal(false)}
                className="facility-close-btn"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="facility-save-btn"
                onClick={() => updateSpec()}
              >
                Save
              </motion.button>
            </div>
          </div>
        </div>
      )}
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
          className={
            showEditModal ? "add-facility-form none" : "add-facility-form"
          }
        >
          <div className="form-header">
            <h3>Update Hospital</h3>
            <p onClick={() => setShowHospitalModal(false)}>
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

            <label>
              Specializations
              <p onMouseEnter={onHover} onMouseLeave={offHover}>
                <HiInformationCircle />
                {showHover && (
                  <InfoHover message="Click the check icon inside the specialization field after typing. You can add more than one (multiple type of) specializations." />
                )}
              </p>
            </label>
            <div className="input-container">
              <input
                ref={inputRef}
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                type="text"
              />
              {temp.length !== 0 && (
                <motion.p onClick={() => addSpec()}>
                  <HiCheck />
                </motion.p>
              )}
            </div>

            <div className="specializations-container">
              {specializations.map((item, index) => {
                return (
                  <p>
                    {item.name}
                    <div
                      className="edit-spec"
                      onClick={() => {
                        setSpec(item);
                        setShowEditModal(true);
                      }}
                      key={index + 1}
                    >
                      <HiPencil />
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
                onClick={() => setShowHospitalModal(false)}
                className="facility-close-btn"
              >
                Cancel
              </button>
              <motion.button
                onClick={() => handleSubmit()}
                whileTap={{ scale: 0.9 }}
                className={
                  name === "" || isClick ? "green-cta-disable" : "green-cta"
                }
              >
                Save
              </motion.button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </>
  );
};

export default AdminHospitalModal;
