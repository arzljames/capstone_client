
import React, {useState} from "react";
import ChatNavbar from "../Components/ChatNavbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Chat.css";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";

const Chat = () => {
  const { user, pp } = useAuth();


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
            <ChatNavbar  />
            <div className="content-body">
              <div className="no-content">
                <h1>Hello, {user.firstname}</h1>
                <div className="chat-user-header">
                  <img
                    src={!pp ? NoUser : pp}
                    alt="Avatar"
                  />
                </div>
                <button>Start a conversation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
