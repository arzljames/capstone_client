import React, { useState, useRef, useEffect } from "react";
import { HiOutlinePaperClip, HiOutlineChevronDown } from "react-icons/hi";
import api from "../API/Api";
import { socket } from "./Socket";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import { IoSend } from "react-icons/io5";

const ResponseChat = ({ id, user, response, setResponse, active }) => {
  const [file, setFile] = useState("");

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

  const { facilities } = useAuth();

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="case-data-response">
      <div className="response-header">
        <h1>
          Response
          {response.filter((e) => e.room === id).length !== 0 &&
            `(${response.filter((e) => e.room === id).length})`}
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
        <div className="case-data-response-btns">
          {/* <button className="sort-response-btn">
            Sort by: {sort}
            <p>
              <HiOutlineChevronDown />
            </p>
          </button> */}
          <p></p>
          <div>
            {/* <div
              onClick={() => onBtnClick()}
              className={
                active === false ? "attach-file-btn disable" : "attach-file-btn"
              }
            >
              <HiOutlinePaperClip />
              <input ref={inputFileRef} type="file" />
            </div> */}
            <button
              className={active === false ? "disable" : null}
              onClick={() => sendResponse()}
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
          .slice(0)
          .reverse()
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
                    <h2>
                      {
                        facilities.filter(
                          (hospital) => hospital._id === e.user.designation
                        )[0].facility
                      }
                      <br />
                    </h2>

                    {/* <h2>
                      {
                        facilities
                          .filter(
                            (hospital) => hospital._id === e.user.designation
                          )
                          .map((f) => {
                            return f.specialization.filter(
                              (g) => g._id === e.user.specialization
                            )[0];
                          })[0].name
                      }
                    </h2> */}
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
