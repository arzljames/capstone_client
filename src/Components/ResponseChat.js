import React, { useState, useEffect } from "react";
import { HiOutlinePaperClip, HiOutlineChevronDown } from "react-icons/hi";
import api from "../API/Api";
import { socket } from "./Socket";
import { motion } from "framer-motion";

const ResponseChat = ({ id, user, response, setResponse, active }) => {
  const [temp, setTemp] = useState("");
  const [sort, setSort] = useState("New");
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
    let createdAt = new Date(date).toISOString().substring(0, 10);
    return createdAt;
  };
  return (
    <div className="case-data-response">
      <div className="response-header">
        <h1>
          Response{" "}
          {response.filter((id) => id.room === id).length !== 0 &&
            `(${response.filter((id) => id.room === id).length})`}
        </h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          disabled={active === false ? true : false}
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          placeholder={
            active === true
              ? "Write your response here"
              : "You cannot write response to an inactive case"
          }
        ></textarea>
        <div className="case-data-response-btns">
          <button className="sort-response-btn">
            Sort by: {sort}
            <p>
              <HiOutlineChevronDown />
            </p>
          </button>
          <div>
            <div
              className={
                active === false ? "attach-file-btn disable" : "attach-file-btn"
              }
            >
              <HiOutlinePaperClip /> <p>Attach File</p>
            </div>
            <button
              className={active === false ? "disable" : null}
              onClick={() => sendResponse()}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="response-body">
        {response
          .filter((item) => item.room === id)
          .slice(0)
          .reverse()
          .map((e, key) => {
            return (
              <>
                <motion.div className="response-body-message">
                  <div className="avatar"></div>
                  <div className="response">
                    <div className="date">{getDate(e.createdAt)}</div>
                    <h1>{e.user.firstname}</h1>
                    <h2>
                      {e.user.specialization} &#8212; {e.user.designation}
                    </h2>
                    <div className="response-content-container">
                      <p>{e.content}</p>
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
