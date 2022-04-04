import React, { useState } from "react";
import "./AdminBanner.css";
import { HiPencil, HiOutlineGlobeAlt } from "react-icons/hi";

const AdminBanner = () => {
  const [showEdit, setShowEdit] = useState(false);
  const onHover = () => {
    setShowEdit(true);
  };
  const offHover = () => {
    setShowEdit(false);
  };
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={offHover}
      className="admin-banner"
    >
      {showEdit && (
        <div className="edit-banner-icon">
          <p>Edit</p>
          <HiPencil />
        </div>
      )}
      <h1>Zamboanga City Medical Center</h1>
      <h2>
        Dr. Evanagelista St., Sta. Catalina Zamboanga City <br /> Zamboanga del
        Sur 7000 Philippines
      </h2>
      <div className="banner-contact">
        <div>
          <div className="contact-no-header">
            <span>
              <strong>Contact No.</strong>
            </span>
          </div>
          <p className="contact-no">
            (062)991-0573 | (062)991-2934 | (062)9910573
          </p>
        </div>

        <div className="banner-links">
          <a href="http://zcmc.doh.gov.ph" target="_blank">
            <p>
              <HiOutlineGlobeAlt />
            </p>{" "}
            http://zcmc.doh.gov.ph
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
