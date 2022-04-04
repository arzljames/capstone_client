import React, { useState } from "react";
import "./AdminFacility.css";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import {
  HiChevronLeft
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "../Components/Toast";
import useAuth from "../Hooks/useAuth";
import FacilityTableBody from "../AdminComponents/FacilityTableBody";

const AdminFacilityData = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <>
     
      <div className="container">
        <AnimatePresence>
          {toast && (
            <Toast setToast={setToast} message={message} isError={isError} />
          )}
        </AnimatePresence>

        <AdminSidebar />

        <div className="content">
          <AdminHeader />
          <div className="content-body">

             <div className="above-patient-profile">
                <button onClick={() => navigate(-1)} className="back-btn">
                  <HiChevronLeft /> <p>Back</p>
                </button>
                </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFacilityData;
