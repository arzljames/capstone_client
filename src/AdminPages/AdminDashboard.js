import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import "./AdminDashboard.css";
import AdminHeader from "../AdminComponents/AdminHeader";
import StatisticCard from "../AdminComponents/StatisticCard";
import PendingUser from "../AdminComponents/PendingUser";
import useAuth from "../Hooks/useAuth";
import { HiChevronDown } from "react-icons/hi";
import Toast from "../Components/Toast";
import { AnimatePresence } from "framer-motion";
import DeletePendingUserModal from "../AdminComponents/DeletePendingUserModal";
import { FiUserX } from "react-icons/fi";
import NoUser from "../Assets/nouser.png";
import { Helmet } from "react-helmet";
import { IoPeople, IoBusiness } from "react-icons/io5";
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
import { month } from "javascript-time-ago/gradation";
import { date } from "yup";
import { get } from "react-hook-form";

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
  const navigate = useNavigate();

  const { pending, facilities, listUsers, patients, cases } = useAuth();
  const [toast, setToast] = useState(false);
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  //State for user verification status
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
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
  const year = new Date().getFullYear();

  useEffect(() => {
    function extract() {
      const groups = {};
      patients
        .filter((e) => yearSelected === parseInt(e.createdAt.substring(0, 4)))
        .forEach(function(val) {
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
        .forEach(function(val) {
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
  }, [patients, yearSelected]);

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
        borderColor: "#FF959E",
        backgroundColor: "#FFE2E4",
        borderWidth: 2,
        spanGaps: true,
        showLine: true,
      },
      {
        label: "Cases",
        data: [
          monthsCase === null ? 0 : months.Jan ? months.Jan.length : 0,
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
        <AnimatePresence>
          {modal && (
            <DeletePendingUserModal setModal={setModal} userId={userId} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          <AdminSidebar />
        </AnimatePresence>
        <AnimatePresence>
          {toast && (
            <Toast setToast={setToast} message={message} isError={isError} />
          )}
        </AnimatePresence>
        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="container-heading">
              <h2>Dashboard Overview</h2>
            </div>
            <div className="container-divider">
              <div className="admin-container-content">
                <div className="statistic-section">
                  <StatisticCard
                    heading="Total Hospitals"
                    icon={<IoBusiness />}
                    total={facilities.length}
                    iconColor="#1e90ff"
                    iconBg="#dceeff"
                  />
                  <StatisticCard
                    heading="Total Doctors"
                    icon={<IoPeople />}
                    total={listUsers.length - 1}
                    iconColor="#2ed573"
                    iconBg="#dbffea"
                  />
                  <StatisticCard
                    heading="Total Patients"
                    icon={<IoPeople />}
                    total={patients.length}
                    iconColor="#ff4757"
                    iconBg="#ffe2e4"
                  />
                </div>
                <div className="chart-container">
                  <div className="year-selected">
                    <h2>Year:</h2>{" "}
                    <div onClick={() => setYearSelected(2021)}>
                      {yearSelected}{" "}
                      <p>
                        <HiChevronDown />
                      </p>
                    </div>
                  </div>
                  {months === null && monthsCase === null ? (
                    ""
                  ) : (
                    <Line options={options} data={data} />
                  )}
                </div>
              </div>
              <div className="admin-right-panel">
                <div className="calendar-container">
                  <div className="date">
                    <h2>Today, {day}</h2>
                    <h3>{time}</h3>
                  </div>
                </div>
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
                            setToast={setToast}
                            setMessage={setMessage}
                            setIsError={setIsError}
                            setModal={setModal}
                            handleId={handleId}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                {/* <div className="recently-added">
                  <div className="recently-added-header">
                    <h1>Recently Added</h1>
                    <p onClick={() => navigate("/people")}>See All</p>
                  </div>
                  <div className="recently-added-body">
                    {listUsers
                      .filter(
                        (e) => e.verified === true && e.userType !== "admin"
                      )
                      .map((item, index) => {
                        return (
                          <div key={index} className="pending-user-card">
                            <div className="pending-user-profile-container">
                              <div className="pending-user-profile">
                                <img
                                  src={!item.picture ? NoUser : item.picture}
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div className="pending-user-name">
                              <h5>
                                Dr. {item.firstname + " " + item.lastname}
                              </h5>
                              <p>
                                {facilities.length === 0
                                  ? null
                                  : facilities.filter(
                                      (e) => e._id === item.designation
                                    )[0].facility}
                              </p>
                              <p>
                                {facilities.length === 0
                                  ? null
                                  : facilities
                                      .filter((e) => e._id === item.designation)
                                      .map((items) => {
                                        return items.specialization.filter(
                                          (spec) =>
                                            spec._id === item.specialization
                                        )[0];
                                      })[0].name}
                              </p>
                            </div>

                            <div className="option-icon-container"></div>
                          </div>
                        );
                      })}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
