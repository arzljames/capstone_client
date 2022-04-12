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
                  <div className="admin-user-no">#</div>
                  <div className="admin-user-name">Full Name</div>
                  <div className="admin-user-patients">Total Patients</div>
                  <div className="admin-user-spec">Specialization</div>
                  <div className="admin-user-hospital">Hospital</div>
                </div>
                {listUsers
                  .filter((e) => e.userType !== "admin")
                  .map((item, key) => {
                    return (
                      <div key={key} className="table-body">
                        <div className="admin-user-no">{key + 1}</div>
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
                          {/* {!facilities
                            ? null
                            : facilities
                                .filter((e) => e._id === item.designation)
                                .map((items) => {
                                  return items.specialization.filter(
                                    (spec) => spec._id === item.designation
                                  )[0];
                                })[0].name} */}
                        </div>
                        <div className="admin-user-hospital">
                          {facilities
                            .filter((e) => e._id === item.designation)
                            .map((item) => {
                              return item.facility;
                            })}
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
