import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import api from "../API/Api";
import "../Pages/Notification.css";
import ReactTimeAgo from "react-time-ago";


//Component for notification drawer or dropdown
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

  const navigateRefresh = (link) => {
    navigate(link);
    window.location.reload();
  };

  const [tab, setTab] = useState("All");
  return (
    <div className="notification-dropdown">
      <div className="notification-heading">
        <h2>
          Notifications{" "}
          {notification.filter(
            (item) =>
              item.specialization === user.specialization &&
              item.active === true
          ).length === 0 ? null : (
            <p>
              {
                notification.filter(
                  (item) =>
                    item.specialization === user.specialization &&
                    item.active === true
                ).length
              }
            </p>
          )}
        </h2>

        <div className="notification-tabs">
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

      {notification.filter(
        (item) => item.specialization === user.specialization
      ).length === 0 && (
        <p className="p-no-notification">No new notification</p>
      )}

      {tab !== "Read" &&
        notification
          .filter(
            (item) =>
              item.specialization === user.specialization &&
              item.active === true
          )
          .slice(0)
          .reverse()
          .map((item, key) => {
            return (
              <div
                key={key}
                onClick={() => {
                  handleNotif(item._id);
                  navigateRefresh(item.link);
                  setDropdownNotif(false);
                }}
                className={
                  item.active
                    ? "notification-container active"
                    : "notification-container"
                }
              >
                <div className="active-circle"></div>
                <div className="notification-avatar">
                  {item.from.picture ? (
                    <img src={item.from.picture} alt="Profile Picture" />
                  ) : (
                    <IoNotifications />
                  )}
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
                    <p>{item.body}</p>
                    <p className="date">
                      <ReactTimeAgo
                        date={item.createdAt}
                        locale="en-US"
                        timeStyle="round-minute"
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

      {tab !== "Unread" &&
        notification
          .filter(
            (item) =>
              item.specialization === user.specialization &&
              item.active === false
          )
          .slice(0)
          .reverse()
          .map((item) => {
            return (
              <div
                onClick={() => {
                  navigateRefresh(item.link);
                  setDropdownNotif(false);
                }}
                className={
                  item.active
                    ? "notification-container active"
                    : "notification-container"
                }
              >
                <div className="notification-avatar">
                  {item.from.picture ? (
                    <img src={item.from.picture} alt="Profile Picture" />
                  ) : (
                    <IoNotifications />
                  )}
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

                    <p>{item.body}</p>
                    <p className="date">
                      <ReactTimeAgo
                        date={item.createdAt}
                        locale="en-US"
                        timeStyle="round-minute"
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default NotificationDropdown;
