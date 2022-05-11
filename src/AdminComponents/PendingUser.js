import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PendingUser.css";
import {
  HiDotsVertical,
  HiOutlineLink,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";
import api from "../API/Api";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    document.addEventListener("scroll", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
      document.removeEventListener("scroll", maybeHandler);
    };
  });

  return domNode;
};

const PendingUser = ({
  firstname,
  email,
  picture,
  id,
  setToast,
  setMessage,
  setIsError,
  setModal,
  handleId,
}) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState("");

  let domNode = useClickOutside(() => {
    setDropdown(false);
  });

  const handleVerify = async () => {
    try {
      let response = await api.post(`/api/auth/verify/${id}`, {
        email,
        id,
      });

      if (response.data.ok) {
        setMessage("Email verification link sent.");
        setIsError(false);
        setToast(true);
        setDropdown(false);
        setTimeout(() => {
          setToast(false);
          setMessage("");
        }, 10000);
      } else {
        setMessage("There's a problem sending the email verification link.");
        setIsError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
          setMessage("");
        }, 10000);
      }
    } catch (error) {
      setMessage("There's a problem sending the email verification link.");
      setIsError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
        setMessage("");
      }, 10000);
    }
  };

  return (
    <div
      ref={domNode}
      className={dropdown ? "pending-user-card-active" : "pending-user-card"}
    >
      <div className="pending-user-profile-container">
        <div
          onClick={() => navigate(`/admin/people/${id}`)}
          className="pending-user-profile"
        >
          <img src={picture} alt="Avatar" />
        </div>
      </div>
      <div className="pending-user-name">
        <h5>{firstname}</h5>
        <p>{email}</p>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          setDropdown(!dropdown);
        }}
        className={
          dropdown ? "option-icon-container-active" : "option-icon-container"
        }
      >
        <HiDotsVertical />
        {dropdown && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="option-dropdown"
          >
            <ul>
              <li onClick={() => navigate(`/people/${id}`)}>
                <p>
                  <HiOutlineUser className="user-icon" />
                </p>
                View Profile
              </li>
              <li onClick={() => handleVerify()}>
                <p>
                  <HiOutlineLink className="check-icon" />
                </p>
                Send Verification Link
              </li>
              <li
                onClick={() => {
                  handleId(id);
                  setModal(true);
                  setDropdown(false);
                }}
                className="delete-request"
              >
                <p>
                  <HiOutlineTrash className="x-icon" />
                </p>
                Delete Request
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingUser;
