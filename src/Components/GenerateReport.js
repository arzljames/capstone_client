import React, { useState, useEffect } from "react";
import { HiDocumentDownload, HiFilter, HiChevronLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";

const GenerateReport = ({ setFilterModal }) => {
  const { patients, facilities, reports, specializations, cases } = useAuth();
  const [report, setReport] = useState([]);
  const [facility, setFacility] = useState("");

  const { id, reportId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setReport(reports.filter((e) => e._id === id)[0]);
  }, [reports]);

  const getDate = (date) => {
    let todate = new Date(date);
    let today =
      todate.toLocaleString("en-us", { month: "short" }) +
      " " +
      todate.getDate() +
      "," +
      " " +
      todate.getFullYear();

    return today;
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const filterGender = (e) => {
    if (report.gender) {
      return e.sex === report.gender;
    } else {
      return e;
    }
  };

  const getDates = (e) => {
    const dates = new Date(e);

    return dates;
  };

  const filterDate = (e) => {
    if (report.from && report.to) {
      return (
        getDates(e.createdAt) >= getDates(report.from) &&
        getDates(e.createdAt) <= getDates(report.to)
      );
    } else {
      return e;
    }
  };

  const filterAge = (e) => {
    if (report.minage || report.maxage) {
      return (
        getAge(e.birthday) <= report.maxage &&
        getAge(e.birthday) >= report.minage
      );
    } else {
      return e;
    }
  };

  const filterHospital = (e) => {
    if (report.refer) {
      return e.physician.designation === report.refer;
    } else {
      return e;
    }
  };

  const filterSpec = (e) => {
    if (report.specialization) {
      return cases.some((f) => {
        return (
          f.patient._id === e._id && f.specialization === report.specialization
        );
      });
    } else {
      return e;
    }
  };

  if (!report) {
    return (
      <div className="wait-spinner-container">
        <PulseLoader size={10} margin={2} color="#058e46" />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            <div className="above-patient-profile">
              <button onClick={() => navigate(-1)} className="back-btn">
                <HiChevronLeft /> <p>Back</p>
              </button>

              {/* <div className="above-patient-profile-btns">
                <button
                  onClick={() => setFilterModal(true)}
                  className="edit-filter"
                >
                  <p>
                    <HiFilter />
                  </p>
                  Edit Filter
                </button>
                <button className="export-csv">
                  <p>
                    <HiDocumentDownload />
                  </p>
                  Export to CSV
                </button>
              </div> */}
            </div>

            <div className="reports-container">
              <div className="table">
                <div className="table-header">
                  <div className="pt-name">Patient Name</div>
                  <div className="pt-date">Physician</div>
                  <div className="pt-hospital">Hospital</div>
                </div>{" "}
                {patients
                  .filter(filterDate)
                  .filter(filterGender)
                  .filter(filterHospital)
                  .filter(filterSpec)
                  .filter(filterAge)
                  .map((item, key) => {
                    return (
                      <div
                        key={key + 1}
                        className={
                          key % 2 === 0 ? "table-body" : "table-body-2"
                        }
                      >
                        <div className="pt-name">
                          {item.firstname + " " + item.lastname}{" "}
                        </div>
                        <div className="pt-date">
                          Dr.{" "}
                          {item.physician.firstname +
                            " " +
                            item.physician.lastname}
                        </div>
                        <div className="pt-hospital">
                          {
                            facilities.filter(
                              (e) => e._id === item.physician.designation
                            )[0].facility
                          }
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="reports-overview-container">
                <div className="rp-ov-1">
                  <h2>Report ID {reportId}</h2>

                  {!report.from &&
                  !report.to &&
                  !report.gender &&
                  !report.minage &&
                  !report.maxage &&
                  !report.refer &&
                  !report.specialization ? (
                    <h3>No filter options set. Showing all patients</h3>
                  ) : (
                    <h3>Filtered by:</h3>
                  )}

                  <p>
                    Date range:{" "}
                    <label>
                      ({!report.from ? "No date" : getDate(report.from)} -{" "}
                      {!report.to ? "No date" : getDate(report.to)}){" "}
                    </label>
                  </p>

                  <p>
                    Sex:
                    <label>
                      {" "}
                      {!report.gender ? "Not set" : report.gender}
                    </label>{" "}
                  </p>

                  <p>
                    Age bracket:{" "}
                    <label>
                      {!report.minage && !report.maxage
                        ? "Not set"
                        : `${report.minage} - ${report.maxage} yrs old`}
                    </label>
                  </p>

                  <p>
                    Referring Hospital:
                    <label>
                      {" "}
                      {!report.refer
                        ? "Not set"
                        : facilities.filter((e) => e._id === report.refer)[0]
                            .facility}
                    </label>
                  </p>

                  <p>
                    Specialization:{" "}
                    <label>
                      {!report.specialization
                        ? "Not set"
                        : specializations.filter(
                            (e) => e._id === report.specialization
                          )[0].specialization}
                    </label>
                  </p>
                </div>
                <div className="rp-ov-1">
                  <h4>
                    Total Patients:{" "}
                    {
                      patients
                        .filter(filterDate)
                        .filter(filterGender)
                        .filter(filterHospital)
                        .filter(filterSpec)
                        .filter(filterAge).length
                    }
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateReport;
