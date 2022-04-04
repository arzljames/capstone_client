import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcDocument } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";

const IncomingCaseActive = ({ item, name }) => {
  const createdAt = new Date(item.createdAt)
  const navigate = useNavigate();
  var options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const { user } = useAuth();
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

          <p>{item.designation.facility}</p>
          <div className="case-content-date">
            <p>{createdAt.toISOString().substring(0, 10)} </p>
            <p>{createdAt.toLocaleString("en-US", options)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomingCaseActive;
