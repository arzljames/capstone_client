import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminComponents/AdminHeader";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import "./AdminSpecialization.css";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiOutlineSearch } from "react-icons/hi";
import AddSpecModal from "../AdminComponents/AddSpecModal";
import useAuth from "../Hooks/useAuth";

const AdminSpecialization = () => {
  const [modal, setModal] = useState(false);
  const { specializations } = useAuth();

  //Variable for search
  const [term, setTerm] = useState("");

  return (
    <>
      <AnimatePresence>
        {modal && <AddSpecModal setModal={setModal} />}
      </AnimatePresence>
      <div className="container">
        <AdminSidebar />
        <div className="content">
          <AdminHeader />
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
                  <div className="fac-name">Specialization</div>
                  <div className="fac-doctors">Description</div>
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
                        <div className="fac-name">{e.specialization}</div>
                        <div className="fac-doctors">{e.description}</div>
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
