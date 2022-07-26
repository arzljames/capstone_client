import React from "react";
import "./InfoHover.css";
import { motion } from "framer-motion";

const hoverVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};


//Component to show profile when hover
const InfoHover = ({ message }) => {
  return (
    <motion.div
      variants={hoverVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="info-hover"
    >
      {message}
    </motion.div>
  );
};

export default InfoHover;
