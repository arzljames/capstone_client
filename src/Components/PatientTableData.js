import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PatientTableData = ({
  patientState,
  setPatientState,
  term,
  usersPerPage,
  pagesVisited,
  sortAscDate,
  sortDscDate,
  sortAscName,
  sortDscName,
  sort,
  setPatientId,
  setPatientModal,
  filterPatient,
  setDeleteModal,
}) => {
  const navigate = useNavigate();
  const { cases } = useAuth();

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
      <div className="table">
        <div className="table-header">
          <div onClick={() => setDeleteModal(true)} className="pt-name">
            Patient Name
          </div>
          <div className="pt-active">Active Case</div>
          <div className="pt-total">Total Case</div>
          <div className="pt-date">Date Admitted</div>
        </div>
        {patientState.length !== 0
          ? patientState

              .filter((val) => {
                if (term === "") {
                  return val;
                } else if (
                  val.fullname.toLowerCase().includes(term.toLocaleLowerCase())
                ) {
                  return val;
                }
              })
              .sort(
                sort === "Newest"
                  ? sortDscDate
                  : sort === "Oldest"
                  ? sortAscDate
                  : sort === "Name (A-Z)"
                  ? sortAscName
                  : sortDscName
              )
              .slice(
                term === "" ? pagesVisited : 0,
                term === "" ? pagesVisited + usersPerPage : patientState.length
              )
              .map((item, key) => {
                return (
                  <div
                    key={key + 1}
                    onClick={() => {
                      setPatientModal(true);
                      setPatientId(item._id);
                      filterPatient(item._id);
                    }}
                    className="table-body"
                  >
                    {/* <div onClick={(e) => e.stopPropagation()} className="pt-no">
                    <input
                      onChange={(e) => {
                        let checked = e.target.checked;
                        setPatientState(
                          patientState.map((d) => {
                            if (item._id === d._id) {
                              d.select = checked;
                            }
                            return d;
                          })
                        );
                      }}
                      checked={item.select}
                      type="checkbox"
                    />
                  </div> */}
                    <div className="pt-name">
                      <p>{item.firstname + " " + item.lastname} </p>
                    </div>

                    <div className="pt-active">
                      {
                        cases.filter(
                          (f) => f.patient._id === item._id && f.active === true
                        ).length
                      }
                    </div>
                    <div className="pt-total">
                      {cases.filter((f) => f.patient._id === item._id).length}
                    </div>
                    <div className="pt-date">{getDate(item.createdAt)}</div>
                  </div>
                );
              })
          : // <div className="no-patients">
            //   <h1>No Patients</h1>
            //   <p>
            //     Looks like you don't have a patient to handle. Click the{" "}
            //     <em>add patient</em> button above to start adding patient.
            //   </p>
            // </div>
            null}
      </div>
    </>
  );
};

export default PatientTableData;
