import React, { useEffect, useState } from "react";
import "./AdminPeople.css";
import "./AdminDashboard.css";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import {
  HiPlus,
  HiOutlineSortDescending,
  HiOutlineFilter,
  HiOutlineSearch,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "../Hooks/useClickOutside";
import { AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";
import AdminEditdUser from "../AdminComponents/AdminEditdUser";
import { Helmet } from "react-helmet";
import NoUser from "../Assets/nouser.png";

const AdminPeople = () => {
  const [showModal, setShowModal] = useState(false);

  const { listUsers, patients, facilities, ToastContainer, toast } = useAuth();
  const [facility, setFacility] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setFacility(facilities);
  }, [facilities]);

  const [term, setTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sort, setSort] = useState("Oldest");
  const [searchDropdown, setSearchDropdown] = useState(false);

  const [modal, setModal] = useState(false);

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
  });

  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(listUsers.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Helmet>
        <title>Doctors | ZCMC Telemedicine</title>
      </Helmet>
      <div className="container">
        <AdminSidebar />
        <AnimatePresence>
          {modal && (
            <AdminEditdUser
              toast={toast}
              userData={userData}
              setModal={setModal}
            />
          )}
        </AnimatePresence>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="container-heading">
              <div className="patient-input-container">
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="search"
                  onFocus={() => setSearchDropdown(true)}
                  placeholder="Search Doctors"
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
            </div>

            <div className="table">
              <div className="table-header">
                <div className="dr-name">Full name</div>
                <div className="dr-patient">Patients</div>
                <div className="dr-hospital">Hospital</div>
                <div className="dr-status">Status</div>
              </div>

              {listUsers

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
                .slice(
                  term === "" ? pagesVisited : 0,
                  term === "" ? pagesVisited + usersPerPage : listUsers.length
                )
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        index % 2 === 0 ? "table-body" : "table-body-2"
                      }
                    >
                      <div className="dr-name">
                        <img
                          src={!item.picture ? NoUser : item.picture}
                          alt="Profile"
                        />
                        <p onClick={() => {
                           setModal(true);
                           setUserData(item)
                        }} id="link">
                          Dr. {item.firstname} {item.lastname}
                        </p>
                      </div>
                      <div className="dr-patient">{listUsers.length}</div>
                      <div className="dr-hospital">
                        {item.designation?.facility}
                      </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPeople;
