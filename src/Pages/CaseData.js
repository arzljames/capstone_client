import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { HiArrowNarrowLeft, HiChevronDown, HiChevronUp } from "react-icons/hi";
import "./Homepage.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import useAuth from "../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import "./CaseData.css";
import api from "../API/Api";
import { AnimatePresence, motion } from "framer-motion";
import ResponseChat from "../Components/ResponseChat";
import PulseLoader from "react-spinners/PulseLoader";
import DeleteCaseModal from "../Components/DeleteCaseModal";
import { DocumentGenerator } from "../Components/DocumentGenerator";
import { buttonVariant, dropdownVariants } from "../Animations/Animations";
import { useClickOutside } from "../Hooks/useClickOutside";
import NoUser from "../Assets/nouser.png";
import AddServiceModal from "../Components/AddServiceModal";

const CaseData = () => {
  const [modal, setModal] = useState(false);
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
    toast,
    ToastContainer,
    facilities,
    specializations,
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

  const handleDeactivate = async () => {
    try {
      let response = await api.put(
        `/api/patient/case/deactivate/${patientCase._id}`
      );

      if (response.data.ok) {
        toast.warning("Deactivated one case.");
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      toast.error(error.message);
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
        toast.success("Activated one case.");
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      toast.error(error.message);
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

  if (patientCase.length === 0) {
    return (
      <div className="wait-spinner-container">
        <PulseLoader size={10} margin={2} color="#058e46" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {deleteModal && (
          <DeleteCaseModal
            id={patientCase._id}
            setDeleteModal={setDeleteModal}
          />
        )}

        {modal && (
          <AddServiceModal
            setModal={setModal}
            id={patientCase._id}
            toast={toast}
            ToastContainer={ToastContainer}
            service={patientCase.specialization}
            subSpecialization={patientCase.subSpecialization}
          />
        )}
      </AnimatePresence>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
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

                <div ref={domNode} className="above-patient-profile-btns">
                  <motion.button
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
                        >
                          <ul>
                            <li
                              className={
                                user.designation !==
                                  "623ec7fb80a6838424edaa29" && "disable"
                              }
                              onClick={() => setModal(true)}
                            >
                              Add Sub-service
                            </li>
                            {patientCase.active === true ? (
                              <li
                                className={
                                  user.designation !==
                                    "623ec7fb80a6838424edaa29" && "disable"
                                }
                                onClick={() => handleDeactivate()}
                              >
                                Deactivate
                              </li>
                            ) : (
                              <li
                                className={
                                  user.designation !==
                                    "623ec7fb80a6838424edaa29" && "disable"
                                }
                                on
                                onClick={() => handleActivate()}
                              >
                                Activate
                              </li>
                            )}
                            <li onClick={() => DocumentGenerator(patientCase)}>
                              Download File
                            </li>

                            <li
                              onClick={() => setDeleteModal(true)}
                              className={
                                user.designation !== "623ec7fb80a6838424edaa29"
                                  ? "disable"
                                  : "delete"
                              }
                            >
                              Delete Case
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
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
                        <p>Case ID #{patientCase.caseId}</p>
                      </div>

                      <div className="cs-status absolute">
                        <h5>Status: </h5>
                        <p className={patientCase.active ? "active" : "done"}>
                          {patientCase.active ? "Active" : "Done"}
                        </p>
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
                          <p>
                            {getDate(patientCase.patient.birthday)}
                            {" " + "("}
                            {getAge(patientCase.patient.birthday) + "yrs)"}
                          </p>
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
                          {patientCase.paraclinical.file ? (
                            <p>
                              <a
                                href={patientCase.paraclinical.file}
                                target="_blank"
                              >
                                Attachment File
                              </a>
                            </p>
                          ) : (
                            <em>
                              <p>No attached file</p>
                            </em>
                          )}
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

                <div>
                  <div
                    style={{ marginBottom: "20px" }}
                    className={
                      patientCase.active
                        ? "case-hospital-active"
                        : "case-hospital-inactive"
                    }
                  >
                    <div className="case-hospital-header">
                      <h2>Service Type</h2>
                      <p>
                        {specializations
                          .filter((e) => {
                            return patientCase.specialization.includes(e._id);
                          })
                          .map((item, index) => {
                            return <li key={index}>{item.specialization}</li>;
                          })}
                      </p>

                      {!patientCase.subSpecialization ||
                      patientCase.subSpecialization.length === 0 ? null : (
                        <>
                          <br />
                          <hr />
                          <br />
                          <h2>Sub-service Type</h2>
                          <p>
                            {patientCase.subSpecialization.map(
                              (item, index) => {
                                return (
                                  <li key={index}>{item.specialization}</li>
                                );
                              }
                            )}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      patientCase.active
                        ? "case-hospital-active"
                        : "case-hospital-inactive"
                    }
                  >
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

                      <label>Date Created</label>
                      <p>
                        {getDate(patientCase.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseData;
