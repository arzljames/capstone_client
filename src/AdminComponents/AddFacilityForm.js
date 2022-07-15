import React, { useState, useRef } from "react";
import "./AddFacilityForm.css";
import { motion } from "framer-motion";
import { HiUpload } from "react-icons/hi";
import InfoHover from "../Components/InfoHover";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import { IoBusinessOutline } from "react-icons/io5";

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

const AddFacilityForm = ({ setShowModal, pictures }) => {
  const [isClick, setIsClick] = useState(false);
  const { setAppState, toast } = useAuth();
  const [showHover, setShowHover] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [specializations, setSpecializations] = useState([]);

  const [picture, setPicture] = useState("");
  const [pictureFile, setPictureFile] = useState("");

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const handleSubmit = async () => {
    if (!name) {
      setAppState("error occure");
      setTimeout(() => setAppState(""), 500);
      setIsClick(false);
      toast.error("Please input the name of hospital");
      return;
    }
    setIsClick(true);
    setAppState("Updating Lists");
    try {
      const formData = new FormData();
      formData.append("file", pictureFile);
      formData.append("upload_preset", "qn8bbwmc");
      formData.append("cloud_name", "ojttelemedicine");

      fetch("https://api.cloudinary.com/v1_1/ojttelemedicine/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const response = api.post("/api/facility/add", {
            name,
            street,
            city,
            barangay,
            picture: data.url,
          });

          if (response) {
            setShowModal(false);
            setIsClick(false);
            setAppState("hospital added");
            setTimeout(() => setAppState(""), 500);
            toast.success("Successfully added hospital");
          }
        });
    } catch (error) {
      setAppState("error occure");
      setTimeout(() => setAppState(""), 500);
      setIsClick(false);
      toast.error(error.message);
    }
  };

  const domNode = useClickOutside(() => {
    setShowModal(false);
  });

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
        className="form"
        ref={domNode}
      >
        <div className="form-header">
          <h1>Add Hospital</h1> 
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

          <label>Hospital Picture</label>
          <div className="hospital-dp">
            <input
              type="file"
              ref={inputFileRef}
              onChange={(e) => {
                setPicture(URL.createObjectURL(e.target.files[0]));
                setPictureFile(e.target.files[0]);
              }}

         
            />
            <div className="img-container">
              {!picture && !pictures ? (
                <p>
                  <IoBusinessOutline />
                </p>
              ) : (
                <img src={ pictures} alt="" />
              )}
            </div>
            <button onClick={() => onBtnClick()} className="upload-btn">
              <p>
                <HiUpload />
              </p>
              Upload Picture
            </button>
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
