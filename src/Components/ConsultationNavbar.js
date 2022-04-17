import React, { useEffect } from "react";
import "../Pages/Homepage.css";
import { IoMedkitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FcConferenceCall, FcUpload, FcFile, FcDownload } from "react-icons/fc";

const ConsultationNavbar = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  const { patients, user, cases } = useAuth();

  return (
    <div className="consultation-nav">
      <div className="consultation-nav-header">
        <div className="consultation-logo">
          <IoMedkitOutline />
        </div>
        <h1>Consultation</h1>
      </div>

      <ul>
        {user.designation !== "623ec7fb80a6838424edaa29" && (
          <li
            onClick={() => navigate("/consultation/patients")}
            className={
              path.includes(
                "patients/case".toLowerCase() && "patients".toLowerCase()
              )
                ? "active-nav"
                : null
            }
          >
            <p>
              <FcConferenceCall />
            </p>
            <span> Patients</span>
          </li>
        )}
        <li
          onClick={() => navigate("/consultation/case")}
          className={
            path.includes("case/case-data".toLowerCase() && "consultation/case")
              ? "active-nav"
              : null
          }
        >
          <p>
            <FcFile />
          </p>
          <span> Consultation Case</span>
        </li>
        {user.designation !== "623ec7fb80a6838424edaa29" && (
          <li
            onClick={() => navigate("/consultation/outgoing")}
            className={
              path.includes("outgoing".toLowerCase()) ? "active-nav" : null
            }
          >
            <p>
              <FcUpload />
            </p>
            <span>Outgoing Request</span>
            {cases.filter(
              (e) => e.physician._id === user.userId && e.active === true
            ).length === 0 ? null : (
              <div>
                {
                  cases.filter(
                    (e) => e.physician._id === user.userId && e.active === true
                  ).length
                }
              </div>
            )}
          </li>
        )}
        {user.designation === "623ec7fb80a6838424edaa29" && (
          <li
            onClick={() => navigate("/consultation/incoming")}
            className={
              path.includes("incoming".toLowerCase()) ? "active-nav" : null
            }
          >
            <p>
              <FcDownload />
            </p>
            <spn>Incoming Request</spn>
            {cases.filter(
              (e) =>
                e.specialization === user.specialization && e.active === true
            ).length === 0 ? null : (
              <div>
                {
                  cases.filter(
                    (e) =>
                      e.specialization === user.specialization &&
                      e.active === true
                  ).length
                }
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ConsultationNavbar;
