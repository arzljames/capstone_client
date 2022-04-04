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

const OutgoingConsult = () => {
  const { cases, user, toast } = useAuth();

  return (
    <>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutgoingConsult;
