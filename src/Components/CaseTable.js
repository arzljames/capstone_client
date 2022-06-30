import React, { useEffect, useState } from "react";
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import ReactPaginate from "react-paginate";

const CaseTable = ({ setPatient, setPatientModal }) => {
  const [term, setTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("None");
  const [sort, setSort] = useState("Oldest");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const navigate = useNavigate();
  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  let domNodeFilter = useClickOutside(() => {
    setIsFilter(false);
  });

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

  const getTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  const { specializations, cases, user, patients } = useAuth();
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(
    cases.filter((val) => {
      if (
        (user.designation === "623ec7fb80a6838424edaa29" &&
          val.specialization.includes(user.specialization)) ||
        (user.designation === "623ec7fb80a6838424edaa29" &&
          val.subSpecialization.map((f) => f._id).includes(user.specialization))
      ) {
        return val;
      } else if (user.userId === val.physician._id) {
        return val;
      }
    }).length / usersPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
  });

  const filterPatient = (id) => {
    setPatient(patients.filter((e) => e._id === id)[0]);
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
              placeholder="Search case (case ID or patient name)"
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

          <div className="above-patient-table-btns"></div>
        </div>
        <div className="table-header">
          <div className="cs-id">Case ID</div>
          <div className="cs-name">Patient</div>

          <div className="cs-department">Service</div>
          <div className="cs-date">Date & Time</div>
          <div className="cs-status">Status</div>
        </div>
        <div className="table-body-container">
          {cases
            .filter((vals) => {
              if (term === "") {
                return vals;
              } else if (
                vals.caseId.toLowerCase().includes(term.toLocaleLowerCase()) ||
                vals.patient.fullname
                  .toLowerCase()
                  .includes(term.toLocaleLowerCase())
              ) {
                return vals;
              }
            })
            .filter((e) =>
              filter === "None"
                ? e
                : filter === "Active"
                ? e.active === true
                : e.active === false
            )
            .filter((val) => {
              if (
                (user.designation === "623ec7fb80a6838424edaa29" &&
                  val.specialization.includes(user.specialization)) ||
                (user.designation === "623ec7fb80a6838424edaa29" &&
                  val.subSpecialization
                    .map((f) => f._id)
                    .includes(user.specialization))
              ) {
                return val;
              } else if (user.userId === val.physician._id) {
                return val;
              }
            })
            .slice(
              term === "" ? pagesVisited : 0,
              term === "" ? pagesVisited + usersPerPage : cases.length
            )
            .map((item, index) => {
              return (
                <div
                  index={index}
                  className={index % 2 === 0 ? "table-body" : "table-body-2"}
                >
                  <div className="cs-id">
                    <p
                      onClick={() => {
                        navigate(`/consultation/case/case-data/${item._id}`);
                      }}
                    >
                      {item.caseId}
                    </p>
                  </div>
                  <div className="cs-name">
                    <p
                      onClick={(e) => {
                        filterPatient(item.patient._id);
                        setPatientModal(true);
                        e.stopPropagation();
                      }}
                    >
                      {item.patient.firstname + " " + item.patient.lastname}
                    </p>
                  </div>

                  <div className="cs-department">
                    {specializations.length === 0
                      ? null
                      : specializations.filter((e) => {
                          return item.specialization.includes(e._id);
                        })[0].specialization}
                  </div>
                  <div className="cs-date">
                    {getDate(item.createdAt)} {getTime(item.createdAt)}
                  </div>
                  <div className="cs-status">
                    <p className={item.active ? "active" : "done"}>
                      <div
                        className={
                          item.active ? "indicator active" : "indicator done"
                        }
                      ></div>
                      {item.active ? "Active" : "Done"}
                    </p>
                  </div>
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

export default CaseTable;
