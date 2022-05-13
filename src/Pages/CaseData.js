import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { HiArrowNarrowLeft, HiChevronDown, HiChevronUp } from "react-icons/hi";
import "./Homepage.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CaseData.css";
import api from "../API/Api";
import { AnimatePresence, motion } from "framer-motion";
import ResponseChat from "../Components/ResponseChat";
import PulseLoader from "react-spinners/PulseLoader";
import Toast from "../Components/Toast";
import DeleteCaseModal from "../Components/DeleteCaseModal";
import { DocumentGenerator } from "../Components/DocumentGenerator";
import { buttonVariant, dropdownVariants } from "../Animations/Animations";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useClickOutside } from "../Hooks/useClickOutside";
import NoUser from "../Assets/nouser.png";

const CaseData = () => {
  const [dropdown, setDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [patientCase, setPatientCase] = useState([]);
  const {
    user,
    response,
    cases,
    setResponse,
    appState,
    setAppState,
    setToast,
    setMessage,
    setIsError,
    toast,
    facilities,
  } = useAuth();

  const { id } = useParams();
  let domNode = useClickOutside(() => {
    setDropdown(false);
  });

  useEffect(() => {
    const fetchPatientCase = async () => {
      try {
        let response = await api.get("/api/patient/case");

        if (response) {
          setPatientCase(response.data.filter((item) => item._id === id)[0]);
        } else {
          setPatientCase([]);
        }
      } catch (error) {
        setPatientCase([]);
      }
    };

    fetchPatientCase();
  }, [appState]);

  if (patientCase.length === 0) {
    return (
      <div className="wait-spinner-container">
        <PulseLoader size={10} margin={2} color="#058e46" />
      </div>
    );
  }

  const handleDeactivate = async () => {
    try {
      let response = await api.put(
        `/api/patient/case/deactivate/${patientCase._id}`
      );

      if (response.data.ok) {
        setToast(true);
        setMessage("Successfully deactivated one (1) case.");
        setIsError(false);
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      setToast(true);
      setMessage(error.message);
      setIsError(true);
      setAppState(error.message);
      setTimeout(() => setAppState(""), 500);
    }
  };

  const handleActivate = async () => {
    try {
      let response = await api.put(
        `/api/patient/case/activate/${patientCase._id}`
      );

      if (response.data.ok) {
        setToast(true);
        setMessage("Successfully activated one (1) case.");
        setIsError(false);
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      setToast(true);
      setMessage(error.message);
      setIsError(true);
      setAppState(error.message);
      setTimeout(() => setAppState(""), 500);
    }
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const getDate = (date) => {
    let today = new Date(date);
    let createdAt =
      today.toLocaleString("en-us", { month: "short" }) +
      " " +
      today.getDate() +
      "," +
      " " +
      today.getFullYear();

    return createdAt;
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

  return (
    <>
      <AnimatePresence>
        {deleteModal && (
          <DeleteCaseModal
            id={patientCase._id}
            setDeleteModal={setDeleteModal}
          />
        )}
      </AnimatePresence>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
        />
        <AnimatePresence>{toast && <Toast />}</AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="above-patient-profile">
                <button onClick={() => navigate(-1)} className="back-btn">
                  <HiArrowNarrowLeft /> <p>Back</p>
                </button>

                <div className="above-patient-profile-btns">
                  <motion.button
                    ref={domNode}
                    onClick={() => setDropdown(!dropdown)}
                    className={
                      dropdown
                        ? "action-dropdown-btn-active"
                        : "action-dropdown-btn"
                    }
                  >
                    Actions
                    <p>{dropdown ? <HiChevronUp /> : <HiChevronDown />}</p>
                    <AnimatePresence>
                      {dropdown && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="action-dropdown"
                        ></motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  {/* {patientCase.physician._id === user.userId && (
                    <motion.button
                      variants={buttonVariant}
                      whileTap="tap"
                      onClick={() => setDeleteModal(true)}
                      className="delete-patient-btn"
                    >
                      <p>
                        <HiTrash />
                      </p>
                      Delete
                    </motion.button>
                  )}
                  <motion.button
                    variants={buttonVariant}
                    whileTap="tap"
                    onClick={() => DocumentGenerator()}
                    className="download-btn"
                  >
                    <p>
                      <HiDownload />
                    </p>
                    Download File
                  </motion.button>

                  {patientCase.physician._id === user.userId &&
                    (patientCase.active === true ? (
                      <motion.button
                        variants={buttonVariant}
                        whileTap="tap"
                        onClick={() => handleDeactivate()}
                        className="deactive-btn"
                      >
                        Deactivate
                      </motion.button>
                    ) : (
                      <motion.button
                        variants={buttonVariant}
                        whileTap="tap"
                        onClick={() => handleActivate()}
                        className="active-btn"
                      >
                        Activate
                        <p>
                          <HiCheck />
                        </p>
                      </motion.button>
                    ))} */}
                </div>
              </div>
              <div className="case-container">
                <div className="case-data">
                  <div className="cd-box">
                    <div className="pt-overview">
                      <img src={NoUser} alt="Patient Profile" />
                      <div>
                        <h1>
                          {patientCase.patient.firstname +
                            " " +
                            patientCase.patient.middlename[0] +
                            "." +
                            " " +
                            patientCase.patient.lastname}
                        </h1>
                        <p>Patient - Case ID #{patientCase.caseId}</p>
                      </div>
                    </div>

                    <div className="col-info">
                      <div className="col-2">
                        <div className="liner">
                          <label>Contact</label>{" "}
                          <p>{patientCase.patient.contact}</p>
                        </div>

                        <div className="liner">
                          <label>Sex</label> <p>{patientCase.patient.sex}</p>
                        </div>

                        <div className="liner">
                          <label>Civil Status</label>
                          <p>{patientCase.patient.civilStatus}</p>
                        </div>

                        <div className="liner">
                          <label>Birthday</label>
                          <p>{patientCase.patient.birthday}</p>
                        </div>

                        <div className="liner">
                          <label>Religion</label>
                          <p>{patientCase.patient.religion}</p>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="liner">
                          <label>Address</label>
                          <p>
                            {patientCase.patient.address.barangay +
                              "," +
                              " " +
                              patientCase.patient.address.city}
                          </p>
                        </div>

                        <div className="liner">
                          <label>Birth place</label>
                          <p>{patientCase.patient.birthplace}</p>
                        </div>

                        <div className="liner">
                          <label>Ethnicity</label>
                          <p>{patientCase.patient.ethnicity}</p>
                        </div>

                        <div className="liner">
                          <label>Guardian</label>
                          <p>{patientCase.patient.guardian.name}</p>
                        </div>

                        <div className="liner">
                          <label>Relation</label>
                          <p>{patientCase.patient.guardian.relationship}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cd-box">
                    <h2>Case Information</h2>
                    <div className="col-info info-2">
                      <div className="col-3">
                        <div className="liner">
                          <label>Chief complaint</label>
                          <p>{patientCase.cc}</p>
                        </div>

                        <div className="liner">
                          <label>Pertinent History of Present Illness</label>
                          <p>{patientCase.hpi}</p>
                        </div>

                        <div className="liner">
                          <label>Pertinent Past Medical History</label>
                          <p>{patientCase.pmh}</p>
                        </div>
                        <div className="liner">
                          <label>Pertinent Review of Systems</label>
                          <p>{patientCase.ros}</p>
                        </div>
                        <div className="liner">
                          <label>Pertinent PE Findings</label>
                          <p>{patientCase.pe}</p>
                        </div>
                        <div className="liner">
                          <label>Pertinent Paraclinicals</label>
                          <p></p>
                        </div>
                        <div className="liner">
                          <label>Working Impression</label>
                          <p>{patientCase.wi}</p>
                        </div>

                        <div className="liner">
                          <label>Initial Management Done</label>
                          <p>{patientCase.imd}</p>
                        </div>
                        <div className="liner">
                          <label>Reason for Referral</label>
                          <p>{patientCase.reason}</p>
                        </div>
                      </div>

                      <div className="col-1">
                        <div className="liner">
                          <label>Temperature:</label>{" "}
                          <p> {patientCase.temperature}</p>
                        </div>
                        <div className="liner">
                          <label>Respiratory Rate:</label>
                          <p> {patientCase.respiratory}</p>
                        </div>
                        <div className="liner">
                          <label>Heart Rate:</label> <p> {patientCase.heart}</p>
                        </div>
                        <div className="liner">
                          <label>Blood Pressure:</label>{" "}
                          <p> {patientCase.blood}</p>
                        </div>
                        <div className="liner">
                          <label>Oxygen Saturation:</label>{" "}
                          <p> {patientCase.oxygen}</p>
                        </div>
                        <div className="liner">
                          <label>Weight:</label> <p> {patientCase.weight}</p>
                        </div>
                        <div className="liner">
                          <label>Height: </label> <p>{patientCase.height}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ResponseChat
                    id={patientCase._id}
                    user={user}
                    response={response}
                    setResponse={setResponse}
                    active={patientCase.active}
                  />
                </div>
                <div className="case-hospital">
                  <div className="case-hospital-header">
                    <h2>Referring Hospital</h2>

                    <label>Hospital</label>
                    <p>
                      {facilities
                        .filter(
                          (e) => e._id === patientCase.physician.designation
                        )
                        .map((f) => {
                          return f.facility;
                        })}
                    </p>

                    <label>Attending Pysician</label>
                    <p>
                      Dr.{" "}
                      {patientCase.physician.firstname +
                        " " +
                        patientCase.physician.lastname}
                    </p>

                    <label>Specialization</label>
                    <p>
                      {
                        facilities
                          .filter(
                            (e) => e._id === patientCase.physician.designation
                          )
                          .map((f) => {
                            return f.specialization.filter(
                              (g) =>
                                g._id === patientCase.physician.specialization
                            )[0];
                          })[0].name
                      }
                    </p>

                    <label>Date & Time</label>
                    <p>
                      {getDate(patientCase.createdAt) +
                        " " +
                        getTime(patientCase.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="case-data">
                <div className="case-data-profile">
                  <h1>Patient Information</h1>

                  <div className="case-data-separator">
                    <div className="case-data-2col">
                      <label>Full name</label>
                      <p>
                        {patientCase.patient.firstname +
                          " " +
                          patientCase.patient.middlename[0] +
                          "." +
                          " " +
                          patientCase.patient.lastname}
                      </p>

                      <label>Contact no.</label>
                      <p>{patientCase.patient.contact}</p>

                      <label>Age</label>
                      <p>{getAge(patientCase.patient.birthday)}</p>

                      <label>Sex</label>
                      <p>{patientCase.patient.sex}</p>

                      <label>Civil status</label>
                      <p>{patientCase.patient.civilStatus}</p>

                      <label>Birthday</label>
                      <p>{patientCase.patient.birthday}</p>
                    </div>
                    <div className="case-data-2col">
                      <label>Religion</label>
                      <p>{patientCase.patient.religion}</p>

                      <label>Birth place</label>
                      <p>{patientCase.patient.birthplace}</p>

                      <label>Address</label>
                      <p>
                        {patientCase.patient.address.barangay +
                          "," +
                          " " +
                          patientCase.patient.address.city}
                      </p>

                      <label>Ethnicity</label>
                      <p>{patientCase.patient.ethnicity}</p>

                      <label>Legal guardian</label>
                      <p>{patientCase.patient.guardian.name}</p>

                      <label>Relation</label>
                      <p>{patientCase.patient.guardian.relationship}</p>
                    </div>
                  </div>
                </div>
                <div className="case-data-hospital">
                  <h1>Referring Hospital</h1>

                  <label>Hospital</label>
                  <p>
                    {facilities
                      .filter(
                        (e) => e._id === patientCase.physician.designation
                      )
                      .map((f) => {
                        return f.facility;
                      })}
                  </p>

                  <label>Attending Pysician</label>
                  <p>
                    Dr.{" "}
                    {patientCase.physician.firstname +
                      " " +
                      patientCase.physician.lastname}
                  </p>

                  <label>Specialization</label>
                  <p>
                    {
                      facilities
                        .filter(
                          (e) => e._id === patientCase.physician.designation
                        )
                        .map((f) => {
                          return f.specialization.filter(
                            (g) =>
                              g._id === patientCase.physician.specialization
                          )[0];
                        })[0].name
                    }
                  </p>

                  <label>Date & Time</label>
                  <p>
                    {getDate(patientCase.createdAt) +
                      " " +
                      getTime(patientCase.createdAt)}
                  </p>
                </div>
              </div> */}
              {/* <div className="case-information">
                <h1>Case {patientCase.caseId}</h1>

                <div className="case-data-separator">
                  <div className="case-data-2col case">
                    <label>Chief complaint</label>
                    <p>{patientCase.cc}</p>

                    <label>Pertinent History of Present Illness</label>
                    <p>{patientCase.hpi}</p>

                    <label>Pertinent Past Medical History</label>
                    <p>{patientCase.pmh}</p>

                    <label>Pertinent Review of Systems</label>
                    <p>{patientCase.ros}</p>

                    <label>Pertinent PE Findings</label>
                    <p>{patientCase.pe}</p>

                    <label>Pertinent Paraclinicals</label>
                    <p></p>

                    <label>Working Impression</label>
                    <p>{patientCase.wi}</p>

                    <label>Initial Management Done</label>
                    <p>{patientCase.imd}</p>

                    <label>Reason for Referral</label>
                    <p>{patientCase.reason}</p>
                  </div>

                  <div className="case-data-2col vital-signs">
                    <h5>Vital Signs</h5>
                    <p>Temperature: {patientCase.temperature}</p>
                    <p>Respiratory Rate: {patientCase.respiratory}</p>
                    <p>Heart Rate: {patientCase.heart}</p>
                    <p>Blood Pressure: {patientCase.blood}</p>
                    <p>Oxygen Saturation: {patientCase.oxygen}</p>
                    <p>Weight: {patientCase.weight}</p>
                    <p>Height: {patientCase.height}</p>
                  </div>
                </div>
              </div>
               */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseData;
