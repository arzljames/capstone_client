import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";
import { HiUpload, HiOutlineTrash } from "react-icons/hi";
import NoUser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { socket } from "./Socket";


//Component for changing profile picture
const DpModal = ({ setDp, image, toast }) => {
  let domNode = useClickOutside(() => {
    setDp(false);
  });

  const { setAppState, user } = useAuth();
  const [loader, setLoader] = useState(false);

  const [picture, setPicture] = useState("");
  const [pictureFile, setPictureFile] = useState(null);

  useEffect(() => {
    setPicture(image);
  }, image);

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const changeProfile = () => {
    setLoader(true);
    try {
      setLoader(true);
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
          setLoader(false);

          let response = api.put(`/api/user/profile/${user.userId}`, {
            picture: data.url,
          });

          if (response) {
            socket.emit("chat");
            setLoader(false);
            setAppState("Change DP");
            setTimeout(() => setAppState(""));
            toast.success("Successfully changed profile picture.");
            setDp(false);
          } else {
            socket.emit("chat");
            setLoader(false);
            setAppState("Change DP");
            setTimeout(() => setAppState(""));
          }
        });
    } catch (error) {
      setLoader(false);
      setAppState("Change DP");
      setTimeout(() => setAppState(""));
      toast.error("Failed to change profile picture.");
    }
  };

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
        className="dp-modal"
      >
        <h1>Change Profile Picture</h1>
        <p>
          It will take some time to reflect profile changes across the system.
        </p>

        <div className="dp-picture">
          <input
            type="file"
            ref={inputFileRef}
            onChange={(e) => {
              setPicture(URL.createObjectURL(e.target.files[0]));
              setPictureFile(e.target.files[0]);
            }}
          />
          <img src={picture} alt="Profile Picture" />
          <div className="btns">
            <button onClick={() => onBtnClick()} className="upload">
              <p>
                <HiUpload />
              </p>{" "}
              Upload Picture
            </button>
            {/* <button onClick={() => setPicture(NoUser)} className="remove">
              <p>
                <HiOutlineTrash />
              </p>{" "}
              Remove Picture
            </button> */}
          </div>
        </div>

        <div className="dp-footer">
          <button onClick={() => setDp(false)} className="gray-cta">
            Cancel
          </button>
          <button
            onClick={() => changeProfile()}
            className={loader ? "green-cta-disable" : "green-cta"}
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DpModal;
