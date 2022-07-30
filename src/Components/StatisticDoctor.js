import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import useAuth from "../Hooks/useAuth";
import NoUser from "../Assets/nouser.png";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const StatisticDoctor = ({ bg, border }) => {
  const { listUsers, patients } = useAuth();
  const [term, setTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(listUsers.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div
        style={{ background: bg, border: `1px solid ${border}` }}
        className="table-header"
      >
        <div className="dr-name">Full name</div>
        <div className="dr-patient">Patients</div>
        <div className="dr-hospital">Hospital</div>
        <div className="dr-status">Status</div>
      </div>
      <div className="table">
        {listUsers

          .filter((val) => {
            if (term === "") {
              return val;
            } else if (
              val.fullname.toLowerCase().includes(term.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .filter((e) => e.userType === "user")
          .slice(
            term === "" ? pagesVisited : 0,
            term === "" ? pagesVisited + usersPerPage : listUsers.length
          )
          .map((item, index) => {
            return (
              <div
                key={index}
                className="table-body"
              >
                <div className="dr-name">
                  <img
                    src={!item.picture ? NoUser : item.picture}
                    alt="Profile"
                  />
                  <p id="link">
                    Dr. {item.firstname} {item.lastname}
                  </p>
                </div>
                <div className="dr-patient">
                  {patients?.filter((e) => e.physician._id === item._id).length}
                </div>
                <div className="dr-hospital">{item.designation?.facility}</div>
                <div className="dr-status">{item.activeStatus}</div>
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
    </>
  );
};

export default StatisticDoctor;
