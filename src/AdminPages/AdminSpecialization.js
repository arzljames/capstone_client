import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminComponents/AdminHeader";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import "./AdminSpecialization.css";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiOutlineSearch } from "react-icons/hi";
import AddSpecModal from "../AdminComponents/AddSpecModal";
import useAuth from "../Hooks/useAuth";
import AdminEditSpecModal from "../AdminComponents/AdminEditSpecModal";
import ReactTimeAgo from "react-time-ago";

const AdminSpecialization = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { specializations, toast, ToastContainer, listUsers } = useAuth();

  //Variable for search
  const [term, setTerm] = useState("");

  const getDate = (date) => {
    let dates = new Date(date);
    let today =
      dates.toLocaleString("en-us", { month: "short" }) +
      " " +
      dates.getDate() +
      "," +
      " " +
      dates.getFullYear();

    return today;
  };

  const [spec, setSpec] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");

  const handleSetter = (e) => {
    setSpec(e.specialization);
    setDesc(e.description);
    setId(e._id);
  };

  return (
    <>
      <AnimatePresence>
        {modal && <AddSpecModal setModal={setModal} toast={toast} />}
        {editModal && (
          <AdminEditSpecModal
            setEditModal={setEditModal}
            toast={toast}
            desc={desc}
            spec={spec}
            id={id}
          />
        )}
      </AnimatePresence>
      <div className="container">
        <AdminSidebar />
        <div className="content">
          <AdminHeader />
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
          <div className="content-body">
            <div>
              <div className="container-heading">
                <h2>List of Specializations</h2>
                <motion.button
                  className="green-cta"
                  onClick={() => setModal(true)}
                  whileTap={{ scale: 0.9 }}
                >
                  <p>
                    <HiPlus />
                  </p>{" "}
                  Specialization
                </motion.button>
              </div>
              <div className="above-table">
                <div className="patient-input-container">
                  <input
                    type="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search Specializations"
                  />
                  <div className="patient-input-icon">
                    <HiOutlineSearch />
                  </div>
                </div>
              </div>

              <div className="table">
                <div className="table-header">
                  <div className="spec-name">Specialization</div>
                  <div className="spec-doctors">Doctors</div>
                  <div className="spec-date">Date Created</div>
                  <div className="spec-date">Last modified</div>
                </div>

                {specializations
                  .filter((val) => {
                    if (term === "") {
                      return val;
                    } else if (
                      val.specialization
                        .toLowerCase()
                        .includes(term.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((e, index) => {
                    return (
                      <div key={index} className="table-body">
                        <div className="spec-name">
                          <p
                            onClick={() => {
                              handleSetter(e);
                              setEditModal(true);
                            }}
                          >
                            {e.specialization}
                          </p>
                        </div>
                        <div className="spec-doctors">
                          {
                            listUsers.filter(
                              (item) => item.specialization === e._id
                            ).length
                          }
                        </div>
                        <div className="spec-date">{getDate(e.createdAt)}</div>
                        <div className="spec-date">
                          {
                            <ReactTimeAgo
                              date={e.updatedAt}
                              locale="en-US"
                              timeStyle="round-minute"
                            />
                          }
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

export default AdminSpecialization;
