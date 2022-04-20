import React, { useState, useEffect } from "react";
import { formVariant, containerVariant } from "../Animations/Animations";
import { motion } from "framer-motion";
import { useClickOutside } from "../Hooks/useClickOutside";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";
import { toast } from "react-toastify";

const FilterReportModal = ({ setFilterModal }) => {
  let domNode = useClickOutside(() => {
    setFilterModal(false);
  });

  const { facilities, listUsers, user, setAppState } = useAuth();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [refer, setRefer] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isClick, setIsClick] = useState(false);

  const [reportId, setReportId] = useState("");

  useEffect(() => {
    const getDate = () => {
      var myDate = new Date();

      var year = myDate.getFullYear();

      var month = myDate.getMonth() + 1;
      if (month <= 9) month = "0" + month;

      var day = myDate.getDate();
      if (day <= 9) day = "0" + day;

      var time = myDate.getMilliseconds();
      var hour = myDate.getHours();

      if (hour <= 9) hour = "0" + hour;

      var prettyDate = month + day + year;

      return prettyDate;
    };

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    setReportId(getDate() + "-" + makeid(5));
  }, [from, to, age]);

  const handleSubmit = async () => {
    setIsClick(true);
    try {
      let response = await api.post("/api/report/create", {
        from,
        to,
        gender,
        age,
        refer,
        specialization,
        reportId,
        creator: user.userId,
      });

      if (response.data.ok) {
        toast.success("Created new report", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        setAppState("Created new report.");
        setTimeout(() => setAppState(""), 500);
        setFilterModal(false);
        setIsClick(false);
      }
    } catch (error) {
      console.log(error);
      setIsClick(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
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
        className="filter-modal"
      >
        <div className="filter-modal-header">
          <h1>Create Report</h1>
        </div>
        <div className="filter-modal-body">
          <div className="date-range">
            <div>
              <label>From</label>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                type="date"
              />
            </div>
            <div>
              <label>To</label>{" "}
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                type="date"
              />
            </div>
          </div>

          <div className="date-range">
            <div>
              <label>Sex</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Not set</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label>Age Bracket (0 - {age} )</label>{" "}
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
              />
            </div>
          </div>

          <label>Referring Hospital</label>
          <select value={refer} onChange={(e) => setRefer(e.target.value)}>
            <option value="">Not set</option>

            {facilities
              .filter((e) => e._id !== "623ec7fb80a6838424edaa29")
              .map((item, index) => {
                return (
                  <option key={index} selected value={item._id}>
                    {item.facility}
                  </option>
                );
              })}
          </select>

          <label>Service Type</label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">Not set</option>
            {facilities
              .filter((e) => e._id === "623ec7fb80a6838424edaa29")
              .map((item, index) => {
                return item.specialization.map((f) => {
                  return (
                    <option key={index} selected value={f._id}>
                      {f.name}
                    </option>
                  );
                });
              })}
          </select>
        </div>
        <div className="filter-modal-footer">
          <div className="btns">
            <button onClick={() => setFilterModal(false)} className="close">
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className={isClick ? "apply-disable" : "apply"}
            >
              Generate
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FilterReportModal;
