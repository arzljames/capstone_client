import React, { useEffect, useState } from "react";
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import ReactPaginate from "react-paginate";
import { VscBracketError } from "react-icons/vsc";

const CaseTable = ({
  setPatient,
  setPatientModal,
  term,
  setSearchDropdown,
}) => {
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("None");
  const [sort, setSort] = useState("Oldest");

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

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const { specializations, cases, user, patients } = useAuth();
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
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

  const filterPatient = (id) => {
    setPatient(patients.filter((e) => e._id === id)[0]);
  };

  return (
    <>
      <div className="table-header">
        <div className="cs-id">Case ID</div>
        <div className="cs-name">Patient</div>

        <div className="cs-department">Service</div>
        <div className="cs-date">Date</div>
        <div className="cs-status">Status</div>
      </div>
      <div className="table">
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
                onClick={() => {
                  navigate(`/consultation/case/case-data/${item._id}`);
                }}
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
                  <div className="cs-info-container">
                    <div>Follow Ups: {item.followUp?.length}</div>
                  </div>
                </div>
                <div className="cs-name">
                  <p
                    onClick={(e) => {
                      filterPatient(item.patient._id);
                      setPatientModal(true);
                      e.stopPropagation();
                    }}
                  >
                    {item.patient.lastname +
                      "," +
                      " " +
                      item.patient.firstname +
                      " " +
                      item.patient.middlename[0] +
                      "."}
                  </p>
                  <div className="cs-info-container">
                    <div>Gender: {item.patient.sex}</div>
                    <div>Age: {getAge(item.patient.birthday) + " yrs old"}</div>
                    <div>Civil Status: {item.patient.civilStatus}</div>
                  </div>
                </div>

                <div className="cs-department">
                  {specializations.length === 0
                    ? null
                    : specializations.filter((e) => {
                        return item.specialization.includes(e._id);
                      })[0].specialization}
                </div>
                <div className="cs-date">{getDate(item.createdAt)}</div>
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
          }).length === 0 && (
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

export default CaseTable;
