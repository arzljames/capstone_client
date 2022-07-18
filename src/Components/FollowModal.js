import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { containerVariant, formVariant } from "../Animations/Animations";
import { HiPlus, HiX } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { socket } from "./Socket";

const FollowModal = ({ setFollowModal, toast, id }) => {
  const [isClick, setIsClick] = useState(false);

  const [temperature, setTemperature] = useState("");
  const [respiratory, setRespiratory] = useState("");
  const [heart, setHeart] = useState("");
  const [blood, setBlood] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [cc, setCc] = useState("");
  const [hpi, setHpi] = useState("");
  const [pmh, setPmh] = useState("");
  const [ros, setRos] = useState("");
  const [pe, setPe] = useState("");
  const [paraclinical, setParaclinical] = useState({});
  const [wi, setWi] = useState("");
  const [imd, setImd] = useState("");

  const { setAppState } = useAuth();

  const [todate, setTodate] = useState(new Date());

  const inputFileRef = useRef(null);
  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const updateSocket = () => {
    socket.emit("notif");
  };

  const handleSubmit = async () => {
    setIsClick(true);
    try {
      if (
        !temperature &&
        !respiratory &&
        !heart &&
        !blood &&
        !oxygen &&
        !weight &&
        !height &&
        !cc &&
        !hpi &&
        !pmh &&
        !ros &&
        !pe &&
        !wi &&
        !imd
      ) {
        toast.error("All fields cannot be empty");
        setIsClick(false);

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
              .put(`/api/patient/follow-up/${id}`, {
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
                todate,
              })
              .then((result) => {
                if (result) {
                  updateSocket();
                  setAppState(result.data.ok);
                  setTimeout(() => {
                    setAppState("");
                  }, 5000);
                  clearForm();
                  toast.success("Added follow up");
                  setAppState(result.data.ok);
                  setFollowModal(false);
                } else {
                  toast.error("Request failed with status code 404");
                  setIsClick(false);
                }
              });
          });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      setIsClick(false);
    }
  };

  const clearForm = () => {};
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
      onSubmit={(e) => e.preventDefault()}
    >
      <motion.form
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="form overflow"
      >
        <div className="form-header">
          <h1>Follow up</h1>
          <p onClick={() => setFollowModal(false)}>
            <HiX />
          </p>
        </div>
        <div className="form-body">
          <div className="divider-container">
            <div className="divider">
              <label>Date of Follow up</label>
              <input
                style={{ minHeight: "40px" }}
                value={todate}
                onChange={(e) => setTodate(e.target.value)}
                type="date"
              />
            </div>

            <div className="divider">
              <label>
                Temperature (°C) <i>*</i>
              </label>
              <input
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <div className="divider-container">
            <div className="divider">
              <label>
                Respiratory Rate <i>*</i>
              </label>
              <input
                value={respiratory}
                onChange={(e) => setRespiratory(e.target.value)}
                type="text"
              />
            </div>

            <div className="divider">
              <label>
                Heart Rate <i>*</i>
              </label>
              <input
                value={heart}
                onChange={(e) => setHeart(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <div className="divider-container">
            <div className="divider">
              <label>
                Blood Pressure <i>*</i>
              </label>
              <input
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
                type="text"
              />
            </div>

            <div className="divider">
              <label>
                Oxygen Saturation <i>*</i>
              </label>
              <input
                value={oxygen}
                onChange={(e) => setOxygen(e.target.value)}
                type="text"
              />
            </div>
          </div>

          <div className="divider-container">
            <div className="divider">
              <label>
                Weight (KG) <i>*</i>
              </label>
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
              />
            </div>

            <div className="divider">
              <label>
                Height (CM) <i>*</i>
              </label>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                type="number"
              />
            </div>
          </div>

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

          <label>Pertinent Paraclinicals</label>
          {paraclinical.name && (
            <div className="paraclinical-file-container">
              {paraclinical.name}
              <p onClick={() => setParaclinical({})}>
                <HiX />
              </p>
            </div>
          )}
          {!paraclinical.name && (
            <button onClick={() => onBtnClick()} id="custom-file">
              <HiPlus /> <p>Add File</p>
            </button>
          )}
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
        </div>
        <div className="form-btns">
          <button onClick={() => clearForm()} className="clear-form-btn">
            Clear Form
          </button>
          <div>
            <button
              onClick={() => {
                setFollowModal(false);
                clearForm();
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className={isClick ? "save-btn-disable" : "save-btn"}
            >
              Submit
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default FollowModal;
