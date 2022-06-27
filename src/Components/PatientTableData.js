import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import {
  HiPlus,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiChevronDown,
  HiChevronUp,
  HiCheck,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownVariants } from "../Animations/Animations";
import { useClickOutside } from "../Hooks/useClickOutside";
const PatientTableData = ({
  patientState,
  usersPerPage,
  pagesVisited,
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
  setDeleteModal,
  searchDropdown,
  setSearchDropdown,
}) => {
  const navigate = useNavigate();
  const { cases } = useAuth();
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
              placeholder="Search patient (last name, first name)"
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
          <div onClick={() => setDeleteModal(true)} className="pt-name">
            Patient Name
          </div>
          <div className="pt-active">Active Case</div>
          <div className="pt-total">Total Case</div>
          <div className="pt-date">Date Admitted</div>
        </div>
        <div className="table-body-container">
          {patientState.length !== 0
            ? patientState

                .filter((val) => {
                  if (term === "") {
                    return val;
                  } else if (
                    val.fullname
                      .toLowerCase()
                      .includes(term.toLocaleLowerCase())
                  ) {
                    return val;
                  }
                })
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
                  term === ""
                    ? pagesVisited + usersPerPage
                    : patientState.length
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
                        <p>{item.firstname + " " + item.lastname} </p>
                      </div>

                      <div className="pt-active">
                        {
                          cases.filter(
                            (f) =>
                              f.patient._id === item._id && f.active === true
                          ).length
                        }
                      </div>
                      <div className="pt-total">
                        {cases.filter((f) => f.patient._id === item._id).length}
                      </div>
                      <div className="pt-date">{getDate(item.createdAt)}</div>
                    </div>
                  );
                })
            : // <div className="no-patients">
              //   <h1>No Patients</h1>
              //   <p>
              //     Looks like you don't have a patient to handle. Click the{" "}
              //     <em>add patient</em> button above to start adding patient.
              //   </p>
              // </div>
              null}
        </div>
      </div>
    </>
  );
};

export default PatientTableData;
