import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Notification.css";
import { Helmet } from "react-helmet";
import NotificationNavbar from "../Components/NotificationNavbar";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import api from "../API/Api";
import { socket } from "../Components/Socket";

const Notification = () => {
  const { user, notification } = useAuth();
  const navigate = useNavigate();

  const handleNotif = async (id) => {
    try {
      let response = await api.put(`/api/notification/${id}`);

      if (response) {
        socket.emit("notif");
      }
    } catch (error) {}
  };

  const [tab, setTab] = useState("All");

  return (
    <>
      <Helmet>
        <title>Notification | ZCMC Telemedicine</title>
      </Helmet>

      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            {/* <NotificationNavbar /> */}
            <div className="admin-subheading">
              <div className="notification-heading">
                <h2>Notifications</h2>
                <div>
                  <span
                    onClick={() => setTab("All")}
                    className={tab === "All" ? "active" : "not-active"}
                  >
                    All
                  </span>
                  <span
                    onClick={() => setTab("Read")}
                    className={tab === "Read" ? "active" : "not-active"}
                  >
                    Read
                  </span>
                  <span
                    onClick={() => setTab("Unread")}
                    className={tab === "Unread" ? "active" : "not-active"}
                  >
                    Unread
                  </span>
                </div>
              </div>
            </div>

            {tab !== "Read" &&
              notification
                .filter(
                  (item) =>
                    item.user._id === user.userId && item.active === true
                )
                .slice(0)
                .reverse()
                .map((item, key) => {
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        handleNotif(item._id);
                        navigate(item.link);
                      }}
                      className="notification-container"
                    >
                      <div className="active-circle"></div>
                      <div className="notification-avatar">
                        <IoNotifications />
                      </div>
                      <div
                        className={
                          item.active
                            ? "notification-details-active"
                            : "notification-details"
                        }
                      >
                        <div className="notification-details-title">
                          <h1>
                            {item.from.firstname + " " + item.from.lastname}{" "}
                            {item.title}
                          </h1>
                        </div>

                        <p>{item.body}</p>
                      </div>
                      <p className="date">{item.createdAt}</p>
                    </div>
                  );
                })}

            {tab !== "Unread" &&
              notification
                .filter(
                  (item) =>
                    item.user._id === user.userId && item.active === false
                )
                .slice(0)
                .reverse()
                .map((item) => {
                  return (
                    <div
                      onClick={() => navigate(item.link)}
                      className="notification-container"
                    >
                      <div className="notification-avatar">
                        <IoNotificationsOutline />
                      </div>
                      <div
                        className={
                          item.active
                            ? "notification-details-active"
                            : "notification-details"
                        }
                      >
                        <div className="notification-details-title">
                          <h1>
                            {item.from.firstname + " " + item.from.lastname}{" "}
                            {item.title}
                          </h1>
                        </div>

                        <p>{item.body}</p>
                      </div>
                      <p className="date">{item.createdAt}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
