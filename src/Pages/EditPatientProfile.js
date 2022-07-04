import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { HiChevronLeft, HiDocumentText } from "react-icons/hi";
import { motion } from "framer-motion";
import "./PatientAdmission.css";
import useAuth from "../Hooks/useAuth";
import api from "../API/Api";

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {},
};

const EditPatientProfile = () => {
  const navigate = useNavigate();
  const { toast, ToastContainer, user, setAppState } = useAuth();

  const { state } = useLocation();

  const [civilOther, setCivilOther] = useState(null);
  const [religionOther, setReligionOther] = useState(null);
  const [relationOther, setRelationOther] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [fullname, setFullname] = useState("");
  const [relationship, setRelationship] = useState("");

  const [isClick, setIsClick] = useState(false);

  const handleSubmit = async () => {
    setIsClick(true);
    if (
      !lastname ||
      !firstname ||
      !middlename ||
      !contact ||
      !sex ||
      !birthday ||
      !civilStatus ||
      !religion ||
      !birthplace ||
      !street ||
      !barangay ||
      !city ||
      !ethnicity ||
      !fullname ||
      !relationship
    ) {
      toast.error("All fields are required.");
      setIsClick(false)
    } else {
      try {
        let response = await api.put(
          `/api/patient/update/${user.userId}/${state._id}`,
          {
            firstname,
            middlename,
            lastname,
            contact,
            sex,
            birthday,
            civilStatus,
            religion,
            birthplace,
            street,
            barangay,
            city,
            ethnicity,
            fullname,
            relationship,
          }
        );

        if (response.data.ok) {
          setAppState(`updated one patient${state._id}`);
          setTimeout(() => setAppState(""), 500);
          toast.success("You have successfully updated patient's profile.");        
          setIsClick(false)
        } else {
          toast.error("An unexpected error occured. Please try again");
          setIsClick(false)
        }
      } catch (error) {
        toast.error(error.message);
        setIsClick(false)
      }
    }
  };

  useEffect(() => {
    setLastname(state.lastname);
    setFirstname(state.firstname);
    setMiddlename(state.middlename);
    setSex(state.sex);
    setBirthday(state.birthday);
    setCivilStatus(state.civilStatus);
    setReligion(state.religion);
    setFullname(state.guardian.name);
    setRelationship(state.guardian.relationship);
    setStreet(state.address.street);
    setBarangay(state.address.barangay);
    setCity(state.address.city);
    setBirthplace(state.birthplace);
    setEthnicity(state.ethnicity);
    setContact(state.contact);
  }, []);

  return (
    <>
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
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="content-body"
            >
              <div className="content-wrapper">
                <div className="above-patient-profile">
                  <button onClick={() => navigate(-1)} className="back-btn">
                    <HiChevronLeft /> <p>Back</p>
                  </button>
                  <div className="above-patient-profile-btns">
                    <button
                      className={isClick ? "green-cta-disable" : "green-cta"}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      <p>
                        <HiDocumentText />
                      </p>
                      Save Record
                    </button>
                  </div>
                </div>
                <hr />
                <div className="patient-admission">
                  <div className="admission-form">
                    <h5>Personal Information</h5>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Last name: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          First name: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Middle name: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={middlename}
                          onChange={(e) => setMiddlename(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Sex: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <div>
                          <input
                            value="Male"
                            type="radio"
                            checked={sex === "Male"}
                            onChange={(e) => setSex(e.target.value)}
                          />
                          <label>Male</label>
                        </div>
                        <div>
                          <input
                            value="Female"
                            type="radio"
                            checked={sex === "Female"}
                            onChange={(e) => setSex(e.target.value)}
                          />
                          <label>Female</label>
                        </div>
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Birthday: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Civil Status: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <select
                          value={civilOther === "Other" ? "Other" : civilStatus}
                          onChange={(e) => {
                            setCivilOther(e.target.value);
                            setCivilStatus(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            disabled
                            selected={civilOther === null ? true : false}
                          >
                            - Please Select -
                          </option>

                          <option>Single</option>
                          <option>Married</option>
                          <option>Divorced</option>
                          <option>Widowed</option>
                          <option value="Other">Other</option>
                        </select>
                        {civilOther === "Other" && (
                          <input
                            onChange={(e) => setCivilStatus(e.target.value)}
                            className="other"
                            type="text"
                            placeholder="If other, please specify civil status"
                          />
                        )}
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Religion: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <select
                          value={religionOther === "Other" ? "Other" : religion}
                          onChange={(e) => {
                            setReligionOther(e.target.value);
                            setReligion(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            disabled
                            selected={religionOther === null ? true : false}
                          >
                            - Please Select -
                          </option>

                          <option>Catholic</option>
                          <option>Protestant</option>
                          <option>Islam</option>
                          <option>Buddhism</option>
                          <option>Hinduism</option>
                          <option>Judaism</option>
                          <option value="Other">Other</option>
                        </select>
                        {religionOther === "Other" && (
                          <input
                            onChange={(e) => setReligion(e.target.value)}
                            className="other"
                            type="text"
                            placeholder="If other, please specify religion"
                          />
                        )}
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Guardian: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Relation: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <select
                          value={
                            relationOther === "Other" ? "Other" : relationship
                          }
                          onChange={(e) => {
                            setRelationOther(e.target.value);
                            setRelationship(e.target.value);
                          }}
                        >
                          <option
                            value=""
                            disabled
                            selected={relationOther === null ? true : false}
                          >
                            - Please Select -
                          </option>

                          <option>Mother</option>
                          <option>Father</option>
                          <option>Grand Mother</option>
                          <option>Grand Father</option>
                          <option>Aunt</option>
                          <option>Uncle</option>
                          <option>Brother</option>
                          <option>Sister</option>
                          <option value="Other">Other</option>
                        </select>
                        {relationOther === "Other" && (
                          <input
                            onChange={(e) => setRelationship(e.target.value)}
                            className="other"
                            type="text"
                            placeholder="If other, please specify relationship"
                          />
                        )}
                      </div>
                    </div>
                    <br />
                    <br />
                    <h5>Address Information</h5>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Street: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Barangay: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={barangay}
                          onChange={(e) => setBarangay(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          City: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Place of birth: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={birthplace}
                          onChange={(e) => setBirthplace(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Ethnicity: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={ethnicity}
                          onChange={(e) => setEthnicity(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                    <h5>Contact Information</h5>
                    <div className="admission-2col">
                      <div className="div1">
                        <label>
                          Contact #1: <i>*</i>
                        </label>
                      </div>
                      <div className="div2">
                        <input
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          type="number"
                          placeholder="9876-543-210"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPatientProfile;
