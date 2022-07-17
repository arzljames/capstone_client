import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PatientTerm from "./PatientTerm";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import { formVariant, containerVariant } from "../Animations/Animations";
import { useClickOutside } from "../Hooks/useClickOutside";

const bodyVariant = {
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

const AddPatientForm = ({
  setPatientForm,
  setTerm,
  term,
  accept,
  setAccept,
}) => {
  let domNode = useClickOutside(() => {
    setPatientForm(false);
    navigate(-1);
  });

  const [civilOther, setCivilOther] = useState(null);
  const [religionOther, setReligionOther] = useState(null);
  const [relationOther, setRelationOther] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [fullname, setFullname] = useState("");
  const [relationship, setRelationship] = useState("");

  const { user, setAppState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let response = await api.put(`/api/user/add-patient/${user.userId}`, {
        firstname,
        middlename,
        lastname,
        contact,
        sex,
        birthday,
        civilStatus,
        religion,
        birthplace,
        street,
        barangay,
        city,
        ethnicity,
        fullname,
        relationship,
      });

      if (response) {
        setAppState("Added one patient");
        setTimeout(() => setAppState(""), 500);
        setPatientForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="modal-container"
    >
      <motion.div
        ref={domNode}
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="form overflow"
      >
        <div className="form-header">
          <h1>Informed Consent</h1>
        </div>

        {term === false ? (
          <PatientTerm
            setTerm={setTerm}
            accept={accept}
            setAccept={setAccept}
            setPatientForm={setPatientForm}
          />
        ) : (
          <>
            <motion.div
              variants={bodyVariant}
              initial="hidden"
              animate="visible"
              className="form-body"
            >
              <label>
                First name <i>*</i>
              </label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
              />
              <label>
                Middle name <i>*</i>
              </label>
              <input
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
                type="text"
              />
              <label>
                Last name <i>*</i>
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
              />

              <label>
                Contact no. <i>*</i>
              </label>
              <div className="input-container">
                <p className="number">+63</p>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="contact-input"
                  type="number"
                  placeholder="e.g. 987 - 6543 - 210"
                />
              </div>

              <div>
                <label>
                  Sex <i>*</i>
                </label>
                <div className="input-radio-container">
                  <input
                    value="Male"
                    checked={sex === "Male"}
                    onChange={(e) => setSex(e.target.value)}
                    type="radio"
                  />
                  <p>Male</p>
                  <input
                    value="Female"
                    checked={sex === "Female"}
                    onChange={(e) => setSex(e.target.value)}
                    type="radio"
                  />
                  <p>Female</p>
                </div>
              </div>

              <label>
                Birthday <i>*</i>
              </label>
              <input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="date-input"
                type="date"
              />

              <div className="input-divider">
                <div>
                  <label>
                    Civil Status <i>*</i>
                  </label>

                  <select
                    onChange={(e) => {
                      setCivilStatus(e.target.value);
                      setCivilOther(e.target.value);
                    }}
                  >
                    <option disabled selected value="">
                      - Please Select -
                    </option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Other">Other</option>
                  </select>

                  {civilOther === "Other" && (
                    <input
                      onChange={(e) => setCivilStatus(e.target.value)}
                      className="other-input"
                      type="text"
                      placeholder="If Other, please specify civil status"
                    />
                  )}
                </div>
                <div>
                  <label>
                    Religion <i>*</i>
                  </label>
                  <select
                    onChange={(e) => {
                      setReligion(e.target.value);
                      setReligionOther(e.target.value);
                    }}
                  >
                    <option disabled selected value="">
                      - Please Select -
                    </option>
                    <option value="Christian">Christian</option>
                    <option value="Islam">Islam</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Other">Other</option>
                  </select>

                  {religionOther === "Other" && (
                    <input
                      onChange={(e) => setReligion(e.target.value)}
                      className="other-input"
                      type="text"
                      placeholder="If Other, please specify religion"
                    />
                  )}
                </div>
              </div>

              <label>
                Birthplace <i>*</i>
              </label>
              <input
                value={birthplace}
                onChange={(e) => setBirthplace(e.target.value)}
                type="text"
              />

              <div className="address-container">
                <label>
                  Address <i>*</i>
                </label>
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
                Ethnicity <i>*</i>
              </label>
              <input
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                type="text"
              />

              <div className="address-container">
                <label>
                  Legal Guardian <i>*</i>
                </label>
                <div className="input-divider">
                  <div>
                    <p>Fullname</p>
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div>
                    <p>Relationship</p>
                    <select
                      onChange={(e) => {
                        setRelationship(e.target.value);
                        setRelationOther(e.target.value);
                      }}
                    >
                      <option disabled selected value="">
                        - Please Select -
                      </option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Grand Mother">Grand Mother</option>
                      <option value="Grand Father">Grand Father</option>
                      <option value="Aunt">Aunt</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                {relationOther === "Other" && (
                  <input
                    onChange={(e) => {
                      setRelationship(e.target.value);
                    }}
                    type="text"
                    className="other-input"
                    placeholder="If Other, please specify relationship"
                  />
                )}
              </div>
            </motion.div>
            <div className="form-btns">
              <button
                onClick={() => setTerm(!term)}
                className="consent-back-btn"
              >
                Back
              </button>
              <motion.button
                onClick={() => handleSubmit()}
                whileTap={{ scale: 0.9 }}
                className={
                  accept ? "consent-next-btn" : "consent-next-btn-disable"
                }
              >
                Save
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddPatientForm;
