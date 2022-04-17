import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import { Helmet } from "react-helmet";
import "./Reports.css";
import GenerateReport from "../Components/GenerateReport";
import GenerateReport2 from "../Components/GenerateReport2";
import useAuth from "../Hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import FilterReportModal from "../Components/FilterReportModal";

const Reports = () => {
  const { patients, user } = useAuth();
  const [reportPatients, setReportPatients] = useState([]);
  const [filterModal, setFilterModal] = useState(true);
  const [refer, setRefer] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [age, setAge] = useState("All");
  const [gender, setGender] = useState("All");

  useEffect(() => {
    setReportPatients(patients);
  }, [patients]);

  return (
    <>
      <Helmet>
        <title>Reports | ZCMC Telemedicine</title>
      </Helmet>

      <div className="container">
        <AnimatePresence>
          {filterModal && (
            <FilterReportModal
              setRefer={setRefer}
              setSpecialization={setSpecialization}
              setAge={setAge}
              setGender={setGender}
              setFilterModal={setFilterModal}
            />
          )}
        </AnimatePresence>
        <Sidebar />
        <div className="content">
          <Header />
          <div className="content-body">
            {/* {user.designation === "623ec7fb80a6838424edaa29" ? (
              <GenerateReport2 />
            ) : (
              <GenerateReport />
            )} */}
            <GenerateReport
              filterModal={filterModal}
              setFilterModal={setFilterModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
