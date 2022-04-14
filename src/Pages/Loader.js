import React from "react";
import "./Loader.css";
import { IoMedkitOutline } from "react-icons/io5";
import PulseLoader from "react-spinners/PulseLoader";
const Loader = () => {
  return (
    <div className="loader">
      <div className="consultation-logo">
        <IoMedkitOutline />
      </div>
      <PulseLoader size={7} margin={2} color="#058e46" speedMultiplier={0.5} />
    </div>
  );
};

export default Loader;
