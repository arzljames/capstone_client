import React, { useEffect, useState } from "react";
import ChatRecent from "./ChatRecent";
import ChatSearch from "./ChatSearch";
import {
  HiOutlineSearch,
  HiOutlinePencilAlt,
  HiArrowNarrowLeft,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import "../Pages/Chat.css";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { socket } from "./Socket";
import CreateChat from "./CreateChat";

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


//Custom navigation for chat component page
const ChatNavbar = ({setId, }) => {

  const {showCreateChat, setShowCreateChat} = useAuth()
  const [recent, setRecent] = useState([]);
  const [term, setTerm] = useState("");
  const {showSearch, setShowSearch} = useAuth();



  return (
    <>
    <AnimatePresence>
      {showCreateChat && <CreateChat />}
    </AnimatePresence>
    <div className="chat-nav">
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
              <p onClick={() => setShowCreateChat(true)}>
                <HiOutlinePencilAlt /> 
              </p>
            </div>
          </>
        )}
      </div>

      <div className="chat-body">
        {showSearch ? <ChatSearch setId={setId} term={term} /> : <ChatRecent recent={recent} setId={setId} />}
      </div>
    </div>
    </>
  );
};

export default ChatNavbar;