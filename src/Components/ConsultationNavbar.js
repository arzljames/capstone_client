import React, { useEffect } from "react";
import "../Pages/Homepage.css";
import {
  IoMedkitOutline,
  IoFitnessOutline,
  IoPeople,
  IoFitness,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiOutlineUsers, HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";
import useAuth from "../Hooks/useAuth";

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
              <IoPeople />
            </p>
            Patients
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
            <IoFitness />
          </p>
          Consultation Case
        </li>
        {user.designation !== "623ec7fb80a6838424edaa29" && (
          <li
            onClick={() => navigate("/consultation/outgoing")}
            className={
              path.includes("outgoing".toLowerCase()) ? "active-nav" : null
            }
          >
            <p>
              <HiArrowSmUp />
            </p>
            Outgoing Request
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
              <HiArrowSmDown />
            </p>
            Incoming Request
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
