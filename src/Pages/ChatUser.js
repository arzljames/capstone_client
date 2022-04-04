import React, { useState, useEffect } from "react";
import ChatNavbar from "../Components/ChatNavbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Chat.css";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import ChatBody from "../Components/ChatBody";
import { useParams } from "react-router-dom";
import api from "../API/Api";
import { socket } from "../Components/Socket";

const ChatUser = () => {
  const [users, setUsers] = useState([]);

  const { appState } = useAuth();

  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await api.get("/api/user/users");
        if (response) {
          setUsers(response.data.filter((ids) => ids._id === id)[0]);
        }
      } catch (error) {}
    };

    fetchUser();

    const interval = setInterval(() => {
      fetchUser();
    }, 5000);

    return () => clearInterval(interval);
  }, [socket, appState, id]);
  return (
    <>
      <Helmet>
        <title>Chat | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="chat-content">
            <ChatNavbar />
            <div className="chats">
              <ChatBody users={users} socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUser;