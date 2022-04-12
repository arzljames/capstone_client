import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import "./OutgoingConsult.css";
import Toast from "../Components/Toast";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import OutgoingCaseActive from "../Components/OutgoingCaseActive";
import { AnimatePresence } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import {Helmet} from 'react-helmet'

const OutgoingConsult = () => {
  const { cases, user, toast } = useAuth();

  return (
    <>
     <Helmet>
      <title>Outgoing Request | ZCMC Telemedicine</title>
    </Helmet>
      <div className="container">
        <AnimatePresence>{toast && <Toast />}</AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="admin-subheading">
                <div>
                  <h2>All Outgoing Requests</h2>
                  <p>
                    List of consultation request to other referring health
                    facilites.
                  </p>
                </div>
              </div>

              <div className="case-body">
                {cases
                  .filter(
                    (e) => e.physician._id === user.userId && e.active === true
                  )
                  .map((item, key) => {
                    return (
                      <OutgoingCaseActive
                        key={key + 1}
                        caseId={item._id}
                        item={item}
                      />
                    );
                  })}

                {cases.filter(
                  (e) => e.physician._id === user.userId && e.active === true
                ).length === 0 && (
                  <div className="no-active-cases">
                    <p>No current active consultation request.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutgoingConsult;
