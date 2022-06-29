import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import "./AdminDashboard.css";
import AdminHeader from "../AdminComponents/AdminHeader";
import StatisticCard from "../AdminComponents/StatisticCard";
import PendingUser from "../AdminComponents/PendingUser";
import useAuth from "../Hooks/useAuth";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import DeletePendingUserModal from "../AdminComponents/DeletePendingUserModal";
import { FiUserX } from "react-icons/fi";
import NoUser from "../Assets/nouser.png";
import { Helmet } from "react-helmet";
import { IoPeopleOutline, IoMedkitOutline } from "react-icons/io5";
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
                icon={<HiOutlineOfficeBuilding />}
                iconColor="#fff"
                total={facilities.length}
                subTotal={facilities.length - 1 + " Referring Hospitals"}
                bg="#5D7CE9"
              />
              <StatisticCard
                heading="Total Doctors"
                icon={<IoPeopleOutline />}
                total={listUsers.length - 1}
                iconColor="#fff"
                subTotal={
                  listUsers.filter(
                    (e) => e.designation === "623ec7fb80a6838424edaa29"
                  ).length + " ZCMC Doctors"
                }
                bg="#FE7477"
              />
              <StatisticCard
                heading="Total Patients"
                icon={<IoPeopleOutline />}
                iconColor="#fff"
                total={patients.length}
                subTotal={
                  cases.filter((e) => e.active === true).length +
                  " New Patients"
                }
                bg="#3DC1AD"
              />
              <StatisticCard
                heading="Total Cases"
                icon={<IoMedkitOutline />}
                iconColor="#fff"
                total={cases.length}
                subTotal={
                  cases.filter((e) => e.active === true).length +
                  " Active Cases"
                }
                bg="#FF8657"
              />
            </div>
            <div className="container-divider">
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

              {/*  <SpecializationChart
                data={[
                  {
                    country: "AD",
                    "hot dog": 137,
                    "hot dogColor": "hsl(156, 70%, 50%)",
                    burger: 83,
                    burgerColor: "hsl(245, 70%, 50%)",
                  },
                  {
                    country: "AE",
                    "hot dog": 98,
                    "hot dogColor": "hsl(314, 70%, 50%)",
                    burger: 6,
                    burgerColor: "hsl(349, 70%, 50%)",
                    sandwich: 140,
                    sandwichColor: "hsl(125, 70%, 50%)",
                    kebab: 138,
                    kebabColor: "hsl(290, 70%, 50%)",
                    fries: 112,
                    friesColor: "hsl(149, 70%, 50%)",
                    donut: 111,
                    donutColor: "hsl(243, 70%, 50%)",
                  },
                  {
                    country: "AF",
                    "hot dog": 39,
                    "hot dogColor": "hsl(111, 70%, 50%)",
                    burger: 121,
                    burgerColor: "hsl(89, 70%, 50%)",
                    sandwich: 149,
                    sandwichColor: "hsl(135, 70%, 50%)",
                    kebab: 67,
                    kebabColor: "hsl(256, 70%, 50%)",
                    fries: 114,
                    friesColor: "hsl(80, 70%, 50%)",
                    donut: 47,
                    donutColor: "hsl(359, 70%, 50%)",
                  },
                  {
                    country: "AG",
                    "hot dog": 141,
                    "hot dogColor": "hsl(1, 70%, 50%)",
                    burger: 104,
                    burgerColor: "hsl(332, 70%, 50%)",
                    sandwich: 9,
                    sandwichColor: "hsl(173, 70%, 50%)",
                    kebab: 47,
                    kebabColor: "hsl(268, 70%, 50%)",
                    fries: 35,
                    friesColor: "hsl(216, 70%, 50%)",
                    donut: 12,
                    donutColor: "hsl(159, 70%, 50%)",
                  },
                  {
                    country: "AI",
                    "hot dog": 172,
                    "hot dogColor": "hsl(321, 70%, 50%)",
                    burger: 170,
                    burgerColor: "hsl(97, 70%, 50%)",
                    sandwich: 50,
                    sandwichColor: "hsl(333, 70%, 50%)",
                    kebab: 76,
                    kebabColor: "hsl(310, 70%, 50%)",
                    fries: 52,
                    friesColor: "hsl(8, 70%, 50%)",
                    donut: 125,
                    donutColor: "hsl(340, 70%, 50%)",
                  },
                  {
                    country: "AL",
                    "hot dog": 75,
                    "hot dogColor": "hsl(168, 70%, 50%)",
                    burger: 13,
                    burgerColor: "hsl(159, 70%, 50%)",
                    sandwich: 94,
                    sandwichColor: "hsl(170, 70%, 50%)",
                    kebab: 170,
                    kebabColor: "hsl(142, 70%, 50%)",
                    fries: 127,
                    friesColor: "hsl(110, 70%, 50%)",
                    donut: 68,
                    donutColor: "hsl(224, 70%, 50%)",
                  },
                  {
                    country: "AM",
                    "hot dog": 64,
                    "hot dogColor": "hsl(338, 70%, 50%)",
                    burger: 69,
                    burgerColor: "hsl(110, 70%, 50%)",
                    sandwich: 183,
                    sandwichColor: "hsl(27, 70%, 50%)",
                    kebab: 67,
                    kebabColor: "hsl(161, 70%, 50%)",
                    fries: 111,
                    friesColor: "hsl(96, 70%, 50%)",
                    donut: 131,
                    donutColor: "hsl(260, 70%, 50%)",
                  },
                ]}
              /> */}

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
