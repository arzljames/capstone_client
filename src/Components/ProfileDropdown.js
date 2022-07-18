import React, { useState, useEffect, useRef } from "react";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoExitOutline,
  IoBookOutline,
} from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import { HiCamera, HiCode } from "react-icons/hi";
import { useClickOutside } from "../Hooks/useClickOutside";
import { socket } from "./Socket";
import api from "../API/Api";
import PulseLoader from "react-spinners/PulseLoader";
import ProfileModal from "./ProfileModal";
import { AnimatePresence } from "framer-motion";
import DpModal from "./DpModal";
import { ToastContainer, toast } from "react-toastify";
import LogoutModal from "./LogoutModal";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  submitLogout,
  users,
  profilePicture,
  setDropdown2,
}) => {
  const navigate = useNavigate();
  const { user, facilities, cases, patients, specializations } = useAuth();
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

  const [specc, setSpecc] = useState("");
  const [desig, setDesig] = useState("");
  const [totalPt, setTotalPt] = useState(0);
  const [totalCs, setTotalCs] = useState(0);

  useEffect(() => {
    const fetchSpecc = async () => {
      try {
        let response = await specializations.filter(
          (e) => e._id === user.specialization
        );

        if (response) {
          setSpecc(response[0].specialization);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDesig = async () => {
      try {
        let response = await facilities.filter(
          (id) => id._id === user.designation
        )[0].facility;

        if (response) {
          setDesig(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalPt = async () => {
      try {
        let response = await patients.filter(
          (e) => e.physician._id === user.userId
        );

        if (response) {
          setTotalPt(response.length);
        }
      } catch (error) {}
    };

    const fetchTotalCs = async () => {
      try {
        let response = await cases.filter(
          (id) => id.physician._id === user.userId
        );

        if (response) {
          setTotalCs(response.length);
        }
      } catch (error) {}
    };

    fetchTotalPt();
    fetchTotalCs();
    fetchDesig();
    fetchSpecc();
  }, [patients, cases]);

  const [profileModal, setProfileModal] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      {loader && (
        <div className="modal-container">
          <PulseLoader size={10} margin={4} color="#fff" />
        </div>
      )}

      <AnimatePresence>
        {profileModal && (
          <ProfileModal
            image={!users.picture ? NoUser : users.picture}
            setProfileModal={setProfileModal}
            users={users}
            specc={specc}
            desig={desig}
            totalCs={totalCs}
            totalPt={totalPt}
          />
        )}
        {logout && (
          <LogoutModal setLogout={setLogout} submitLogout={submitLogout} />
        )}
        {dp && (
          <DpModal
            image={!users.picture ? NoUser : users.picture}
            setDp={setDp}
            toast={toast}
          />
        )}
      </AnimatePresence>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
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
            
            {user?.specialization === null ? null : <p style={{marginBottom: '0px'}}>{specc}</p>}
            <p>{desig}</p>

            
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

          {/* <li onClick={() => navigate("/user-manual/guide/introduction")}>
            <p>
              <IoBookOutline />
            </p>
            Documentation
          </li> */}

          <li
            onClick={() => {
              window.open("/team", "_blank");
            }}
          >
            <p>
              <HiCode />
            </p>
            Credits
          </li>
        </ul>
        <ul style={{ border: "none" }}>
          <li onClick={() => setLogout(true)}>
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
