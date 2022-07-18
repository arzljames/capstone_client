import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import {
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiChevronDown,
  HiChevronUp,
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants } from "../Animations/Animations";
import { useClickOutside } from "../Hooks/useClickOutside";
import ReactPaginate from "react-paginate";
import { VscBracketError } from "react-icons/vsc";
const PatientTableData = ({
  patientState,

  sortAscDate,
  sortDscDate,
  sortAscName,
  sortDscName,
  sort,
  isSort,
  setSort,
  setIsSort,
  setPatientId,
  setPatientModal,
  filterPatient,
  searchDropdown,
  setSearchDropdown,
  term,
}) => {
  const navigate = useNavigate();
  const { cases, patients, user } = useAuth();

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

  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(
    patients.filter((id) => id.physician._id === user.userId).length /
      usersPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="table-header">
        <div className="pt-name">Patient Name</div>
        <div className="pt-active">Gender</div>
        <div className="pt-active">Active Case</div>
        <div className="pt-total">Total Case</div>
        <div className="pt-date">Date Admitted</div>
      </div>
      <div className="table">
        {patients
          .filter((val) => {
            if (term === "") {
              return val;
            } else if (
              val.fullname.toLowerCase().includes(term.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .filter((id) => id.physician._id === user.userId)
          .sort(
            sort === "Newest"
              ? sortDscDate
              : sort === "Oldest"
              ? sortAscDate
              : sort === "Name (A-Z)"
              ? sortAscName
              : sortDscName
          )
          .slice(
            term === "" ? pagesVisited : 0,
            term === "" ? pagesVisited + usersPerPage : patientState.length
          )
          .map((item, key) => {
            return (
              <div
                key={key + 1}
                onClick={() => {
                  setPatientModal(true);
                  setPatientId(item._id);
                  filterPatient(item._id);
                }}
                className={key % 2 === 0 ? "table-body" : "table-body-2"}
              >
                <div className="pt-name">
                  <p>
                    {item.lastname +
                      "," +
                      " " +
                      item.firstname +
                      " " +
                      item.middlename[0] +
                      "."}
                  </p>
                </div>

                <div className="pt-active">{item.sex}</div>

                <div className="pt-active">
                  {
                    cases.filter(
                      (f) => f.patient._id === item._id && f.active === true
                    ).length
                  }
                </div>
                <div className="pt-total">
                  {cases.filter((f) => f.patient._id === item._id).length}
                </div>
                <div className="pt-date">{getDate(item.createdAt)}</div>
              </div>
            );
          })}

        {patients.filter((id) => id.physician._id === user.userId).length ===
          0 && (
          <div className="no-data">
            <span>
              <VscBracketError />
            </span>
            <p>No data found</p>
          </div>
        )}
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
    </>
  );
};

export default PatientTableData;
