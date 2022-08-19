//This is a context file
//Global state management for fetching data from the server and defining global state

import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const CaseDataContext = createContext({});

export const CaseDataProvider = ({ children }) => {
  const [patientId, setPatientId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [temperature, setTemperature] = useState("");
  const [respiratory, setRespiratory] = useState("");
  const [heart, setHeart] = useState("");
  const [blood, setBlood] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [cc, setCc] = useState("");
  const [hpi, setHpi] = useState("");
  const [pmh, setPmh] = useState("");
  const [ros, setRos] = useState("");
  const [pe, setPe] = useState("");
  const [paraclinical, setParaclinical] = useState([]);
  const [wi, setWi] = useState("");
  const [imd, setImd] = useState("");
  const [reason, setReason] = useState("");
  return (
    <CaseDataContext.Provider
      value={{
        patientId,
        setPatientId,
        specialization,
        setSpecialization,
        temperature,
        setTemperature,
        respiratory,
        setRespiratory,
        heart,
        setHeart,
        blood,
        setBlood,
        oxygen,
        setOxygen,
        weight,
        setWeight,
        height,
        setHeight,
        cc,
        setCc,
        hpi,
        setHpi,
        pmh,
        setPmh,
        ros,
        setRos,
        pe,
        setPe,
        paraclinical,
        setParaclinical,
        wi,
        setWi,
        imd,
        setImd,
        reason,
        setReason,
      }}
    >
      {children}
    </CaseDataContext.Provider>
  );
};

export default CaseDataContext;
