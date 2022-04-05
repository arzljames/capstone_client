import React, { useEffect, useState, useRef } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "./Homepage.css";
import {
  HiPlus,
  HiOutlineSearch,
  HiOutlineSortDescending,
  HiTrash,
  HiOutlineFilter,
} from "react-icons/hi";
import { motion } from "framer-motion";
import "./Patients.css";
import ConsultationNavbar from "../Components/ConsultationNavbar";
import { useNavigate } from "react-router-dom";
import AddPatientForm from "../Components/AddPatientForm";
import { AnimatePresence } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import Toast from "../Components/Toast";
import { AiFillCaretDown } from "react-icons/ai";
import { HiUpload } from "react-icons/hi";
import { useClickOutside } from "../Hooks/useClickOutside";
import { parse } from "papaparse";
import ImportModal from "../Components/ImportModal";
import DeleteMultiplePatientModal from "../Components/DeleteMultiplePatientModal";

const Patients = () => {
  const navigate = useNavigate();
  const [showCase, setShowCase] = useState(false);
  const {
    user,
    patients,
    setPatients,
    cases,
    appState,
    setToast,
    setMessage,
    setIsError,
    toast,
  } = useAuth();

  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [filter, setFilter] = useState("None");
  const [sort, setSort] = useState("Oldest");

  const [sortedPatients, setSortedPatients] = useState([]);
  const [showImport, setShowImport] = useState(false);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const sortNewest = () => {
    if (sort !== "Newest") {
      setPatients(patients.slice(0).reverse());
    }
  };

  const sortOldest = () => {
    if (sort !== "Oldest") {
      setPatients(patients.slice(0).reverse());
    }
  };

  const sortAsc = () => {
    setPatients(
      patients.sort((a, b) => a.firstname.localeCompare(b.firstname))
    );
  };

  const sortDsc = () => {
    setPatients(
      patients.sort((b, a) => a.firstname.localeCompare(b.firstname))
    );
  };

  const [term, setTerm] = useState("");

  const getDate = (date) => {
    let dates = new Date(date);
    let today =
      dates.getMonth() + "/" + dates.getDate() + "/" + dates.getFullYear();

    return today;
  };

  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  let domNodeFilter = useClickOutside(() => {
    setIsFilter(false);
  });

  let domNodeImport = useClickOutside(() => {
    setShowImport(false);
  });

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const [CSV, setCSV] = useState([]);

  const [patientState, setPatientState] = useState([]);
  const [patientsId, setPatientsId] = useState([]);

  useEffect(() => {
    setPatientState(
      patients.map((e) => {
        return {
          select: false,
          _id: e._id,
          createdAt: e.createdAt,
          physician: e.physician,
          fullname: e.fullname,
          firstname: e.firstname,
          lastname: e.lastname,
        };
      })
    );
  }, [patients]);

  useEffect(() => {
    const arr = [];
    patientState.forEach((d) => {
      if (d.select) {
        arr.push(d._id);
      }
    });

    setPatientsId(arr);
  }, [patientState]);

  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <div className="container">
        <AnimatePresence>
          {CSV.length !== 0 && <ImportModal setCSV={setCSV} CSV={CSV} />}
          {toast && <Toast />}
          {deleteModal && (
            <DeleteMultiplePatientModal
              setDeleteModal={setDeleteModal}
              patientsId={patientsId}
            />
          )}
        </AnimatePresence>

        <Sidebar />
        <div className="content">
          <Header />
          <div className="consultation-content">
            <ConsultationNavbar />
            <div className="content-body">
              <div className="admin-subheading">
                <h2>List of Patients</h2>

                <div className="subheading-btns">
                  {patientsId.length !== 0 && <button
                    onClick={() => setDeleteModal(true)}
                    className={
                      patientsId.length === 0
                        ? "delete-patient-btn-disable"
                        : "delete-patient-btn"
                    }
                  >
                    <p>
                      <HiTrash />
                    </p>
                    Delete ({patientsId.length} selected)
                  </button>}
                  <motion.button
                    onClick={() => navigate("/consultation/patients/admission")}
                    className="add-patient-btn"
                    whileTap={{
                      scale: 0.99,
                      y: 2,
                      x: 2,
                      transition: {
                        delay: 0,
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <p>
                      <HiPlus />
                    </p>
                    Add Patient
                  </motion.button>
                  <div
                    onClick={() => setShowImport(!showImport)}
                    className="import-patient-btn"
                  >
                    <AiFillCaretDown />
                    {showImport && (
                      <motion.div
                        ref={domNodeImport}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="import-patient-container"
                      >
                        <div onClick={() => onBtnClick()}>
                          <p>
                            <HiUpload />
                          </p>
                          Import CSV
                        </div>
                      </motion.div>
                    )}

                    <input
                      ref={inputFileRef}
                      className="import-patient-input"
                      type="file"
                      onChange={async (e) => {
                        const text = await e.target.files[0].text();
                        const result = parse(text, { header: true });
                        if (e.target.files[0].type !== "text/csv") {
                          setToast(true);
                          setMessage("Not a CSV file.");
                          setIsError(true);

                          return;
                        }
                        result.data.map((e) => {});

                        setCSV([
                          ...CSV,
                          result.data.map((e) => {
                            return {
                              firstname: e.FIRST_NAME,
                              middlename: e.MIDDLE_NAME,
                              lastname: e.LAST_NAME,
                              fullname:
                                e.LAST_NAME +
                                "," +
                                " " +
                                e.FIRST_NAME +
                                " " +
                                e.MIDDLE_NAME[0] +
                                ".",
                              contact: e.CONTACT,
                              sex: e.SEX,
                              birthday: e.BIRTHDAY,
                              civilStatus: e.CIVIL_STATUS,
                              religion: e.RELIGION,
                              birthplace: e.PLACE_OF_BIRTH,
                              address: {
                                street: e.STREET,
                                barangay: e.BARANGAY,
                                city: e.CITY,
                              },
                              ethnicity: e.ETHNICITY,
                              guardian: {
                                name: e.GUARDIAN_FULLNAME,
                                relationship: e.RELATION,
                              },
                              physician: user.userId,
                            };
                          }),
                        ]);

                        e.target.value = null;
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="above-patient-table">
                <div className="patient-input-container">
                  <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    type="search"
                    placeholder="Search patient (last name, first name M.I.)"
                  />
                  <div className="patient-input-icon">
                    <HiOutlineSearch />
                  </div>
                </div>

                <div className="above-patient-table-btns">
                  <button
                    className={isFilter ? "btn-active" : "btn-inactive"}
                    onClick={() => {
                      setIsFilter(!isFilter);
                      setIsSort(false);
                    }}
                  >
                    <p>
                      <HiOutlineFilter />
                    </p>
                    Filter by: {filter}
                    <AnimatePresence>
                      {isFilter && (
                        <motion.div
                          ref={domNodeFilter}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="filter-dropdown"
                        >
                          <ul>
                            <li onClick={() => setFilter("None")}>None</li>
                            <li
                              onClick={() => {
                                setFilter("Active Case");
                              }}
                            >
                              Active Case
                            </li>
                            <li
                              onClick={() => {
                                setFilter("No Active Case");
                              }}
                            >
                              No Active Case
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                  <button
                    className={isSort ? "btn-active" : "btn-inactive"}
                    onClick={() => {
                      setIsSort(!isSort);
                      setIsFilter(false);
                    }}
                  >
                    <p>
                      <HiOutlineSortDescending />
                    </p>
                    Sort by: {sort}
                    <AnimatePresence>
                      {isSort && (
                        <motion.div
                          ref={domNodeSort}
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="sort-dropdown"
                        >
                          <ul>
                            <li
                              onClick={() => {
                                setSort("Oldest");
                                sortOldest();
                              }}
                            >
                              Oldest
                            </li>
                            <li
                              onClick={() => {
                                setSort("Newest");
                                sortNewest();
                              }}
                            >
                              Newest
                            </li>

                            <li
                              onClick={() => {
                                setSort("Name (A-Z)");
                                sortAsc();
                              }}
                            >
                              Name (A-Z)
                            </li>
                            <li
                              onClick={() => {
                                setSort("Name (Z-A)");
                                sortDsc();
                              }}
                            >
                              Name (Z-A)
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="table-container">
                <div className="table">
                  <div className="table-header">
                    <div className="pt-no">
                      <input
                        onChange={(e) => {
                          let checked = e.target.checked;
                          setPatientState(
                            patientState.map((d) => {
                              d.select = checked;
                              return d;
                            })
                          );
                        }}
                        type="checkbox"
                      />
                    </div>
                    <div className="pt-name">FULL NAME</div>

                    <div className="pt-active">ACTIVE CASE</div>
                    <div className="pt-total">TOTAL CASE</div>
                    <div className="pt-date">Date Admitted</div>
                  </div>

                  {patientState.filter((e) => e.physician._id === user.userId)
                    .length !== 0 ? (
                    patientState
                      .filter((e) => e.physician._id === user.userId)
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

                      .map((item, key) => {
                        return (
                          <div
                            key={key + 1}
                            onClick={() =>
                              navigate(`/consultation/patients/${item._id}`, {
                                state: item,
                              })
                            }
                            className={
                              item.select
                                ? "table-body-active"
                                : key % 2 === 0
                                ? "table-body"
                                : item.select
                                ? "table-body-active"
                                : "table-body-2"
                            }
                          >
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="pt-no"
                            >
                              <input
                                onChange={(e) => {
                                  let checked = e.target.checked;
                                  setPatientState(
                                    patientState.map((d) => {
                                      if (item._id === d._id) {
                                        d.select = checked;
                                      }
                                      return d;
                                    })
                                  );
                                }}
                                checked={item.select}
                                type="checkbox"
                              />
                            </div>
                            <div className="pt-name">
                              {item.firstname + " " + item.lastname}{" "}
                            </div>

                            <div className="pt-active">
                              {
                                cases.filter(
                                  (f) =>
                                    f.patient._id === item._id &&
                                    f.active === true
                                ).length
                              }
                            </div>
                            <div className="pt-total">
                              {
                                cases.filter((f) => f.patient._id === item._id)
                                  .length
                              }
                            </div>
                            <div className="pt-date">
                              {getDate(item.createdAt)}
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div className="no-patients">
                      <h1>No Patients</h1>
                      <p>
                        Looks like you don't have a patient to handle. Click the{" "}
                        <em>add patient</em> button above to start adding
                        patient.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patients;
