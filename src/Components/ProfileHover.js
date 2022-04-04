import React from "react";
import "./ProfileHover.css";
import { motion } from "framer-motion";

const hoverVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
  },
};

const ProfileHover = () => {
  return (
    <motion.div
      variants={hoverVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="profile-hover"
    >
      .profile-hover-profile
    </motion.div>
  );
};

export default ProfileHover;
