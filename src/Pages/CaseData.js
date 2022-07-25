import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import {
  HiArrowNarrowLeft,
  HiCheck,
  HiChevronDown,
  HiChevronUp,
  HiDocumentRemove,
  HiDownload,
  HiPlus,
  HiTrash,
  HiX,
} from "react-icons/hi";
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
import {
  IoArrowRedoOutline,
  IoCaretDown,
  IoCaretForward,
} from "react-icons/io5";
import FollowModal from "../Components/FollowModal";
import { socket } from "../Components/Socket";

const CaseData = () => {
  const [modal, setModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [patientCase, setPatientCase] = useState([]);
  const [followModal, setFollowModal] = useState(false);
  const [expand, setExpand] = useState(false);
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

  const [tabb, setTabb] = useState("Main");
  const [followUpData, setFollowUpData] = useState([]);
  const [served, setServed] = useState(null);

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

  useEffect(() => {
    socket.on("receive_response", (data) => {
      setResponse(data);
    });
  }, [socket]);

  const fetchResponse = async () => {
    let result = await api.get("/api/message");
    if (result.data) {
      setResponse(result.data);
      setServed(
        result.data
          .filter((e) => e.room === patientCase._id)
          .filter((f) => f.user?.designation === "623ec7fb80a6838424edaa29")[0]
          .createdAt
      );
    }
  };

  useEffect(() => {
    fetchResponse();
  }, [socket, response]);

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

        {followModal && (
          <FollowModal
            toast={toast}
            setFollowModal={setFollowModal}
            id={patientCase._id}
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
                            {user.designation ===
                              "623ec7fb80a6838424edaa29" && (
                              <li onClick={() => setModal(true)}>
                                <p>
                                  <HiPlus />
                                </p>
                                Add Sub-service
                              </li>
                            )}

                            {user.designation ===
                              "623ec7fb80a6838424edaa29" && (
                              <>
                                {patientCase.active === "Active" ||
                                patientCase.active === "Pending" ? (
                                  <li onClick={() => handleDeactivate()}>
                                    <p>
                                      <HiX />
                                    </p>{" "}
                                    Deactivate
                                  </li>
                                ) : (
                                  <li on onClick={() => handleActivate()}>
                                    <p>
                                      <HiCheck />
                                    </p>
                                    Activate
                                  </li>
                                )}
                              </>
                            )}

                            <li onClick={() => DocumentGenerator(patientCase)}>
                              <p>
                                <HiDownload />
                              </p>{" "}
                              Download File
                            </li>

                            {user.designation ===
                              "623ec7fb80a6838424edaa29" && (
                              <li
                                onClick={() => setDeleteModal(true)}
                                className="delete"
                              >
                                <p>
                                  <HiTrash />
                                </p>{" "}
                                Delete Case
                              </li>
                            )}

                            {user.designation !==
                              "623ec7fb80a6838424edaa29" && (
                              <li
                                style={{
                                  border: "none",
                                }}
                                onClick={() => setFollowModal(true)}
                              >
                                <p>
                                  <IoArrowRedoOutline />
                                </p>
                                Add Follow up
                              </li>
                            )}
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
                        <h5 style={{ marginRight: "5px" }}>Status:</h5>{" "}
                        <p
                          className={
                            patientCase.active === "Active"
                              ? "active"
                              : patientCase.active === "Done"
                              ? "done"
                              : "pending"
                          }
                        >
                          {patientCase.active === "Active"
                            ? "Active"
                            : patientCase.active === "Done"
                            ? "Done"
                            : "Pending"}
                        </p>
                      </div>
                    </div>

                    {expand === false && (
                      <p onClick={() => setExpand(true)} className="expand">
                        Show more <IoCaretDown style={{ marginLeft: "5px" }} />
                      </p>
                    )}

                    {expand && (
                      <p onClick={() => setExpand(false)} className="expand">
                        Show less{" "}
                        <IoCaretForward style={{ marginLeft: "5px" }} />
                      </p>
                    )}

                    {expand && (
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

                          <div className="liner">
                            <label>Address</label>
                            <p>
                              {patientCase.patient.address.barangay +
                                "," +
                                " " +
                                patientCase.patient.address.city}
                            </p>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="liner">
                            <label>Birth place</label>
                            <p>{patientCase.patient.birthplace}</p>
                          </div>

                          <div className="liner">
                            <label>Ethnicity</label>
                            <p>{patientCase.patient.ethnicity}</p>
                          </div>

                          <div className="liner">
                            <label>Dialect</label>
                            <p>{patientCase.patient.dialect}</p>
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
                    )}
                  </div>

                  {tabb === "Main" ? (
                    <div className="cd-box">
                      <h2>Case Information - Main</h2>
                      <div className="col-info info-2">
                        <div className="col-3">
                          <div className="liner">
                            <label>Chief complaint</label>

                            <textarea
                              disabled
                              value={patientCase.cc}
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Pertinent History of Present Illness</label>

                            <textarea
                              disabled
                              value={patientCase.hpi}
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Pertinent Past Medical History</label>
                            <textarea
                              disabled
                              value={patientCase.pmh}
                            ></textarea>
                          </div>
                          <div className="liner">
                            <label>Pertinent Review of Systems</label>
                            <textarea
                              disabled
                              value={patientCase.ros}
                            ></textarea>
                          </div>
                          <div className="liner">
                            <label>Pertinent PE Findings</label>
                            <textarea
                              disabled
                              value={patientCase.pe}
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Working Impression</label>
                            <textarea
                              disabled
                              value={patientCase.wi}
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Initial Management Done</label>
                            <textarea
                              disabled
                              value={patientCase.imd}
                            ></textarea>
                          </div>
                          <div className="liner">
                            <label>Reason for Referral</label>
                            <textarea
                              disabled
                              value={patientCase.reason}
                            ></textarea>
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
                        </div>

                        <div className="col-1">
                          <div className="liner">
                            <label>Temperature:</label>{" "}
                            <input
                              disabled
                              value={patientCase.temperature}
                              type="text"
                            />
                          </div>
                          <div className="liner">
                            <label>Respiratory Rate:</label>
                            <input
                              disabled
                              value={patientCase.respiratory}
                              type="text"
                            />
                          </div>
                          <div className="liner">
                            <label>Heart Rate:</label>{" "}
                            <input
                              disabled
                              value={patientCase.heart}
                              type="text"
                            />
                          </div>
                          <div className="liner">
                            <label>Blood Pressure:</label>{" "}
                            <input
                              disabled
                              value={patientCase.blood}
                              type="text"
                            />
                          </div>
                          <div className="liner">
                            <label>Oxygen Saturation:</label>{" "}
                            <input
                              disabled
                              value={patientCase.oxygen}
                              type="text"
                            />
                          </div>
                          <div className="liner">
                            <label>Weight:</label>{" "}
                            <input
                              disabled
                              value={patientCase.weight}
                              type="text"
                            />
                          </div>
                          <div className="liner">
                            <label>Height: </label>{" "}
                            <input
                              disabled
                              value={patientCase.height}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="cd-box">
                      <h2>
                        Follow Up - {getDate(followUpData.createdAt)}{" "}
                        {getTime(followUpData.createdAt)}
                      </h2>
                      <div className="col-info info-2">
                        <div className="col-3">
                          <div className="liner">
                            <label>Chief complaint</label>

                            <textarea
                              value={
                                !followUpData.cc ? "(No Data)" : followUpData.cc
                              }
                              disabled
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Pertinent History of Present Illness</label>

                            <textarea
                              value={
                                !followUpData.hpi
                                  ? "(No Data)"
                                  : followUpData.hpi
                              }
                              disabled
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Pertinent Past Medical History</label>

                            <textarea
                              value={
                                !followUpData.pmh
                                  ? "(No Data)"
                                  : followUpData.pmh
                              }
                              disabled
                            ></textarea>
                          </div>
                          <div className="liner">
                            <label>Pertinent Review of Systems</label>
                            <textarea
                              value={
                                !followUpData.ros
                                  ? "(No Data)"
                                  : followUpData.ros
                              }
                              disabled
                            ></textarea>
                          </div>
                          <div className="liner">
                            <label>Pertinent PE Findings</label>
                            <textarea
                              value={
                                !followUpData.pe ? "(No Data)" : followUpData.pe
                              }
                              disabled
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Working Impression</label>
                            <textarea
                              value={
                                !followUpData.wi ? "(No Data)" : followUpData.wi
                              }
                              disabled
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Initial Management Done</label>
                            <textarea
                              value={
                                !followUpData.imd
                                  ? "(No Data)"
                                  : followUpData.imd
                              }
                              disabled
                            ></textarea>
                          </div>

                          <div className="liner">
                            <label>Pertinent Paraclinicals</label>
                            {followUpData.paraclinical.file ? (
                              <p>
                                <a
                                  href={followUpData.paraclinical.file}
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
                        </div>

                        <div className="col-1">
                          <div className="liner">
                            <label>Temperature:</label>{" "}
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.temperature
                                  ? "(No Data)"
                                  : followUpData.temperature
                              }
                            />
                          </div>
                          <div className="liner">
                            <label>Respiratory Rate:</label>
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.respiratory
                                  ? "(No Data)"
                                  : followUpData.respiratory
                              }
                            />
                          </div>
                          <div className="liner">
                            <label>Heart Rate:</label>{" "}
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.heart
                                  ? "(No Data)"
                                  : followUpData.heart
                              }
                            />
                          </div>
                          <div className="liner">
                            <label>Blood Pressure:</label>{" "}
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.blood
                                  ? "(No Data)"
                                  : followUpData.blood
                              }
                            />
                          </div>
                          <div className="liner">
                            <label>Oxygen Saturation:</label>{" "}
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.oxygen
                                  ? "(No Data)"
                                  : followUpData.oxygen
                              }
                            />
                          </div>
                          <div className="liner">
                            <label>Weight:</label>
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.weight
                                  ? "(No Data)"
                                  : followUpData.weight
                              }
                            />
                          </div>
                          <div className="liner">
                            <label>Height: </label>{" "}
                            <input
                              type="text"
                              disabled
                              value={
                                !followUpData.height
                                  ? "(No Data)"
                                  : followUpData.height
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                      patientCase.active === "Active"
                        ? "case-hospital-active"
                        : patientCase.active === "Done"
                        ? "case-hospital-inactive"
                        : "case-hospital-pending"
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
                      patientCase.active === "Active"
                        ? "case-hospital-active"
                        : patientCase.active === "Done"
                        ? "case-hospital-inactive"
                        : "case-hospital-pending"
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

                      <label>Date & Time of referral</label>
                      <p>
                        {getDate(patientCase.createdAt)}{" "}
                        {getTime(patientCase.createdAt)}
                      </p>

                      {served !== null && (
                        <>
                          <label>Date & Time served</label>

                          <p>
                            {getDate(served)} {getTime(served)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="followups-container">
                    <h1>
                      {patientCase.followUp.length <= 0
                        ? 0
                        : patientCase.followUp.length}{" "}
                      Follow Ups
                    </h1>
                    <div
                      onClick={() => setTabb("Main")}
                      className={
                        tabb === "Main" ? "followups-active" : "followups"
                      }
                    >
                      Main (Initial)
                    </div>
                    {patientCase.followUp.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setTabb(item._id);
                            setFollowUpData(item);
                          }}
                          className={
                            tabb === item._id ? "followups-active" : "followups"
                          }
                        >
                          {getDate(item.createdAt)} - {getTime(item.createdAt)}
                        </div>
                      );
                    })}
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
