import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import "./IncomingConsult.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import useAuth from "../Hooks/useAuth";
import IncomingCaseActive from "../Components/IncomingCaseActive";
import { AnimatePresence } from "framer-motion";
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
              <div className="content-wrapper">
                <div className="container-heading">
                  <div>
                    <h2>All Incoming Requests</h2>
                    <p>
                      List of consultation request coming from other referring
                      health facilites.
                    </p>
                  </div>
                </div>

                <div className="case-body">
                  {cases
                    .filter(
                      (f) =>
                        f.specialization === user.specialization &&
                        f.active === true
                    )
                    .map((item) => {
                      return <IncomingCaseActive item={item} name={"sds"} />;
                    })}

                  {cases.filter(
                    (e) =>
                      e.specialization === user.specialization &&
                      e.active === true
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
