import React, { useEffect, useState } from "react";
import { HiOutlineSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import ReactPaginate from "react-paginate";
import { VscBracketError } from "react-icons/vsc";
import { socket } from "../Components/Socket";
import api from "../API/Api";
import { Helmet } from "react-helmet";
import NavigatorSidebar from "../Components/NavigatorSidebar";
import NavigatorHeader from "../Components/NavigatorHeader";

const NavigatorCase = () => {
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState("None");
  const [sort, setSort] = useState("Oldest");

  const [term, setTerm] = useState("");

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

  const pageCount = Math.ceil(cases.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Helmet>
        <title>Case | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <NavigatorSidebar />
        <div className="content">
          <NavigatorHeader />
          <div className="content-body">
            <div className="container-heading">
              <div>
                <h2>All Incoming Requests</h2>
                <p>
                  List of consultation request coming from other referring
                  hospitals.
                </p>
              </div>
            </div>

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
                    vals.caseId
                      .toLowerCase()
                      .includes(term.toLocaleLowerCase()) ||
                    vals.patient.fullname
                      .toLowerCase()
                      .includes(term.toLocaleLowerCase())
                  ) {
                    return vals;
                  }
                })
                .filter((e) => e.active === "Pending" || e.active === "Active")

                .slice(
                  term === "" ? pagesVisited : 0,
                  term === "" ? pagesVisited + usersPerPage : cases.length
                )
                .map((item, index) => {
                  return (
                    <div
                      index={index}
                      className={
                        item.active === "Pending"
                          ? "table-body-2"
                          : "table-body"
                      }
                    >
                      <div className="cs-id">
                        <p>{item.caseId}</p>
                        <div className="cs-info-container">
                          <div>Follow Ups: {item.followUp?.length}</div>
                        </div>
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
                        <div className="cs-info-container">
                          <div>Gender: {item.patient.sex}</div>
                          <div>
                            Age: {getAge(item.patient.birthday) + " yrs old"}
                          </div>
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

              {cases
                .filter((vals) => {
                  if (term === "") {
                    return vals;
                  } else if (
                    vals.caseId
                      .toLowerCase()
                      .includes(term.toLocaleLowerCase()) ||
                    vals.patient.fullname
                      .toLowerCase()
                      .includes(term.toLocaleLowerCase())
                  ) {
                    return vals;
                  }
                })
                .filter((e) => e.active === "Done")
                .slice(
                  term === "" ? pagesVisited : 0,
                  term === "" ? pagesVisited + usersPerPage : cases.length
                )
                .map((item, index) => {
                  return (
                    <div index={index} className="table-body">
                      <div className="cs-id">
                        <p>{item.caseId}</p>
                        <div className="cs-info-container">
                          <div>Follow Ups: {item.followUp?.length}</div>
                        </div>
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
                        <div className="cs-info-container">
                          <div>Gender: {item.patient.sex}</div>
                          <div>
                            Age: {getAge(item.patient.birthday) + " yrs old"}
                          </div>
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

export default NavigatorCase;
