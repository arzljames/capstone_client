import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import "./AdminDashboard.css";
import AdminHeader from "../AdminComponents/AdminHeader";
import StatisticCard from "../AdminComponents/StatisticCard";
import PendingUser from "../AdminComponents/PendingUser";
import useAuth from "../Hooks/useAuth";
import { HiOfficeBuilding } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import DeletePendingUserModal from "../AdminComponents/DeletePendingUserModal";
import { FiUserX } from "react-icons/fi";
import NoUser from "../Assets/nouser.png";
import { Helmet } from "react-helmet";
import { IoPeople, IoMedkit } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import PendingUserProfileModal from "../AdminComponents/PendingUserProfileModal";
import SpecializationChart from "../Components/SpecializationChart";
import { ResponsivePie } from "@nivo/pie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const {
    pending,
    facilities,
    listUsers,
    patients,
    cases,
    toast,
    ToastContainer,
    specializations,
    setSpecializations,
  } = useAuth();
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  const [profileModal, setProfileModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");

  const handleId = (id) => {
    setUserId(id);
  };

  const today = new Date();

  const [time, setTime] = useState("");
  const [day, setDay] = useState("");

  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  useEffect(() => {
    setDay(
      today.toLocaleString("en-us", { month: "short" }) + " " + today.getDate()
    );

    setTime(today.toLocaleString("en-US", options));
  }, [today]);

  const [months, setMonths] = useState(null);
  const [monthsCase, setMonthsCase] = useState(null);

  const year = [];

  for (let i = 1; i < 100; i++) {
    year.push(1999 + i);
  }

  useEffect(() => {
    function extract() {
      const groups = {};
      patients
        .filter((e) => yearSelected === parseInt(e.createdAt.substring(0, 4)))
        .map(function (val) {
          const dates = new Date(val.createdAt);
          const date = dates.toLocaleString("en-us", { month: "short" });
          if (date in groups) {
            groups[date].push(val._id);
          } else {
            groups[date] = new Array(val._id);
          }
        });

      setMonths(groups);
      return groups;
    }

    function extractCase() {
      const groups = {};
      cases
        .filter((e) => yearSelected === parseInt(e.createdAt.substring(0, 4)))
        .forEach(function (val) {
          const dates = new Date(val.createdAt);
          const date = dates.toLocaleString("en-us", { month: "short" });
          if (date in groups) {
            groups[date].push(val._id);
          } else {
            groups[date] = new Array(val._id);
          }
        });

      setMonthsCase(groups);
      return groups;
    }

    extract();
    extractCase();
  }, [patients, cases, yearSelected]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Patients",
        data: [
          months === null ? 0 : months.Jan ? months.Jan.length : 0,
          months === null ? 0 : months.Feb ? months.Feb.length : 0,
          months === null ? 0 : months.Mar ? months.Mar.length : 0,
          months === null ? 0 : months.Apr ? months.Apr.length : 0,
          months === null ? 0 : months.May ? months.May.length : 0,
          months === null ? 0 : months.Jun ? months.Jun.length : 0,
          months === null ? 0 : months.Jul ? months.Jul.length : 0,
          months === null ? 0 : months.Aug ? months.Aug.length : 0,
          months === null ? 0 : months.Sep ? months.Sep.length : 0,
          months === null ? 0 : months.Oct ? months.Oct.length : 0,
          months === null ? 0 : months.Nov ? months.Nov.length : 0,
          months === null ? 0 : months.Dec ? months.Dec.length : 0,
        ],
        borderColor: "#FF959E",
        backgroundColor: "#FFE2E4",
        borderWidth: 2,
        spanGaps: true,
        showLine: true,
      },
      {
        label: "Cases",
        data: [
          monthsCase === null ? 0 : monthsCase.Jan ? monthsCase.Jan.length : 0,
          monthsCase === null ? 0 : monthsCase.Feb ? monthsCase.Feb.length : 0,
          monthsCase === null ? 0 : monthsCase.Mar ? monthsCase.Mar.length : 0,
          monthsCase === null ? 0 : monthsCase.Apr ? monthsCase.Apr.length : 0,
          monthsCase === null ? 0 : monthsCase.May ? monthsCase.May.length : 0,
          monthsCase === null ? 0 : monthsCase.Jun ? monthsCase.Jun.length : 0,
          monthsCase === null ? 0 : monthsCase.Jul ? monthsCase.Jul.length : 0,
          monthsCase === null ? 0 : monthsCase.Aug ? monthsCase.Aug.length : 0,
          monthsCase === null ? 0 : monthsCase.Sep ? monthsCase.Sep.length : 0,
          monthsCase === null ? 0 : monthsCase.Oct ? monthsCase.Oct.length : 0,
          monthsCase === null ? 0 : monthsCase.Nov ? monthsCase.Nov.length : 0,
          monthsCase === null ? 0 : monthsCase.Dec ? monthsCase.Dec.length : 0,
        ],
        borderColor: "#7DBFFF",
        backgroundColor: "#DCEEFF",
        borderWidth: 2,
        spanGaps: true,
        showLine: true,
      },
    ],
  };

  var days = 7; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  var dayz = last.getDate();
  var month = last.getMonth() + 1;
  var yearz = last.getFullYear();

  const subtractedDays = new Date(month + "/" + dayz + "/" + yearz);

  const getDates = (e) => {
    const dates = new Date(e);

    return dates;
  };

  const filterDate = (e) => {
    return (
      getDates(e.createdAt) >= subtractedDays &&
      getDates(e.createdAt) <= new Date()
    );
  };

  useEffect(() => {
    console.log(
      specializations.map((e) => {
        return {
          ...e,
          id: e.specialization,
          label: e.specialization,
          value: listUsers.filter((f) => {
            if (!f.specialization) {
              return 0;
            } else if (f.specialization._id) {
              return f.specialization._id === e._id;
            }
          }).length,
          color: "pink",
        };
      })
    );
  }, []);

  useEffect(() => {
    setSpecializations(
      specializations.map((e) => {
        return {
          ...e,
          id: e.specialization,
          label: e.specialization,
          value: listUsers.filter((f) => {
            if (!f.specialization) {
              return 0;
            } else if (f.specialization._id) {
              return f.specialization._id === e._id;
            }
          }).length,
          color: "pink",
        };
      })
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin - Dashboard | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <AdminSidebar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        <AnimatePresence>
          {modal && (
            <DeletePendingUserModal
              toast={toast}
              setModal={setModal}
              userId={userId}
            />
          )}

          {profileModal && (
            <PendingUserProfileModal
              setProfileModal={setProfileModal}
              userData={userData}
            />
          )}
        </AnimatePresence>

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="container-heading">
              <h2>Dashboard Overview</h2>
            </div>
            <div className="statistic-section">
              <StatisticCard
                heading="Total Hospitals"
                icon={<HiOfficeBuilding />}
                iconColor="#fff"
                total={facilities.length}
                subTotal={facilities.length - 1 + " Referring Hospitals"}
                bg="#5D7CE9"
                subBg="#c9d3f8"
              />
              <StatisticCard
                heading="Total Doctors"
                icon={<IoPeople />}
                total={listUsers.length - 1}
                iconColor="#fff"
                subTotal={
                  listUsers.filter(
                    (e) => e.designation._id === "623ec7fb80a6838424edaa29"
                  ).length + " ZCMC Doctors"
                }
                bg="#FE7477"
                subBg="#ffdfdf"
              />
              <StatisticCard
                heading="Total Patients"
                icon={<IoPeople />}
                iconColor="#fff"
                total={patients.length}
                subTotal={
                  patients.filter(filterDate).length > 1
                    ? patients.filter(filterDate).length + " New Added Patients"
                    : patients.filter(filterDate).length + " New Added Patient"
                }
                bg="#3DC1AD"
                subBg="#defff9"
              />
              <StatisticCard
                heading="Total Cases"
                icon={<IoMedkit />}
                iconColor="#fff"
                total={cases.length}
                subTotal={
                  cases.filter((e) => e.active === true).length > 1
                    ? cases.filter((e) => e.active === true).length +
                      " Active Cases"
                    : cases.filter((e) => e.active === true).length +
                      " Active Case"
                }
                bg="#FF8657"
                subBg="#ffe2d6"
              />
            </div>

            <div className="container-divider">
              <div style={{ maxHeight: "500px" }} className="chart-container">
                <SpecializationChart
                  data={[
                    {
                      Year: "Jan",
                      Patients: 5,
                      "hot dogColor": "hsl(156, 70%, 50%)",
                      Cases: 4,
                      burgerColor: "hsl(245, 70%, 50%)",
                    },
                    {
                      Year: "Feb",
                      "hot dog": 98,
                      "hot dogColor": "hsl(314, 70%, 50%)",
                      burger: 6,
                      burgerColor: "hsl(349, 70%, 50%)",
                    },
                    {
                      Year: "Mar",
                      "hot dog": 39,
                      "hot dogColor": "hsl(111, 70%, 50%)",
                      burger: 121,
                      burgerColor: "hsl(89, 70%, 50%)",
                    },
                    {
                      Year: "Apr",
                      "hot dog": 141,
                      "hot dogColor": "hsl(1, 70%, 50%)",
                      burger: 104,
                      burgerColor: "hsl(332, 70%, 50%)",
                    },
                    {
                      Year: "May",
                      "hot dog": 172,
                      "hot dogColor": "hsl(321, 70%, 50%)",
                      burger: 170,
                      burgerColor: "hsl(97, 70%, 50%)",
                    },
                    {
                      Year: "Jun",
                      "hot dog": 75,
                      "hot dogColor": "hsl(168, 70%, 50%)",
                      burger: 13,
                      burgerColor: "hsl(159, 70%, 50%)",
                    },
                    {
                      Year: "Jul",
                      "hot dog": 64,
                      "hot dogColor": "hsl(338, 70%, 50%)",
                      burger: 69,
                      burgerColor: "hsl(110, 70%, 50%)",
                    },
                  ]}
                />
              </div>

              {/* <div className="donut-chart-container">
                <h2>Doctors by Specialization</h2>
                <ResponsivePie
                  data={specializations}
                  // data={[
                  //   {
                  //     id: "java",
                  //     label: "java",
                  //     value: 188,
                  //     color: "hsl(19, 70%, 50%)",
                  //   },
                  //   {
                  //     id: "php",
                  //     label: "php",
                  //     value: 571,
                  //     color: "hsl(337, 70%, 50%)",
                  //   },
                  //   {
                  //     id: "lisp",
                  //     label: "lisp",
                  //     value: 197,
                  //     color: "hsl(71, 70%, 50%)",
                  //   },
                  //   {
                  //     id: "haskell",
                  //     label: "haskell",
                  //     value: 411,
                  //     color: "hsl(260, 70%, 50%)",
                  //   },
                  //   {
                  //     id: "sass",
                  //     label: "sass",
                  //     value: 461,
                  //     color: "hsl(105, 70%, 50%)",
                  //   },
                  // ]}
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
              </div> */}
              {/* <div className="chart-container">
                  <div className="year-selected">
                    <h2>Year :</h2>{" "}
                    <select
                      onChange={(e) =>
                        setYearSelected(parseInt(e.target.value))
                      }
                      value={yearSelected}
                    >
                      {year.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  </div>
                  {months === null && monthsCase === null ? (
                    ""
                  ) : (
                    <Line options={options} data={data} />
                  )}
                </div> */}

              <div className="admin-right-panel">
                <div className="pending-registration">
                  <h2>Pending Registration</h2>
                  <div className="pending-registration-body">
                    {pending.length === 0 ? (
                      <div className="no-pending-user">
                        <p>
                          <FiUserX />
                        </p>
                        <p>No pending user registration</p>
                      </div>
                    ) : (
                      pending.map((item) => {
                        return (
                          <PendingUser
                            key={item._id}
                            email={item.email}
                            firstname={item.firstname}
                            id={item._id}
                            picture={!item.picture ? NoUser : item.picture}
                            setModal={setModal}
                            handleId={handleId}
                            toast={toast}
                            setProfileModal={setProfileModal}
                            item={item}
                            setUserData={setUserData}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
