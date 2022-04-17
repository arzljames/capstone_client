import React, { useState } from "react";
import ChatNavbar from "../Components/ChatNavbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Chat.css";
import { Helmet } from "react-helmet";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import { motion } from "framer-motion";
import {
  HiArrowNarrowLeft,
  HiOutlineSearch,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import ChatRecent from "../Components/ChatRecent";
import ChatSearch from "../Components/ChatSearch";

const searchVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Chat = () => {
  const { user, pp } = useAuth();
  const [recent, setRecent] = useState([]);
  const [term, setTerm] = useState("");
  const { showSearch, setShowSearch } = useAuth();

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
            <div className="content-body">
              {/* <div className="no-content">
                <h1>Hello, {user.firstname}</h1>
                <div className="chat-user-header">
                  <img
                    src={!pp ? NoUser : pp}
                    alt="Avatar"
                  />
                </div>
                <button>Start a conversation</button>
              </div> */}
              <div className="chat-body2">
                <div className="chat-header">
                  {showSearch ? (
                    <>
                      <motion.p
                        variants={searchVariant}
                        initial="hidden"
                        animate="visible"
                        type="search"
                        placeholder="Search people"
                        onClick={() => setShowSearch(false)}
                        className="chat-cancel-p"
                      >
                        <HiArrowNarrowLeft />
                      </motion.p>
                      <motion.input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        variants={searchVariant}
                        initial="hidden"
                        animate="visible"
                        type="search"
                        placeholder="Search people"
                      />
                    </>
                  ) : (
                    <>
                      <h1>Chat</h1>
                      <div className="chat-icons">
                        <p onClick={() => setShowSearch(true)}>
                          <HiOutlineSearch />
                        </p>
                        <p>
                          <HiOutlinePencilAlt />
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="chat-body">
                  {showSearch ? (
                    <ChatSearch term={term} />
                  ) : (
                    <ChatRecent recent={recent} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
