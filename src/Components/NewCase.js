import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import useCaseData from "../Hooks/useCaseData";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";
import { HiPlus, HiX } from "react-icons/hi";
import { socket } from "./Socket";
import { useClickOutside } from "../Hooks/useClickOutside";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";

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

const NewCase = ({ setShowCase }) => {
  let domNode = useClickOutside(() => {
    setShowCase(false);
  });

  const updateSocket = () => {
    socket.emit("notif");
  };

  const navigate = useNavigate();

  const {
    user,
    patients,
    facilities,
    listUsers,
    setTab,
    setToast,
    setMessage,
    setIsError,
    setAppState,
    toast,
  } = useAuth();
  const [patientData, setPatientData] = useState("");
  const {
    patientId,
    setPatientId,
    setHospital,
    temperature,
    setTemperature,
    respiratory,
    setRespiratory,
    heart,
    setHeart,
    blood,
    setBlood,
    oxygen,
    setOxygen,
    weight,
    setWeight,
    height,
    setHeight,
    cc,
    setCc,
    hpi,
    setHpi,
    pmh,
    setPmh,
    ros,
    setRos,
    pe,
    setPe,
    paraclinical,
    setParaclinical,
    wi,
    setWi,
    imd,
    setImd,
    reason,
    setReason,
    specialization,
    setSpecialization
  } = useCaseData();

  const clearForm = () => {
    setPatientId("");
    setHospital("");
    setSpecialization("");
    setTemperature("");
    setRespiratory("");
    setHeart("");
    setBlood("");
    setOxygen("");
    setWeight("");
    setHeight("");
    setCc("");
    setHpi("");
    setPmh("");
    setRos("");
    setPe("");
    setParaclinical({ name: "", file: "" });
    setWi("");
    setImd("");
    setReason("");
  };

  const handleSubmit = async () => {
    try {
      if (
        !patientId ||
        !specialization ||
        !temperature ||
        !respiratory ||
        !heart ||
        !blood ||
        !oxygen ||
        !weight ||
        !height ||
        !cc ||
        !hpi ||
        !pmh ||
        !ros ||
        !pe ||
        !wi ||
        !imd ||
        !reason
      ) {
        setToast(true);
        setIsError(true);
        setMessage(
          "Request failed with status code 404. Please check empty fields."
        );

        return;
      } else {
        const formData = new FormData();
        formData.append("file", paraclinical.file);
        formData.append("upload_preset", "qn8bbwmc");
        formData.append("cloud_name", "ojttelemedicine");

        fetch("https://api.cloudinary.com/v1_1/ojttelemedicine/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            api
              .put(`/api/patient/add-case/${patientId}`, {
                physician: user.userId,
                specialization,
                temperature,
                respiratory,
                heart,
                blood,
                oxygen,
                weight,
                height,
                cc,
                hpi,
                pmh,
                ros,
                pe,
                paraclinicalName: paraclinical.name,
                paraclinicalFile: data.url ? data.url : "",
                wi,
                imd,
                reason,
              })
              .then((result) => {
                if (result) {
                  updateSocket();
                  setAppState(result.data.ok);
                  setTimeout(() => setAppState(""), 500);
                  clearForm();
                  setTab("Active Case");
                  setToast(true);
                  setIsError(false);
                  setAppState(result.data.ok);
                  setMessage("Successfully saved consultation case.");
                  navigate(
                    `/consultation/outgoing/case/case-data/${result.data.ok._id}`,
                    {
                      state: patientData[0],
                    }
                  );
                  console.log(result);
                } else {
                  setToast(true);
                  setIsError(true);
                  setMessage("Request failed with status code 404");
                }
              });
          });
      }
    } catch (error) {
      setToast(true);
      setIsError(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    setPatientData(
      patients.filter((e) => {
        return e._id === patientId;
      })
    );
  }, [patientId]);

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
      onSubmit={(e) => e.preventDefault()}
    >
      <AnimatePresence>{toast && <Toast />}</AnimatePresence>
      <motion.form
        ref={domNode}
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="add-facility-form"
      >
        <div className="form-header">
          <h1>Add New Case</h1>
          <p onClick={() => setShowCase(false)}>
            <HiX />
          </p>
        </div>
        <div className="form-body">
          <label>
            Patient <i>*</i>
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="select"
          >
            <option value="" disabled selected>
              - Please Select -
            </option>
            {patients
              .filter((id) => id.physician._id === user.userId)
              .map((item) => {
                return (
                  <option value={item._id}>
                    {item.firstname +
                      " " +
                      item.middlename[0] +
                      "." +
                      " " +
                      item.lastname}
                  </option>
                );
              })}
          </select>

          <label>
            Service Type <i>*</i>
          </label>
          <select
          value={specialization}
            className="select"
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="" disabled selected>
              - Please Select -
            </option>
            {facilities
              .filter((e) => e._id === "623ec7fb80a6838424edaa29")
              .map((item) => {
                return item.specialization.map((f) => {
                  return (
                    <option selected value={f._id}>
                      {f.name}
                    </option>
                  );
                });
              })}
          </select>

          <label>
            Temperature (°C) <i>*</i>
          </label>
          <input
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            type="number"
          />

          <label>
            Respiratory Rate <i>*</i>
          </label>
          <input
            value={respiratory}
            onChange={(e) => setRespiratory(e.target.value)}
            type="text"
          />

          <label>
            Heart Rate <i>*</i>
          </label>
          <input
            value={heart}
            onChange={(e) => setHeart(e.target.value)}
            type="text"
          />

          <label>
            Blood Pressure <i>*</i>
          </label>
          <input
            value={blood}
            onChange={(e) => setBlood(e.target.value)}
            type="text"
          />

          <label>
            Oxygen Saturation <i>*</i>
          </label>
          <input
            value={oxygen}
            onChange={(e) => setOxygen(e.target.value)}
            type="text"
          />

          <label>
            Weight (KG) <i>*</i>
          </label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
          />

          <label>
            Height (CM) <i>*</i>
          </label>
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
          />

          <label>
            Chief Complaint <i>*</i>
          </label>
          <textarea
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          ></textarea>

          <label>
            Pertinent History of Present Illness <i>*</i>
          </label>
          <textarea
            value={hpi}
            onChange={(e) => setHpi(e.target.value)}
          ></textarea>

          <label>
            Pertinent Past Medical History <i>*</i>
          </label>
          <textarea
            value={pmh}
            onChange={(e) => setPmh(e.target.value)}
          ></textarea>

          <label>
            Pertinent Review of Systems <i>*</i>
          </label>
          <textarea
            value={ros}
            onChange={(e) => setRos(e.target.value)}
          ></textarea>

          <label>
            Pertinent PE Findings <i>*</i>
          </label>
          <textarea
            value={pe}
            onChange={(e) => setPe(e.target.value)}
          ></textarea>

          <label>
            Working Impression <i>*</i>
          </label>
          <textarea
            value={wi}
            onChange={(e) => setWi(e.target.value)}
          ></textarea>

          <label>
            Initial Management Done <i>*</i>
          </label>
          <textarea
            value={imd}
            onChange={(e) => setImd(e.target.value)}
          ></textarea>

          <label>
            Pertinent Paraclinicals <i>*</i>
          </label>
          {paraclinical.name && (
            <div className="paraclinical-file-container">
              {paraclinical.name}
              <p onClick={() => setParaclinical({})}>
                <HiX />
              </p>
            </div>
          )}
          <button onClick={() => onBtnClick()} id="custom-file">
            <HiPlus /> <p>Add File</p>
          </button>
          <input
            ref={inputFileRef}
            type="file"
            className="input-file"
            onChange={(e) => {
              console.log(paraclinical.file);
              setParaclinical({
                name: e.target.files[0].name,
                file: e.target.files[0],
              });
            }}
          />

          <label>
            Reason for Referral <i>*</i>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>
        <div className="form-btns">
          <button onClick={() => clearForm()} className="clear-form-btn">
            Clear Form
          </button>
          <div>
            <button
              onClick={() => {
                setShowCase(false);
                clearForm();
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button onClick={() => handleSubmit()} className="save-btn">
              Save
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default NewCase;