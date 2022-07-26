import React from "react";
import "./FormMessage.css";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const promptVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

//Custom component for showing modal 
const FormMessage = ({ message, setPrompt }) => {
  return (
    <motion.div
      variants={promptVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="form-message-prompt"
    >
      <div onClick={() => setPrompt(false)}>
        <FaTimes />
      </div>
      <p>{message}</p>
    </motion.div>
  );
};

export default FormMessage;
