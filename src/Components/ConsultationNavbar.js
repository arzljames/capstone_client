import React, { useEffect } from "react";
import "../Pages/Homepage.css";
import { IoMedkitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FcConferenceCall, FcUpload, FcFile, FcDownload } from "react-icons/fc";

//Component navigation bar for case module
const ConsultationNavbar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
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
        {user !== null && user.designation !== "623ec7fb80a6838424edaa29" ? (
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
        ) : null}

        {/* <li
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
          <span> Consultation Case </span>{" "}
          {cases?.filter(
            (e) =>
              (e.specialization.includes(user.specialization) &&
                e.active === "Pending") ||
              (e.subSpecialization
                .map((f) => f._id)
                .includes(user.specialization) &&
                e.active === "Pending")
          ).length === 0 ? null : (
            <div>
              {
                cases?.filter(
                  (e) =>
                    (e.specialization.includes(user.specialization) &&
                      e.active === "Pending") ||
                    (e.subSpecialization
                      .map((f) => f._id)
                      .includes(user.specialization) &&
                      e.active === "Pending")
                ).length
              }
            </div>
          )}
        </li> */}

        {user !== null && user.designation !== "623ec7fb80a6838424edaa29" ? (
          <li
            onClick={() => navigate("/consultation/case")}
            className={
              path.includes("case".toLowerCase()) ? "active-nav" : null
            }
          >
            <p>
              <FcFile />
            </p>
            <span>Consultation Case</span>

            {cases?.filter(
              (e) => e.physician._id === user?.userId && e.active === "Pending"
            ).length === 0 ? null : (
              <div>
                {
                  cases?.filter(
                    (e) =>
                      e.physician._id === user?.userId && e.active === "Pending"
                  ).length
                }
              </div>
            )}
          </li>
        ) : null}
        {user !== null && user?.designation === "623ec7fb80a6838424edaa29" ? (
          <li
            onClick={() => navigate("/consultation/case")}
            className={
              path.includes("case".toLowerCase()) ? "active-nav" : null
            }
          >
            <p>
              <FcFile />
            </p>
            <span>Consultation Case</span>

            {cases?.filter(
              (e) =>
                (e.specialization.includes(user.specialization) &&
                  e.active === "Pending") ||
                (e.subSpecialization
                  .map((f) => f._id)
                  .includes(user.specialization) &&
                  e.active === "Pending")
            ).length === 0 ? null : (
              <div>
                {
                  cases?.filter(
                    (e) =>
                      (e.specialization.includes(user.specialization) &&
                        e.active === "Pending") ||
                      (e.subSpecialization
                        .map((f) => f._id)
                        .includes(user.specialization) &&
                        e.active === "Pending")
                  ).length
                }
              </div>
            )}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default ConsultationNavbar;
