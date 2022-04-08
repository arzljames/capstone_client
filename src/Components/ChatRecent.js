import React, { useEffect, useState } from "react";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";

const ChatRecent = ({ setId, recent }) => {
  const { user, listUsers, recentChat } = useAuth();

  const [users, setUsers] = useState([]);

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
        <p className="status-label">Recent Chats</p>
      </div>
    </>
  );
};

export default ChatRecent;
