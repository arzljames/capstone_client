import React, { useEffect, useState } from "react";
import "./AdminPeople.css";
import "./AdminDashboard.css";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiOutlineSortDescending,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import { buttonVariant } from "../Animations/Animations";

const AdminPeople = () => {
  const [showModal, setShowModal] = useState(false);

  const { listUsers, patients, facilities } = useAuth();
  const [facility, setFacility] = useState([]);

  useEffect(() => {
    setFacility(facilities);
  }, [facilities]);

  return (
    <>
      <div className="container">
        <AdminSidebar />

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="admin-subheading">
              <h2>List of Doctors</h2>
              <motion.button
                className="add-fac-btn"
                onClick={() => setShowModal(true)}
                variants={buttonVariant}
                whileTap="tap"
              >
                <p>
                  {" "}
                  <HiPlus />
                </p>
                Add User
              </motion.button>
            </div>
            <div className="above-table">
              <div className="patient-input-container">
                <input type="search" placeholder="Search doctors" />
                <div className="patient-input-icon">
                  <HiOutlineSearch />
                </div>
              </div>
              <div className="above-table-right">
                <button className="fac-btns">
                  <p>
                    <HiOutlineFilter />
                  </p>
                  Filter
                </button>
                <button className="fac-btns">
                  <p>
                    <HiOutlineSortDescending />
                  </p>
                  Sort by
                </button>
              </div>
            </div>

            <div className="table-container">
              <div className="table">
                <div className="table-header">
                  <div className="admin-user-name">Full Name</div>
                  <div className="admin-user-patients">Total Patients</div>
                  <div className="admin-user-spec">Specialization</div>
                  <div className="admin-user-hospital">Hospital</div>
                  <div className="us-status">Active Status</div>
                </div>
                {listUsers
                  .filter((e) => e.userType !== "admin" && e.verified === true)
                  .map((item, key) => {
                    return (
                      <div key={key} className="table-body">
                        <div className="admin-user-name">
                          Dr. {item.firstname + " " + item.lastname}
                        </div>
                        <div className="admin-user-patients">
                          {
                            patients.filter((e) => e.physician._id === item._id)
                              .length
                          }
                        </div>
                        <div className="admin-user-spec">
                          {facility.length === 0
                            ? null
                            : facility
                                .filter((e) => e._id === item.designation)
                                .map((items) => {
                                  return items.specialization.filter(
                                    (spec) => spec._id === item.specialization
                                  )[0];
                                })[0].name}
                        </div>
                        <div className="admin-user-hospital">
                          {facility.length === 0
                            ? null
                            : facility
                                .filter((e) => e._id === item.designation)
                                .map((item) => {
                                  return item.facility;
                                })}
                        </div>

                        <div
                          className={
                            item.activeStatus === "Online"
                              ? "us-status online"
                              : "us-status"
                          }
                        >
                          <p
                            className={
                              item.activeStatus === "Offline"
                                ? "offline"
                                : "online"
                            }
                          ></p>{" "}
                          {item.activeStatus}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPeople;
