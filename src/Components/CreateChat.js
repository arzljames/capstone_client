import React, { useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import { containerVariant, formVariant } from "../Animations/Animations";
import useAuth from "../Hooks/useAuth";
import { HiX } from "react-icons/hi";
import { sectionMarginDefaults } from "docx";
import api from "../API/Api";
import { useNavigate } from "react-router-dom";

//Component modal for creating messages
const CreateChat = () => {
  const { showCreateChat, setShowCreateChat, listUsers, user } = useAuth();
  let domNode = useClickOutside(() => {
    setShowCreateChat(false);
  });

  let domNodeDrop = useClickOutside(() => {
    setOnFocus(false);
  });

  const navigate = useNavigate();

  const [temp, setTemp] = useState("");
  const [users, setUser] = useState(null);
  const [onFocus, setOnFocus] = useState(false);
  const [msg, setMsg] = useState("");
  const [isClick, setIsClick] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsClick(true);
      let response = await api.post(
        `/api/chat/create-chat/${user.userId}/${users._id}`,
        {
          msg,
        }
      );

      if (response.data.ok) {
        navigate(`/chat/${user.userId}/${users._id}`);
        setUser("");
        setShowCreateChat(false);
        setIsClick(false);
      }
    } catch (error) {
      setIsClick(false);
    }
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
    >
      <motion.div
        ref={domNode}
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="create-chat-modal"
      >
        <div className="create-chat-modal-header">
          <h2>New Message</h2>
          <p onClick={() => setShowCreateChat(false)}>
            <HiX />
          </p>
        </div>

        <div className="create-chat-modal-body">
          <div className={onFocus ? "to-container focus" : "to-container"}>
            <label>To:</label>
            {users === null ? (
              <input
                onFocus={() => setOnFocus(true)}
                value={temp}
                onChange={(e) => {
                  setTemp(e.target.value);
                  setOnFocus(true);
                }}
                type="text"
              />
            ) : (
              <div className="receiver">
                <p>
                  {users.firstname + " " + users.lastname}{" "}
                  <span onClick={() => setUser(null)}>
                    <HiX />
                  </span>
                </p>
              </div>
            )}

            {onFocus && users === null ? (
              <div ref={domNodeDrop} className="to-container-dropdown">
                {listUsers
                  .filter(
                    (item) =>
                      item.userType !== "admin" &&
                      item._id !== user.userId &&
                      item.verified === true
                  )
                  .filter((val) => {
                    if (temp === "") {
                      return val;
                    } else if (
                      val.fullname
                        .toLowerCase()
                        .includes(temp.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((e, index) => {
                    return (
                      <div
                        onClick={() => {
                          setUser(e);
                          setOnFocus(false);
                        }}
                        key={index}
                        className="user"
                      >
                        {e.firstname + " " + e.lastname}
                      </div>
                    );
                  })}

                {listUsers
                  .filter(
                    (item) =>
                      item.userType !== "admin" &&
                      item._id !== user.userId &&
                      item.verified === true
                  )
                  .filter((val) => {
                    if (temp === "") {
                      return val;
                    } else if (
                      val.fullname
                        .toLowerCase()
                        .includes(temp.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  }).length === 0 && (
                  <p className="no-user">There's no such user</p>
                )}
              </div>
            ) : null}
          </div>

          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Write your message here"
          ></textarea>
        </div>

        <div className="create-chat-modal-footer">
          <button onClick={() => setShowCreateChat(false)} className="cancel">
            Cancel
          </button>
          <button
            onClick={() => handleSubmit()}
            className={
              users === null || msg === "" || isClick ? "send disabled" : "send"
            }
          >
            Send
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateChat;
