import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import Avatar from "../Assets/nouser.png";


//list of recent chats in chat module
const ChatRecent = ({ setId, recent }) => {
  const { user, listUsers, recentChat, chatUsers } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const path = window.location.pathname;

  useEffect(() => {
    const fetchChat = () => {
      socket.emit("chat");
      socket.on("get_chat", (data) => {
        setUsers(data);
      });
    };

    fetchChat();
  }, [socket]);



  return (
    <>
      <div className="recent-p-container">
        <p className="status-label">Online</p>
        <div className="chat-wrapper">
          {chatUsers
            .filter(
              (e) =>
                e._id !== user.userId &&
                e.userType !== "admin" &&
                e.verified === true &&
                e.activeStatus === "Online"
            )

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

          {chatUsers.filter(
            (e) =>
              e._id !== user.userId &&
              e.userType !== "admin" &&
              e.verified === true &&
              e.activeStatus === "Online"
          ).length === 0 && <p className="no-active">No active users</p>}
        </div>
        <p className="status-label">Offline</p>
        <div className="chat-wrapper">
          {chatUsers
            .filter(
              (e) =>
                e._id !== user.userId &&
                e.userType !== "admin" &&
                e.verified === true &&
                e.activeStatus === "Offline"
            )

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
      </div>
    </>
  );
};

export default ChatRecent;
