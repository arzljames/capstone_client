import React, { useState, useEffect } from "react";
import { HiDocumentDownload, HiFilter, HiChevronLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";
import { CSVLink } from "react-csv";
import { ResponsivePie } from "@nivo/pie";

const AdminGenerateReport = ({ setFilterModal }) => {
  const { patients, facilities, reports, cases, specializations } = useAuth();
  const [report, setReport] = useState([]);
  const [facility, setFacility] = useState("");
  const [specialization, setSpecialization] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fac = await api.get("/api/facility");

        if (fac.data && report.refer) {
          setFacility(
            fac.data.filter((e) => e._id === report.refer)[0].facility
          );
        }

        if (fac.data && report.specialization) {
          setSpecialization(
            fac.data
              .filter((e) => e._id === "623ec7fb80a6838424edaa29")
              .map((item) => {
                return item.specialization.filter(
                  (f) => f._id === report.specialization
                )[0];
              })[0].name
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [report]);

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

  const csvReport = {
    data: patients
      .filter(filterDate)
      .filter(filterGender)
      .filter(filterHospital)
      .filter(filterSpec)
      .filter(filterAge)
      .map((e) => {
        return {
          ...e,
          physician:
            "Dr. " + e.physician.firstname + " " + e.physician.lastname,
          guardian: e.guardian.name,
          birthday: getDate(e.birthday),
          address:
            e.address.street + " " + e.address.barangay + " " + e.address.city,
          updatedAt: getDate(e.updatedAt),
          createdAt: getDate(e.createdAt),
        };
      }),
    filename: `${reportId}.csv`,
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
        <AdminSidebar />
        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="above-patient-profile">
              <button onClick={() => navigate(-1)} className="back-btn">
                <HiChevronLeft /> <p>Back</p>
              </button>

              <div className="above-patient-profile-btns">
                {/* <button
                  onClick={() => setFilterModal(true)}
                  className="edit-filter"
                >
                  <p>
                    <HiFilter />
                  </p>
                  Edit Filter
                </button> */}

                <button className="green-cta">
                  <CSVLink className="link" {...csvReport}>
                    <p>
                      <HiDocumentDownload />
                    </p>
                    Export CSV
                  </CSVLink>
                </button>
              </div>
            </div>

            <div className="reports-container">
              <div className="report-table">
                <div className="report-table-header">
                  <div className="rpt-no">#</div>
                  <div className="rpt-name">Patient's Name</div>
                </div>
                {patients
                  .filter(filterDate)
                  .filter(filterGender)
                  .filter(filterHospital)
                  .filter(filterSpec)
                  .filter(filterAge)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          index % 2 === 0
                            ? "report-table-body"
                            : "report-table-body-2"
                        }
                      >
                        <div className="rpt-no">{index + 1}</div>
                        <div className="rpt-name">
                          {item.firstname +
                            " " +
                            item.middlename[0] +
                            "." +
                            " " +
                            item.lastname}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="reports-overview-container">
                <div className="rp-ov-1">
                  <h2>Report ID {reportId}</h2>

                  <h3>Filtered by:</h3>

                  <p>
                    Date range:{" "}
                    <label>
                      {report.from && report.to
                        ? `${getDate(report.from)} - ${getDate(report.to)}`
                        : "No date set"}
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
                <div style={{ maxHeight: "300px" }} className="rp-ov-1">
                  <h4>
                    {patients
                      .filter(filterDate)
                      .filter(filterGender)
                      .filter(filterHospital)
                      .filter(filterSpec)
                      .filter(filterAge).length > 1
                      ? "Filtered Patients: "
                      : "Filtered Patient: "}
                    {
                      patients
                        .filter(filterDate)
                        .filter(filterGender)
                        .filter(filterHospital)
                        .filter(filterSpec)
                        .filter(filterAge).length
                    }
                  </h4>
                  <ResponsivePie
                    data={[
                      {
                        id: "Filtered PT",
                        label: "Filtered PT",
                        value: patients
                          .filter(filterDate)
                          .filter(filterGender)
                          .filter(filterHospital)
                          .filter(filterSpec)
                          .filter(filterAge).length,
                        color: "hsl(51, 70%, 50%)",
                      },
                      {
                        id: "Total PT",
                        label: "Total PT",
                        value: patients.length,
                        color: "hsl(192, 70%, 50%)",
                      },
                    ]}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 2]],
                    }}
                    defs={[
                      {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                      },
                      {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                      },
                    ]}
                    fill={[
                      {
                        match: {
                          id: "ruby",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "c",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "go",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "python",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "scala",
                        },
                        id: "lines",
                      },
                      {
                        match: {
                          id: "lisp",
                        },
                        id: "lines",
                      },
                      {
                        match: {
                          id: "elixir",
                        },
                        id: "lines",
                      },
                      {
                        match: {
                          id: "javascript",
                        },
                        id: "lines",
                      },
                    ]}
                    legends={[
                      {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemTextColor: "#000",
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminGenerateReport;
