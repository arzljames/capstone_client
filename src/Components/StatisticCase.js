import React, { useEffect, useState } from "react";
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import ReactPaginate from "react-paginate";
import { VscBracketError } from "react-icons/vsc";
import { socket } from "./Socket";
import api from "../API/Api";
const StatisticCase = ({ border, bg }) => {
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

  const [term, setTerm] = useState("");

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

  const pageCount = Math.ceil(cases.length / usersPerPage);

  return (
    <>
      <div
        style={{ background: bg, border: `1px solid ${border}` }}
        className="table-header"
      >
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
                className="table-body"
              >
                <div className="cs-id">
                  <p>{item.caseId}</p>
                </div>
                <div className="cs-name">
                  <p>
                    {item.patient.lastname +
                      "," +
                      " " +
                      item.patient.firstname +
                      " " +
                      item.patient.middlename[0] +
                      "."}
                  </p>
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
                  <p
                    className={
                      item.active === "Active"
                        ? "active"
                        : item.active === "Done"
                        ? "done"
                        : "pending"
                    }
                  >
                    <div
                      className={
                        item.active === "Active"
                          ? "indicator active"
                          : item.active === "Done"
                          ? "indicator done"
                          : "indicator pending"
                      }
                    ></div>
                    {item.active}
                  </p>
                </div>
              </div>
            );
          })}

        {cases.length === 0 && (
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
        />
      </div>
    </>
  );
};

export default StatisticCase;
