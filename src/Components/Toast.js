import React, { useEffect } from "react";
import "./Toast.css";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { IoAlert, IoCheckmarkSharp } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";

const toastVariant = {
  hidden: {
    opacity: 0,
    x: "10%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Toast = () => {
  const { setToast, setMessage, message, isError, toast } = useAuth();

  let timer = setTimeout(() => {
    setMessage(null);
    setToast(null);
  }, 5000);

  useEffect(() => {
    clearTimeout(timer);
  }, [toast]);
  return (
    <motion.div
      variants={toastVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={isError ? "toast-error" : "toast"}
    >
      <span onClick={() => setToast(false)}>
        <HiX />
      </span>
      <div className={isError ? "toast-icon-error" : "toast-icon"}>
        {isError ? <IoAlert /> : <IoCheckmarkSharp />}
      </div>

      <div className="toast-message">
        <h5>{isError ? "Error" : "Success"}</h5>
        <p>{message}</p>
      </div>
    </motion.div>
  );
};

export default Toast;
