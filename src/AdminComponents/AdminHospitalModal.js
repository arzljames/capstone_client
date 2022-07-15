import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";
import { HiUpload } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { IoBusinessOutline } from "react-icons/io5";

const AdminHospitalModal = ({ setShowHospitalModal, hospital, pictures }) => {
  const { setAppState, appState, facilities, toast } = useAuth();
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

  // const handleSubmit = async () => {
  //   setIsClick(true);
  //   setAppState("Updaing Lists");
  //   let response = await api.put(`/api/facility/update/${hospital._id}`, {
  //     name,
  //     street,
  //     city,
  //     barangay,
  //   });

  //   if (response.data.err) {
  //     toast.error("Please input the name of hospital");
  //   } else {
  //     setShowHospitalModal(false);
  //     setAppState("updated");
  //     setTimeout(() => setAppState(""), 500);
  //     toast.success("Successfully updated hospital");
  //   }
  // };

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
          const response = api.put(`/api/facility/update/${hospital._id}`, {
            name,
            street,
            city,
            barangay,
            picture: data.url,
          });

          if (response) {
            setShowHospitalModal(false);
            setIsClick(false);
            setAppState("hospital updated");
            setTimeout(() => setAppState(""), 500);
            toast.success("Successfully updated hospital");
          }
        });
    } catch (error) {
      setAppState("error occure");
      setTimeout(() => setAppState(""), 500);
      setIsClick(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setName(hospital.facility);
    setBarangay(hospital.address.barangay);
    setStreet(hospital.address.street);
    setCity(hospital.address.city);

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

  useEffect(() => {
    setPicture(pictures);
  }, []);

  return (
    <>
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
        >
          <div className="form-header">
            <h1>Update Hospital</h1>
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
                {!pictures && !picture ? (
                  <p>
                    <IoBusinessOutline />
                  </p>
                ) : (
                  <img src={picture} alt="Hospital Picture" />
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
