import React, { useState, useEffect, useRef } from "react";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoExitOutline,
  IoBookOutline,
} from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import { HiCamera } from "react-icons/hi";
import { useClickOutside } from "../Hooks/useClickOutside";
import { socket } from "./Socket";
import api from "../API/Api";
import PulseLoader from "react-spinners/PulseLoader";
import ProfileModal from "./ProfileModal";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DpModal from "./DpModal";

const ProfileDropdown = ({
  submitLogout,
  users,
  profilePicture,
  setDropdown2,
}) => {
  const { user, facilities, setAppState, setToast, setIsError, setMessage } =
    useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [dp, setDp] = useState(false);

  let domNode = useClickOutside(() => {
    setDropdown(false);
  });

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [specc, setSpecc] = useState("");

  useEffect(() => {
    const fetchSpecc = async () => {
      try {
        let response = await facilities
          .filter((id) => id._id === user.designation)[0]
          .specialization.filter((e) => e._id === user.specialization)[0].name;

        if (response) {
          setSpecc(response);
        }
      } catch (error) {}
    };

    fetchSpecc();
  }, []);

  const [profileModal, setProfileModal] = useState(false);

  return (
    <>
      {loader && (
        <div className="modal-container">
          <PulseLoader size={10} margin={4} color="#fff" />
        </div>
      )}

      <AnimatePresence>
        {profileModal && <ProfileModal setProfileModal={setProfileModal} />}
        {dp && (
          <DpModal
            image={!users.picture ? NoUser : users.picture}
            setDp={setDp}
          />
        )}
      </AnimatePresence>
      <div className="profile-container-dropdown">
        <div className="profile-name-picture">
          <div className="profile-name-picture-container">
            <span
              onClick={() => {
                setDp(true);
              }}
            >
              <HiCamera />
            </span>
            <input value={profilePicture} type="file" ref={inputFileRef} />
            <img src={!users.picture ? NoUser : users.picture} alt="Avatar" />
            <div
              className={
                users.activeStatus === "Online"
                  ? "status-online"
                  : "status-offline"
              }
            ></div>
          </div>
          <div className="text-wrapper">
            <h5>
              {user.firstname} {user.lastname}
            </h5>
            <p>{specc ? specc : null}</p>
            <p className="p-active-status">
              Active Status: <span>{users.activeStatus}</span>
            </p>
          </div>
        </div>
        <ul>
          <li onClick={() => setProfileModal(true)}>
            <p>
              <IoPersonOutline />
            </p>
            View Profile
          </li>
          <li onClick={() => navigate("/settings/account")}>
            <p>
              <IoSettingsOutline />
            </p>
            Account Settings
          </li>
          <li onClick={() => navigate("/user-manual")}>
            <p>
              <IoBookOutline />
            </p>
            User Manual
          </li>
        </ul>
        <ul style={{ border: "none" }}>
          <li onClick={() => submitLogout()}>
            <p>
              <IoExitOutline />
            </p>
            Sign Out
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileDropdown;
