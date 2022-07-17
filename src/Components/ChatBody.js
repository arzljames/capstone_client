import React, { useState, useEffect, useRef } from "react";
import Avatar from "../Assets/nouser.png";
import {
  HiOutlinePaperClip,
  HiOutlinePhotograph,
  HiX,
  HiDocumentText,
} from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import ReactTimeAgo from "react-time-ago";
import { useParams } from "react-router-dom";

const ChatBody = ({ users, socket }) => {
  const [message, setMessage] = useState(null);
  const [temp, setTemp] = useState("");
  const [file, setFile] = useState([]);
  const { user, hospitalSpec, facilities } = useAuth();
  const path = window.location.pathname;

  let receiverId = useParams();

  useEffect(() => {
    socket.on("chat_messages", (data) => {
      setMessage(data);
    });
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      let result = await api.get(
        `/api/chat/message/${user.userId}/${receiverId.id}`
      );
      if (result) {
        setMessage(result.data);
      } else {
        setMessage(null);
      }
    };

    {
      users._id && fetchMessages();
    }
  }, [socket, users]);

  const sendChat = async () => {
    if (temp !== "") {
      const responseData = {
        from: user.userId,
        to: users._id,
        content: temp,
      };

      await socket.emit("send_chat_messages", responseData);
      setTemp("");
    }
  };

  const getTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const prevImage = (img) => {
    const objectURL = URL.createObjectURL(img);

    return objectURL;
  };

  const removeItem = (item) => {
    setFile(
      file.filter((e, index) => {
        return index !== item;
      })
    );
  };

  useEffect(() => {
    setFile([]);
  }, [path]);

  if (!message || !users) {
    return (
      <div className="wait-spinner-container">
        <PulseLoader size={10} margin={2} color="#058e46" />
      </div>
    );
  }
  return (
    <div className="chat-main-body-content">
      <div className="chat-header">
        <div className="avatar-container">
          <img
            src={!users.picture ? Avatar : users.picture}
            alt="Profile Picture"
          />
          <div
            className={
              users.activeStatus === "Online"
                ? "status-online"
                : "status-offline"
            }
          ></div>
        </div>
        <div className="name-container">
          <h1>Dr. {users.firstname + " " + users.lastname}</h1>
          <p>
            {users.activeStatus === "Online" ? (
              "Online"
            ) : !users.updatedAt ? (
              "Offline"
            ) : (
              <p>
                Active{" "}
                {
                  <ReactTimeAgo
                    date={users.updatedAt}
                    locale="en-US"
                    timeStyle="round-minute"
                  />
                }
              </p>
            )}
          </p>
        </div>
      </div>
      <div className="chats-body">
        {message.length < 1 && (
          <div className="chat-user-info">
            <div className="avatar">
              <div
                className={
                  users.activeStatus === "Online"
                    ? "status-online"
                    : "status-offline"
                }
              ></div>
              <img
                src={!users.picture ? Avatar : users.picture}
                alt="Profile Picture"
              />
            </div>

            <h1>Dr. {users.firstname + " " + users.lastname}</h1>

            {/* <p>
              {facilities.length === 0
                ? null
                : facilities
                    .filter((e) => e._id === users.designation)
                    .map((items) => {
                      return items.specialization.filter(
                        (spec) => spec._id === users.specialization
                      )[0];
                    })[0].name}
            </p> */}
            <p>
              {facilities.length === 0
                ? null
                : facilities
                    .filter((e) => e._id === users.designation)
                    .map((item) => {
                      return item.facility;
                    })}
            </p>

            <i>Write a message and say Hi 👋 to {users.firstname}</i>
          </div>
        )}

        {message
          .slice(0)
          .reverse()
          .map((e) => {
            return (
              <div
                className={
                  e.sender._id === user.userId
                    ? "chat-message-container-me"
                    : "chat-message-container"
                }
              >
                {e.sender._id !== user.userId && (
                  <div className="sender-avatar">
                    <img
                      src={!e.sender.picture ? Avatar : e.sender.picture}
                      alt="Profile Picture"
                    />
                  </div>
                )}
                <div className="sender-message-container">
                  <span>
                    {e.sender.firstname === user.firstname
                      ? "Me"
                      : e.sender.firstname}
                    , {getTime(e.createdAt)}
                  </span>
                  <div className="sender-message">
                    <p>{e.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="chat-footer">
        <div className="attachment-container">
          {file.map((e, index) => {
            return (
              <div
                key={index}
                className={
                  e.type === "image/jpeg" ||
                  e.type === "image/jpg" ||
                  e.type === "image/png" ||
                  e.type === "image/gif"
                    ? "attachment-file img"
                    : "attachment-file file"
                }
              >
                <p onClick={() => removeItem(index)} className="close">
                  <HiX />
                </p>
                {e.type === "image/jpeg" ||
                e.type === "image/jpg" ||
                e.type === "image/png" ||
                e.type === "image/gif" ? (
                  <img src={prevImage(e.file)} alt={e.name} />
                ) : (
                  <>
                    <p>
                      <HiDocumentText />
                    </p>
                    <h2>{e.name}</h2>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="chat-input-container">
          {/* <p className="attach" onClick={() => onBtnClick()}>
            <HiOutlinePaperClip />
          </p>
          <p className="attach" onClick={() => onBtnClick()}>
            <HiOutlinePhotograph />
          </p> */}
          <input
            ref={inputFileRef}
            className="chat-input-file"
            onChange={(e) =>
              setFile([
                ...file,
                {
                  name: e.target.files[0].name,
                  type: e.target.files[0].type,
                  file: e.target.files[0],
                },
              ])
            }
            type="file"
          />
          <div>
            <input
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              onKeyDown={(e) => enterKey(e)}
              type="text"
              placeholder="Type your message here"
            />
            <div
              onClick={() => sendChat()}
              className={
                temp.length === 0 && file.length === 0
                  ? "send-btn-disable"
                  : "send-btn"
              }
            >
              Send
              <p className="send">
                <AiOutlineSend />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
