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
}) => {
  const navigate = useNavigate();
  const { cases, patients, user } = useAuth();
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

  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
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
      <div className="table">
        <div className="above-patient-table">
          <div className="patient-input-container">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="search"
              onFocus={() => setSearchDropdown(true)}
              placeholder="Search patient (e.g Dela Cruz, Juan)"
            />
            <div className="patient-input-icon">
              <HiOutlineSearch />
            </div>

            {searchDropdown && (
              <div ref={domNodeSearch} className="advance-search">
                {!term ? (
                  <p>Type in the search bar</p>
                ) : (
                  <p>You searched for "{term}"</p>
                )}
              </div>
            )}
          </div>
          <div className="above-patient-table-btns">
            <button
              ref={domNodeSort}
              className={isSort ? "btn-active" : "btn-inactive"}
              onClick={() => {
                setIsSort(!isSort);
              }}
            >
              <p>
                <HiOutlineSortDescending />
              </p>
              Sort
              {isSort ? (
                <p className="chevron">
                  <HiChevronUp />
                </p>
              ) : (
                <p className="chevron">
                  <HiChevronDown />
                </p>
              )}
              <AnimatePresence>
                {isSort && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="sort-dropdown"
                  >
                    <ul>
                      <li
                        className={sort === "Oldest" ? "selected" : null}
                        onClick={() => {
                          setSort("Oldest");
                        }}
                      >
                        Oldest
                        {sort === "Oldest" && (
                          <p>
                            <HiCheck />
                          </p>
                        )}
                      </li>
                      <li
                        className={sort === "Newest" ? "selected" : null}
                        onClick={() => {
                          setSort("Newest");
                        }}
                      >
                        Newest
                        {sort === "Newest" && (
                          <p>
                            <HiCheck />
                          </p>
                        )}
                      </li>

                      <li
                        className={sort === "Name (A-Z)" ? "selected" : null}
                        onClick={() => {
                          setSort("Name (A-Z)");
                        }}
                      >
                        Name A to Z
                        {sort === "Name (A-Z)" && (
                          <p>
                            <HiCheck />
                          </p>
                        )}
                      </li>
                      <li
                        className={sort === "Name (Z-A)" ? "selected" : null}
                        onClick={() => {
                          setSort("Name (Z-A)");
                        }}
                      >
                        Name Z to A
                        {sort === "Name (Z-A)" && (
                          <p>
                            <HiCheck />
                          </p>
                        )}
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <div className="table-header">
          <div className="pt-name">Patient Name</div>
          <div className="pt-active">Gender</div>
          <div className="pt-active">Active Case</div>
          <div className="pt-total">Total Case</div>
          <div className="pt-date">Date Admitted</div>
        </div>
        <div className="table-body-container">
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
    </>
  );
};

export default PatientTableData;
