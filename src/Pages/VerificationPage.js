import React, { useEffect, useState } from "react";
import "./VerificationPage.css";
import { motion } from "framer-motion";
import {
  useNavigate,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Verified from "../Assets/Verified.svg";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const VerificationPage = () => {
  const [loader, setLoader] = useState(true);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const handleVerification = async () => {
      let response = await api.put(`/api/user/verify/${id}`);

      if (response.data.err) {
        setVerified(true);
      } else if (response.data.already) {
        setLoader(false);
        setMessage("Your account is already activated.");
      } else {
        setLoader(false);
        setMessage("Account Activated!");
      }
    };

    handleVerification();
  }, []);
  return (
    <>
      {verified && <Navigate to="/login" state={{ from: location }} replace />}
      <div className="verification-page">
        <img src={Verified} alt="Verified Icon" />
        <p>{message}</p>
        <motion.button
          onClick={() => navigate("/login")}
          whileTap={{ scale: 0.9 }}
        >
          Proceed to Sign In
          <HiOutlineArrowNarrowRight id="proceed-login-arrow" />
        </motion.button>
      </div>
    </>
  );
};

export default VerificationPage;
