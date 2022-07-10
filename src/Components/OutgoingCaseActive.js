import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FcDocument } from "react-icons/fc";

const OutgoingCaseActive = ({ caseId, item }) => {
  const createdAt = new Date(item.createdAt);
  const navigate = useNavigate();
  const { specializations, facilities } = useAuth();

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
          <h1>
            {item.patient.lastname +
              "," +
              " " +
              item.patient.firstname +
              " " +
              item.patient.middlename[0] +
              "."}
          </h1>
          <p>
            {
              facilities.filter((e) => {
                return e._id === item.physician?.designation;
              })[0]?.facility
            }
          </p>
          <p>
            {
              specializations.filter((e) => {
                return item.specialization.includes(e._id);
              })[0]?.specialization
            }
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
