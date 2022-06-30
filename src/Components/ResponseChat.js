import React, { useState, useRef, useEffect } from "react";
import {
  HiOutlinePaperClip,
  HiOutlineChevronDown,
  HiX,
  HiDocumentText,
} from "react-icons/hi";
import api from "../API/Api";
import { socket } from "./Socket";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import { IoSend } from "react-icons/io5";
import { useClickOutside } from "../Hooks/useClickOutside";
import "../Pages/Chat.css";

const ResponseChat = ({ id, user, response, setResponse, active }) => {
  const [file, setFile] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [temp, setTemp] = useState("");
  const [sort, setSort] = useState("Newest");
  const sendResponse = async () => {
    if (temp !== "") {
      const responseData = {
        room: id,
        user: user.userId,
        content: temp,
      };

      await socket.emit("send_response", responseData);
      setTemp("");
    }
  };

  useEffect(() => {
    socket.on("receive_response", (data) => {
      setResponse(data);
    });
  }, [socket]);

  const fetchResponse = async () => {
    let result = await api.get("/api/message");
    if (result.data) {
      setResponse(result.data);
    }
  };

  useEffect(() => {
    fetchResponse();
  }, [socket]);

  const getDate = (date) => {
    let todate = new Date(date);
    let today =
      todate.toLocaleString("en-us", { month: "short" }) +
      " " +
      todate.getDate() +
      "," +
      " " +
      todate.getFullYear();

    return today;
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

  const { facilities, specializations } = useAuth();

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const domNode = useClickOutside(() => {
    setIsClick(false);
  });

  const sortAscDate = (a, b) => {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA > dateB ? 1 : -1;
  };

  const sortDscDate = (a, b) => {
    var dateA = new Date(a.createdAt).getTime();
    var dateB = new Date(b.createdAt).getTime();
    return dateA < dateB ? 1 : -1;
  };

  const path = window.location.pathname;

  useEffect(() => {
    setFile([]);
  }, [path]);

  const prevImage = (img) => {
    const objectURL = URL.createObjectURL(img);

    return objectURL;
  };

  const formData = new FormData();

  const handleResponse = async () => {
    try {
      formData.append("file", file.file);
      formData.append("upload_preset", "qn8bbwmc");
      formData.append("cloud_name", "ojttelemedicine");

      fetch("https://api.cloudinary.com/v1_1/ojttelemedicine/upload", {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data || temp !== "") {
            const responseData = {
              room: id,
              user: user.userId,
              content: temp,
              file: data.url,
              name: file.name,
            };

            socket.emit("send_response", responseData);
            setTemp("");
            setFile("");
          }
        });
    } catch (error) {}
  };

  

  return (
    <div className="case-data-response">
      <div className="response-header">
        <h1>
          Response {" "}
          {response.filter((e) => e.room === id).length !== 0 ?
            `(${response.filter((e) => e.room === id).length})` : null}
        </h1>{" "}
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          disabled={active === false ? true : false}
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className={active === false ? "inactive" : ""}
          placeholder={
            active === true
              ? "Write your response here"
              : "You cannot write response to an inactive case"
          }
        ></textarea>

        <div className="attachment-container">
          {file.name === "" || !file.name || file.length === 0 ? null : (
            <div
              className={
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png" ||
                file.type === "image/gif"
                  ? "attachment-file img"
                  : "attachment-file file"
              }
            >
              <p onClick={() => setFile("")} className="close">
                <HiX />
              </p>
              {file.type === "image/jpeg" ||
              file.type === "image/jpg" ||
              file.type === "image/png" ||
              file.type === "image/gif" ? (
                <img src={prevImage(file.file)} alt={file.name} />
              ) : (
                <>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HiDocumentText />
                  </p>
                  <h2>{file.name}</h2>
                </>
              )}
            </div>
          )}
        </div>

        <div className="case-data-response-btns">
          <button
            ref={domNode}
            onClick={() => setIsClick(!isClick)}
            className="sort-response-btn"
          >
            Sort by: {sort}
            <p>
              <HiOutlineChevronDown />
            </p>
            {isClick && (
              <div className="sort-response-btn-dropdown">
                <p onClick={() => setSort("Oldest")}>Oldest</p>
                <p onClick={() => setSort("Newest")}>Newest</p>
              </div>
            )}
          </button>

          <div>
            <div
              onClick={() => onBtnClick()}
              className={
                active === false ? "attach-file-btn disable" : "attach-file-btn"
              }
            >
              <HiOutlinePaperClip />{" "}
              <p className="p-attach-file">Attach File</p>
              <input
                ref={inputFileRef}
                onChange={(e) => {
                  setFile({
                    name: e.target.files[0].name,
                    type: e.target.files[0].type,
                    file: e.target.files[0],
                  });
                }}
                type="file"
              />
            </div>
            <button
              className={active === false ? "disable" : null}
              // onClick={() => sendResponse()}
              onClick={() => handleResponse()}
            >
              Submit{" "}
              <p>
                <IoSend />
              </p>
            </button>
          </div>
        </div>
      </form>
      <div className="response-body">
        {response
          .filter((item) => item.room === id)

          .sort(sort === "Newest" ? sortDscDate : sortAscDate)
          .map((e, key) => {
            return (
              <>
                <motion.div className="response-body-message">
                  <div className="avatar">
                    <img
                      src={!e.user.picture ? NoUser : e.user.picture}
                      alt={e.user.firstname}
                    />
                  </div>
                  <div className="response">
                    <div className="date">
                      {getDate(e.createdAt) + " " + getTime(e.createdAt)}
                    </div>
                    <h1>Dr. {e.user.firstname}</h1>
                    <h2 style={{ marginBottom: "0px" }}>
                      {e.user.specialization === null
                        ? null
                        : specializations.filter(
                            (item) => item._id === e.user.specialization
                          )[0].specialization}
                    </h2>
                    <h2>
                      {
                        facilities.filter(
                          (hospital) => hospital._id === e.user.designation
                        )[0].facility
                      }
                      <br />
                    </h2>

                    <div className="response-content-container">
                      <p>{e.content}</p>

                      {/* <p>{e.content}</p>
                      {e.attachment.length === 0 ? null : (
                        <a
                          target="_blank"
                          href={e.attachment[0].file}
                          className="response-attach"
                        >
                          {e.attachment[0].name}
                        </a>
                      )} */}

                      {!e.attachment || !e.attachment.file ? null : (
                        <a
                          href={e.attachment.file}
                          target="_blank"
                          className="response-attach"
                        >
                          {e.attachment.name}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ResponseChat;
