import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import useAuth from "../Hooks/useAuth";
import IncomingCaseActive from "../Components/IncomingCaseActive";
import { Helmet } from "react-helmet";

const IncomingConsult = () => {
  const { cases, user, toast } = useAuth();

  return (
    <>
      <Helmet>
        <title>Incoming Request | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div>
                <div className="container-heading">
                  <div>
                    <h2>All Incoming Requests</h2>
                    <p>
                      List of consultation request coming from other referring
                      hospitals.
                    </p>
                  </div>
                </div>

                <div className="case-body">
                  {cases
                    ?.filter(
                      (f) =>
                        (f.specialization.includes(user.specialization) &&
                          (f.active === "Active" || f.active === "Pending")) ||
                        (f.subSpecialization
                          .map((f) => f._id)
                          .includes(user.specialization) &&
                          (f.active === "Active" || f.active === "Pending"))
                    )
                    .map((item) => {
                      return <IncomingCaseActive item={item} name={"sds"} />;
                    })}

                  {cases.filter(
                    (e) =>
                      (e.specialization.includes(user.specialization) &&
                        (e.active === "Active" || e.active === "Pending")) ||
                      (e.subSpecialization
                        .map((e) => e._id)
                        .includes(user.specialization) &&
                        (e.active === "Active" || e.active === "Pending"))
                  ).length === 0 && (
                    <div className="no-active-cases">
                      <p>No incoming active consultation request.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomingConsult;
