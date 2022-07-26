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


//Component page for specialization
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
            <div className="container-heading">
              <div className="patient-input-container">
                <input
                  type="search"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Search specializations"
                />
                <div className="patient-input-icon">
                  <HiOutlineSearch />
                </div>
              </div>
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
            <div className="table-header">
                <div className="spec-name">Specialization</div>
                <div className="spec-doctors">Doctors</div>
                <div className="spec-date">Date Created</div>
                <div className="spec-date">Last modified</div>
              </div>
            <div className="table">
              

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
                    <div
                      onClick={() => {
                        handleSetter(e);
                        setEditModal(true);
                      }}
                      key={index}
                      className={
                        index % 2 === 0 ? "table-body" : "table-body-2"
                      }
                    >
                      <div className="spec-name">
                        <p>{e.specialization}</p>
                      </div>
                      <div className="spec-doctors">
                        {
                          listUsers.filter((id) => {
                            return id.specialization?._id === e._id;
                          }).length
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
    </>
  );
};

export default AdminSpecialization;
