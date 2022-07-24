import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import FacilityTableBody from "../AdminComponents/FacilityTableBody";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";

const StatisticHospital = ({bg, border}) => {
  const { facilities, listUsers } = useAuth();
  const [term, setTerm] = useState("");
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [hospital, setHospital] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(facilities.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [picture, setPicture] = useState("1");
  return (
    <>
      <div style={{background: bg, border: `1px solid ${border}`}} className="table-header">
        <div className="fac-name">Hospital Name</div>
        <div className="fac-doctors">Doctors</div>

        <div className="fac-add">Address</div>
      </div>
      <div className="table">
        {facilities
          .filter((val) => {
            if (term === "") {
              return val;
            } else if (
              val.facility.toLowerCase().includes(term.toLocaleLowerCase())
            ) {
              return val;
            }
          })

          .slice(
            term === "" ? pagesVisited : 0,
            term === "" ? pagesVisited + usersPerPage : facilities.length
          )
          .map((item, key) => {
            return (
              <FacilityTableBody
                key={key + 1}
                id={item._id}
                number={key}
                facility={item.facility}
                address={item.address}
                specialization={item.specialization}
                users={
                  listUsers.filter((e) => e.designation === item._id).length
                }
                setHospital={setHospital}
                setShowHospitalModal={setShowHospitalModal}
                item={item}
                picture={item.picture}
                setPicture={setPicture}
              />
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

export default StatisticHospital;
