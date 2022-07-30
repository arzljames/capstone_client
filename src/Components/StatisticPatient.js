import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { VscBracketError } from "react-icons/vsc";

const StatisticPatient = ({ border, bg }) => {
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

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(
    patients.filter((id) => id.physician._id === user.userId).length /
      usersPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [term, setTerm] = useState("");
  return (
    <>
      <div
        style={{ border: `1px solid ${border}`, background: bg }}
        className="table-header"
      >
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
          .slice(
            term === "" ? pagesVisited : 0,
            term === "" ? pagesVisited + usersPerPage : patients.length
          )
          .map((item, key) => {
            return (
              <div
                key={key + 1}
                className="table-body"
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

        {patients.length === 0 && (
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

export default StatisticPatient;
