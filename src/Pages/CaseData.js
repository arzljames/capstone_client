import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import {
  HiChevronLeft,
  HiDocumentText,
  HiX,
  HiCheck,
  HiDownload,
  HiTrash,
} from "react-icons/hi";
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

const CaseData = () => {
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
  } = useAuth();

  const { id } = useParams();
  const { state } = useLocation();

  // useEffect(() => {
  //   const joinRoom = () => {
  //     socket.emit("join_room", id);
  //   };
  //   joinRoom();
  // }, []);

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
        <AnimatePresence>{toast && <Toast />}</AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="above-patient-profile">
                <button onClick={() => navigate(-1)} className="back-btn">
                  <HiChevronLeft /> <p>Back</p>
                </button>

                <div className="above-patient-profile-btns">
                  {patientCase.physician._id === user.userId && (
                    <button
                      onClick={() => setDeleteModal(true)}
                      className="delete-patient-btn"
                    >
                      <p>
                        <HiTrash />
                      </p>
                      Delete
                    </button>
                  )}
                  <button className="download-btn">
                    <p>
                      <HiDownload />
                    </p>
                    Export
                  </button>

                  {patientCase.physician._id === user.userId &&
                    (patientCase.active === true ? (
                      <button
                        onClick={() => handleDeactivate()}
                        className="deactive-btn"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate()}
                        className="active-btn"
                      >
                        Activate
                        <p>
                          <HiCheck />
                        </p>
                      </button>
                    ))}
                </div>
              </div>
              <div className="case-data">
                <div className="case-data-separator">
                  <div>
                    <div className="case-data-2col">
                      <h5>Patient Information</h5>
                      <p>
                        <b>Full name:</b> {patientCase.patient.fullname}
                      </p>

                      <p>
                        <b>Contact #:</b> {patientCase.patient.contact}
                      </p>

                      <p>
                        <b>Age/Sex:</b>
                        {getAge(patientCase.patient.birthday) +
                          " " +
                          patientCase.patient.sex}
                      </p>

                      <p>
                        <b>Civil Status:</b> {patientCase.patient.civilStatus}
                      </p>

                      <p>
                        <b>Birthday:</b> {patientCase.patient.birthday}
                      </p>

                      <p>
                        <b>Religion:</b> {patientCase.patient.religion}
                      </p>

                      <p>
                        <b>Birth Place:</b> {patientCase.patient.birthplace}
                      </p>

                      <p>
                        <b>Adress:</b> {patientCase.patient.address.barangay}
                      </p>

                      <p>
                        <b>Ethnicity:</b> {patientCase.patient.ethnicity}
                      </p>

                      <p>
                        <b>Legal Guardian:</b>
                        {patientCase.patient.guardian.name}
                      </p>

                      <p>
                        <b>Relation:</b>
                        {patientCase.patient.guardian.relationship}
                      </p>
                    </div>

                    <div className="case-data-2col">
                      <h5>Referring Hospital</h5>
                      <p>
                        <b>Hospital:</b>
                        <p> {patientCase.physician.designation}</p>
                      </p>

                      <p>
                        <b>Attending Physician:</b>
                        <p>
                          Dr.{" "}
                          {patientCase.physician.firstname +
                            " " +
                            patientCase.physician.lastname}
                        </p>
                      </p>

                      <p>
                        <b>Specialization:</b>
                        <p>{patientCase.physician.specialization}</p>
                      </p>

                      <p>
                        <b>Date / Time:</b>
                        <p>
                          {getDate(patientCase.createdAt) +
                            " " +
                            getTime(patientCase.createdAt)}
                        </p>
                      </p>
                    </div>
                  </div>

                  <hr />
                </div>

                <div className="case-data-separator">
                  <div>
                    <div className="case-data-2col">
                      <h5>Case Information</h5>
                      <p>
                        <b>Chief Complaint:</b>
                        <p>{patientCase.cc}</p>
                      </p>
                      <p>
                        <b>Pertinent History of Present Illness:</b>

                        <p> {patientCase.hpi}</p>
                      </p>
                      <p>
                        <b>Pertinent Past Medical History: </b>

                        <p> {patientCase.pmh}</p>
                      </p>
                      <p>
                        <b>Pertinent Review of Systems:</b>
                        <p>{patientCase.ros}</p>
                      </p>

                      <p>
                        <b>Vital Signs:</b>
                        <br />
                        <p>Temperature: {patientCase.temperature} </p>
                        <p> Respiratory Rate: {patientCase.respiratory}</p>
                        <p>Heart Rate: {patientCase.heart} </p>
                        <p>Blood Pressure: {patientCase.blood} </p>
                        <p>Oxygen Saturation: {patientCase.oxygen} </p>
                        <p> Weight (KG): {patientCase.weight} </p>
                        <p>Height: (CM): {patientCase.height}</p>
                      </p>
                    </div>
                    <div className="case-data-2col">
                      <h5 style={{ opacity: 0, pointerEvents: "none" }}>.</h5>
                      <p>
                        <b>Pertinent PE Findings: :</b> <p>{patientCase.pe}</p>
                      </p>
                      <p>
                        <b>Pertinent Paraclinicals:</b>
                        {!patientCase.paraclinical.name ? (
                          <p>No File</p>
                        ) : (
                          <div className="file-download">
                            <HiDocumentText color="#808080" />
                            <a href={patientCase.paraclinical.file}>
                              <p>{patientCase.paraclinical.name} </p>
                            </a>
                          </div>
                        )}
                      </p>
                      <p>
                        <b>Working Impression:</b> <p>{patientCase.wi}</p>
                      </p>

                      <p>
                        <b>Initial Management Done:</b> <p>{patientCase.imd}</p>
                      </p>

                      <p>
                        <b>Reason for Referral:</b> <p>{patientCase.reason}</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <ResponseChat
                id={id}
                user={user}
                response={response}
                setResponse={setResponse}
                active={patientCase.active}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseData;