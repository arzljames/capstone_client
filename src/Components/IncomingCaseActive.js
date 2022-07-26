import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcDocument } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";

//Component to show the list of incoming active cases
const IncomingCaseActive = ({ item, name }) => {
  const createdAt = new Date(item.createdAt);
  const navigate = useNavigate();
  const { specializations } = useAuth();
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const { facilities } = useAuth();

  const getDate = (date) => {
    let dates = new Date(date);
    let today =
      dates.toLocaleString("en-us", { month: "short" }) +
      " " +
      dates.getDate() +
      "," +
      " " +
      dates.getFullYear();

    return today;
  };
  return (
    <>
      <div
        onClick={() =>
          navigate(`/consultation/incoming/case/case-data/${item._id}`, {
            state: { item: item, name: name },
          })
        }
        className="case-content"
      >
        <div className="case-content-avatar">
          <FcDocument />
        </div>
        <div className="case-content-data">
          <h1>{item.patient.firstname + " " + item.patient.lastname}</h1>
          <p>
            
            Case ID #{item.caseId}
          </p>
          <p>  { specializations.filter((e) => {
                  return item.specialization.includes(e._id);
                })[0]?.specialization}</p>
          <div className="case-content-date">
            <p>{getDate(createdAt)}</p>
            <p>{createdAt.toLocaleString("en-US", options)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomingCaseActive;
