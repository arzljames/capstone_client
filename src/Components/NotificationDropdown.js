import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import api from "../API/Api";
import "../Pages/Notification.css";

const NotificationDropdown = ({ setDropdownNotif }) => {
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

  const dateDay = (date) => {
    let today = new Date(date).toISOString().substring(0, 10);

    return today;
  };

  const dateTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  const [tab, setTab] = useState("All");
  return (
    <div className="notification-dropdown">
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

      {notification.filter((item) => item.specialization === user.specialization).length ===
        0 && <p className="p-no-notification">No new notification</p>}

      {tab !== "Read" &&
        notification
          .filter(
            (item) => item.specialization === user.specialization && item.active === true
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
                  setDropdownNotif(false);
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
                      Dr. {item.from.firstname + " " + item.from.lastname}{" "}
                      {item.title}
                    </h1>
                  </div>

                  <p>{item.body}</p>
                </div>
                <p className="date">
                  {dateDay(item.createdAt) + " " + dateTime(item.createdAt)}
                </p>
              </div>
            );
          })}

      {tab !== "Unread" &&
        notification
          .filter(
            (item) => item.specialization === user.specialization && item.active === false
          )
          .slice(0)
          .reverse()
          .map((item) => {
            return (
              <div
                onClick={() => {
                  navigate(item.link);
                  setDropdownNotif(false);
                }}
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
                    Dr. {item.from.firstname + " " + item.from.lastname}{" "}
                      {item.title}
                    </h1>
                  </div>

                  <p>{item.body}</p>
                </div>
                <p className="date">
                  {dateDay(item.createdAt) + " " + dateTime(item.createdAt)}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default NotificationDropdown;
