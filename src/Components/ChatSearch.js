import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Avatar from "../Assets/nouser.png";
import { useNavigate } from "react-router-dom";

const ChatSearch = ({ term }) => {
  const { chatUsers, user } = useAuth();
  const navigate = useNavigate();

  const path = window.location.pathname;

  return (
    <>
      <div className="recent-p-container">
        <p className="status-label">Search Results</p>
        {chatUsers
          .filter(
            (e) =>
              e._id !== user.userId &&
              e.userType !== "admin" &&
              e.verified === true
          )
          .filter((val) => {
            if (term === "") {
              return null;
            } else if (
              val.firstname.toLowerCase().includes(term.toLocaleLowerCase()) ||
              val.lastname.toLowerCase().includes(term.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => {
            return (
              <div
                onClick={() => navigate(`/chat/${user.userId}/${item._id}`)}
                className={
                  path.includes(item._id)
                    ? "chat-users chat-users-active"
                    : "chat-users"
                }
              >
                <div className="avatar">
                  <div
                    className={
                      item.activeStatus === "Online"
                        ? "status-online"
                        : "status-offline"
                    }
                    content={item.activeStatus}
                  ></div>
                  <img
                    src={!item.picture ? Avatar : item.picture}
                    alt="Profile Picture"
                  />
                </div>
                <p>
                  {item.firstname} {item.lastname}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChatSearch;
