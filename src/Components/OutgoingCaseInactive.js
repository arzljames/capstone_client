import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FcDocument } from "react-icons/fc";

const OutgoingCaseInactive = ({ item, name, patientId }) => {
  const createdAt = new Date(item.createdAt);
  const navigate = useNavigate();
  const getDate = (date) => {
    let today =
      date.toLocaleString("en-us", { month: "short" }) +
      " " +
      createdAt.getDate() +
      "," +
      " " +
      createdAt.getFullYear();

    return today;
  };

  const getTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  return (
    <>
      <div
        onClick={() =>
          navigate(`/consultation/patients/case/case-data/${item._id}`, {
            state: { item: item, name: name, patientId: patientId },
          })
        }
        className="case-content case-content-disable"
      >
        <div className="case-content-avatar">
          <FcDocument />
        </div>
        <div className="case-content-data">
          <h1>Patient Name: {item.patient.firstname}</h1>
          {/* <p>
            To: Dr.{" "}
            {item.referralPhysician.firstname +
              " " +
              item.referralPhysician.lastname}{" "}
            &#8212; {item.referralPhysician.specialization}
          </p> */}
        </div>
        <div className="case-content-date">
          <p>{getDate(createdAt)} </p>
          <p>{getTime(createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export default OutgoingCaseInactive;
