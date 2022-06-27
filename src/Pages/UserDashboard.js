import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "../AdminPages/AdminDashboard.css";
import useAuth from "../Hooks/useAuth";
import StatisticCard from "../AdminComponents/StatisticCard";
import { IoPeopleOutline, IoMedkitOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
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
import "./UserDashboard.css";

const UserDashboard = () => {
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

  var days = 20; // Days you want to subtract
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

  return (
    <>
      <Helmet>
        <title>Dashboard | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
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
                    (e) => e.designation._id === "623ec7fb80a6838424edaa29"
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
                  patients.filter(filterDate).length + " New Added Patients"
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
            {/* <div className="user-chart-container">
              <div className="year-selected">
                <h2>Year :</h2>{" "}
                <select
                  onChange={(e) => setYearSelected(parseInt(e.target.value))}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
