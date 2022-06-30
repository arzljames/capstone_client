import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FcDocument } from "react-icons/fc";

const OutgoingCaseActive = ({ caseId, item }) => {
  const createdAt = new Date(item.createdAt);
  const navigate = useNavigate();
  const { specializations } = useAuth();

  const { facilities } = useAuth();
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
        onClick={() => {
          navigate(`/consultation/outgoing/${item._id}`, {
            state: { item },
          });
        }}
        className="case-content"
      >
        <div className="case-content-avatar">
          <FcDocument />
        </div>
        <div className="case-content-data">
          <h1>{item.patient.firstname + " " + item.patient.lastname}</h1>
          <p>Case ID #{item.caseId}</p>
          <p>
            {item.specialization.length === 0
              ? null
              : specializations.filter((e) => {
                  return item.specialization.includes(e._id);
                })[0].specialization}
          </p>

          <div className="case-content-date">
            <p>{getDate(createdAt)} </p>
            <p>{getTime(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutgoingCaseActive;
