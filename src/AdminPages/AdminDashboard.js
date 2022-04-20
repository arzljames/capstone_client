import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import "./AdminDashboard.css";
import AdminHeader from "../AdminComponents/AdminHeader";
import AdminBanner from "../AdminComponents/AdminBanner";
import StatisticCard from "../AdminComponents/StatisticCard";
import PendingUser from "../AdminComponents/PendingUser";
import useAuth from "../Hooks/useAuth";
import Doctor from "../Assets/Doctor.svg";
import Hospital from "../Assets/Hospital.svg";
import Patient from "../Assets/Patient.svg";
import Toast from "../Components/Toast";
import { AnimatePresence } from "framer-motion";
import DeletePendingUserModal from "../AdminComponents/DeletePendingUserModal";
import { FiUserX } from "react-icons/fi";
import NoUser from "../Assets/nouser.png";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { pending, facilities, listUsers, patients } = useAuth();
  const [toast, setToast] = useState(false);

  //State for user verification status
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");

  const handleId = (id) => {
    setUserId(id);
  };

  return (
    <>
      <Helmet>
        <title>Admin - Dashboard | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <AnimatePresence>
          {modal && (
            <DeletePendingUserModal setModal={setModal} userId={userId} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          <AdminSidebar />
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <Toast setToast={setToast} message={message} isError={isError} />
          )}
        </AnimatePresence>

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="admin-subheading">
              <h2>Dashboard Overview</h2>
            </div>

            <div className="container-divider">
              <div className="admin-container-content">
                <div className="statistic-section">
                  <StatisticCard
                    heading="Hospitals"
                    image={Hospital}
                    total={facilities.length}
                  />
                  <StatisticCard
                    heading="Doctors"
                    image={Doctor}
                    total={listUsers.length - 1}
                  />
                  <StatisticCard
                    heading="Patients"
                    image={Patient}
                    total={patients.length}
                  />
                </div>
                <AdminBanner />
              </div>
              <div className="admin-right-panel">
                <div className="pending-registration">
                  <div className="pending-registration-header">
                    <h1>Pending Registration</h1>
                    <p>See All</p>
                  </div>
                  <div className="pending-registration-body">
                    {pending.length === 0 ? (
                      <div className="no-pending-user">
                        <p>
                          <FiUserX />
                        </p>
                        <p>No pending user registration</p>
                      </div>
                    ) : (
                      pending.map((item) => {
                        return (
                          <PendingUser
                            key={item._id}
                            email={item.email}
                            firstname={item.firstname}
                            id={item._id}
                            picture={!item.picture ? NoUser : item.picture}
                            setToast={setToast}
                            setMessage={setMessage}
                            setIsError={setIsError}
                            setModal={setModal}
                            handleId={handleId}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="recently-added">
                  <div className="recently-added-header">
                    <h1>Recently Added</h1>
                    <p onClick={() => navigate("/people")}>See All</p>
                  </div>
                  <div className="recently-added-body">
                    {listUsers
                      .filter(
                        (e) => e.verified === true && e.userType !== "admin"
                      )
                      .map((item, index) => {
                        return (
                          <div key={index} className="pending-user-card">
                            <div className="pending-user-profile-container">
                              <div className="pending-user-profile">
                                <img
                                  src={!item.picture ? NoUser : item.picture}
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div className="pending-user-name">
                              <h5>
                                Dr. {item.firstname + " " + item.lastname}
                              </h5>
                              <p>
                                {facilities.length === 0
                                  ? null
                                  : facilities.filter(
                                      (e) => e._id === item.designation
                                    )[0].facility}
                              </p>
                              <p>
                                {facilities.length === 0
                                  ? null
                                  : facilities
                                      .filter((e) => e._id === item.designation)
                                      .map((items) => {
                                        return items.specialization.filter(
                                          (spec) =>
                                            spec._id === item.specialization
                                        )[0];
                                      })[0].name}
                              </p>
                            </div>

                            <div className="option-icon-container"></div>
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

export default AdminDashboard;
