import React, { useEffect, useState } from "react";
import "./AdminFacility.css";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import {
  HiPlus,
  HiOutlineSearch,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import AddFacilityForm from "../AdminComponents/AddFacilityForm";
import useAuth from "../Hooks/useAuth";
import FacilityTableBody from "../AdminComponents/FacilityTableBody";
import AdminHospitalModal from "../AdminComponents/AdminHospitalModal";
import ReactPaginate from "react-paginate";
import { Helmet } from "react-helmet";

const AdminFacility = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { facilities, toast, ToastContainer, listUsers } = useAuth();
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [hospital, setHospital] = useState([]);
  const [term, setTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(facilities.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [picture, setPicture] = useState("1");

  return (
    <>
      <Helmet>
        <title>Hospitals | ZCMC Telemedicine</title>
      </Helmet>
      <AnimatePresence>
        {showModal && (
          <AddFacilityForm setShowModal={setShowModal} toast={toast} />
        )}

        {showHospitalModal && (
          <AdminHospitalModal
            hospital={hospital}
            setShowHospitalModal={setShowHospitalModal}
            pictures={picture}
          />
        )}
      </AnimatePresence>
      <div className="container">
        <AdminSidebar />
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
        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="container-heading">
              <div className="patient-input-container">
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="search"
                  placeholder="Search hospitals"
                />
                <div className="patient-input-icon">
                  <HiOutlineSearch />
                </div>
              </div>

              <motion.button
                className="green-cta"
                onClick={() => setShowModal(true)}
                whileTap={{ scale: 0.9 }}
              >
                <p>
                  <HiPlus />
                </p>
                Hospital
              </motion.button>
            </div>
            <div className="table-header">
              <div className="fac-name">Hospital Name</div>
              <div className="fac-doctors">Doctors</div>

              <div className="fac-add">Address</div>
            </div>
            <div className="table">
              {facilities
                .filter((val) => {
                  if (term === "") {
                    return val;
                  } else if (
                    val.facility
                      .toLowerCase()
                      .includes(term.toLocaleLowerCase())
                  ) {
                    return val;
                  }
                })

                .slice(
                  term === "" ? pagesVisited : 0,
                  term === "" ? pagesVisited + usersPerPage : facilities.length
                )
                .map((item, key) => {
                  return (
                    <FacilityTableBody
                      key={key + 1}
                      id={item._id}
                      number={key}
                      facility={item.facility}
                      address={item.address}
                      specialization={item.specialization}
                      users={
                        listUsers.filter((e) => e.designation === item._id)
                          .length
                      }
                      setHospital={setHospital}
                      setShowHospitalModal={setShowHospitalModal}
                      item={item}
                      picture={item.picture}
                      setPicture={setPicture}
                    />
                  );
                })}
            </div>
            <div className="pagination-container">
              <ReactPaginate
                previousLabel={<HiChevronLeft size={20} />}
                nextLabel={<HiChevronRight size={20} />}
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={3}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                breakClassName="page-item"
                nextClassName="page-item"
                previousClassName="page-item"
                activeClassName="active"
                onPageChange={changePage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFacility;
