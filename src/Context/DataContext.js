//This is a context file
//Global state management for fetching data from the server and defining global state

import { createContext, useState, useEffect } from "react";
import api from "../API/Api";
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [appState, setAppState] = useState("");
  const [pending, setPending] = useState([]);
  const [status, setStatus] = useState("");
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [toast, setToast] = useState(false);
  const [tab, setTab] = useState("General");
  const [cases, setCases] = useState([]);
  const [patientCases, setPatientCases] = useState([]);
  const [response, setResponse] = useState([]);
  const [notification, setNotification] = useState([]);
  const [hospitalSpec, setHospitalSpec] = useState([]);

  const fetchLogin = async () => {
    let response = await api.get("/api/auth/login");



    if (response.data.loggedIn) {
      setUser(response.data);
    } else {
      setUser({
        loggedIn: false,
        userId: "",
        userType: "",
      });
    }
  };

  const fetchUsers = async () => {
    let response = await api.get("/api/user/users");

    if (response.data) {
      setListUsers(response.data);
      setPending(response.data.filter((e) => e.verified === false));
    }
  };

  const fetchFacilities = async () => {
    let response = await api.get("/api/facility/");

    if (response.data) {
      setFacilities(response.data);
    }
  };

  const fetchPatients = async () => {
    let response = await api.get("/api/patient/");

    if (response.data) {
      setPatients(response.data);
    }
  };

  const fetchCases = async () => {
    let response = await api.get("/api/patient/case");

    if (response.data) {
      setCases(response.data);
    }
  };

  const getSpec = async () => {
    let response = await api.get("/api/facility/get-spec");

    if (response.data) {
      setHospitalSpec(response.data);
    }
  };



  useEffect(() => {
    fetchLogin();
    fetchUsers();
    fetchFacilities();
    getSpec();
    fetchCases();
  }, [appState]);

  useEffect(() => {
    fetchPatients();
  }, [appState]);

  const [hospital, setHospital] = useState("");
  const [department, setDepartment] = useState("");










  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        listUsers,
        facilities,
        appState,
        setAppState,
        pending,
        status,
        setStatus,
        patients,
        setPatients,
        message,
        setMessage,
        toast,
        setToast,
        isError,
        setIsError,
        tab,
        setTab,
        cases,
        setCases,
        patientCases,
        setPatientCases,
        setResponse,
        response,
        notification,
        setNotification,
        hospital,
        setHospital,
        department,
        setDepartment,
        hospitalSpec,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
