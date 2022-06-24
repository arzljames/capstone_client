import React, { useEffect, useState } from "react";
import "./PendingUser.css";
import { formVariant, containerVariant } from "../Animations/Animations";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";

const PendingUserProfileModal = ({ setProfileModal, userData }) => {
  const domNode = useClickOutside(() => {
    setProfileModal(false);
  });
  const { facilities, toast } = useAuth();
  const [isClick, setIsClick] = useState(false);

  const [facility, setFacility] = useState([]);

  useEffect(() => {
    setFacility(facilities);
  }, [facilities]);

  const handleVerify = async () => {
    try {
      setIsClick(true);
      let response = await api.post(`/api/auth/verify/${userData._id}`, {
        email: userData.email,
        id: userData._id,
      });

      if (response.data.ok) {
        toast.success("Email verification link sent.");
        setIsClick(false);
        setProfileModal(false);
      } else {
        toast.error("There's a problem sending the email verification link.");
        setIsClick(false);
      }
    } catch (error) {
      toast.error("There's a problem sending the email verification link.");
      setIsClick(false);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, []);

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
    >
      <motion.div
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={domNode}
        className="pending-user-profile-modal"
      >
        <h1>User Profile</h1>
        <label>Last name</label>
        <input disabled value={userData.lastname} type="text" />

        <label>First name</label>
        <input disabled value={userData.firstname} type="text" />

        <label>Hospital</label>
        <input
          disabled
          value={
            facility.length === 0
              ? null
              : facility
                  .filter((e) => e._id === userData.designation)
                  .map((item) => {
                    return item.facility;
                  })
          }
          type="text"
        />

        <label>Specialization</label>
        {userData.designation === "623ec7fb80a6838424edaa29" ? (
          <input
            disabled
            value={userData.specialization.specialization}
            type="text"
          />
        ) : (
          <input disabled type="text" value="N/A (no specialization)" />
        )}

        <div className="popup-modal-btns">
          <button
            onClick={() => handleVerify()}
            className={isClick ? "gray-cta-disable" : "gray-cta"}
          >
            Send Verification
          </button>
          <button onClick={() => setProfileModal(false)} className="green-cta">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PendingUserProfileModal;
