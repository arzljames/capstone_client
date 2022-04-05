import React, { useState, useEffect, useRef } from "react";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoCodeSlash,
  IoExitOutline,
  IoBookOutline,
} from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import {
  HiOutlineChevronDown,
  HiCheck,
  HiOutlineClock,
  HiOutlineX,
  HiPencil,
} from "react-icons/hi";
import { useClickOutside } from "../Hooks/useClickOutside";
import { socket } from "./Socket";
import api from "../API/Api";
import PulseLoader from "react-spinners/PulseLoader";

const ProfileDropdown = ({ submitLogout, users, profilePicture }) => {
  const { user, facilities } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  let domNode = useClickOutside(() => {
    setDropdown(false);
  });

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const [loader, setLoader] = useState(false);

  const changeProfile = async (e) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("file", e);
      formData.append("upload_preset", "qn8bbwmc");
      formData.append("cloud_name", "ojttelemedicine");
      fetch("https://api.cloudinary.com/v1_1/ojttelemedicine/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);
          api
            .put(`/api/user/profile/${user.userId}`, {
              picture: data.url,
            })
            .then((response) => {
              socket.emit("chat");
              setLoader(false);
            });
        });
    } catch (error) {
      setLoader(false);
    }
  };

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

  return (
    <>
      {loader && (
        <div className="modal-container">
          <PulseLoader size={10} margin={4} color="#fff" />
        </div>
      )}
      <div className="profile-container-dropdown">
        <div className="profile-name-picture">
          <div className="profile-name-picture-container">
            <span onClick={() => onBtnClick()}>
              <HiPencil />
            </span>
            <input
              value={profilePicture}
              type="file"
              ref={inputFileRef}
              onChange={(e) => changeProfile(e.target.files[0])}
            />
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
          <li>
            <p>
              <IoPersonOutline />
            </p>
            View Profile
          </li>
          <li>
            <p>
              <IoSettingsOutline />
            </p>
            Account Settings
          </li>
          <li>
            <p>
              <IoBookOutline />
            </p>
            About
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
