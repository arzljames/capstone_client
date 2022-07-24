import React, { useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import "./OutgoingConsult.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import OutgoingCaseActive from "../Components/OutgoingCaseActive";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";

const OutgoingConsult = () => {
  const { cases, user, followUp } = useAuth();

  return (
    <>
      <Helmet>
        <title>Outgoing Request | ZCMC Telemedicine</title>
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
                    <h2>All Outgoing Requests</h2>
                    <p>
                      List of consultation request to Zamboanga City Medical
                      Center.
                    </p>
                  </div>
                </div>

                <div className="case-body">
                  {cases
                    ?.filter(
                      (e) =>
                        e.physician._id === user?.userId && (e.active === 'Pending' || e.active === 'Active')
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
                    (e) =>  e.physician._id === user?.userId && (e.active === 'Pending' || e.active === 'Active')
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
      </div>
    </>
  );
};

export default OutgoingConsult;
