import React from "react";
import { IoBusinessOutline, IoBusiness } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


//Data to the facility table component
const FacilityTableBody = ({
  number,
  facility,
  address,
  setShowHospitalModal,
  setHospital,
  item,
  id,
  picture,
  setPicture,
}) => {
  const navigate = useNavigate();
  const { listUsers } = useAuth();

  return (
    <div
      onClick={() => {
        setShowHospitalModal(true);
        setHospital(item);
        setPicture(picture);
      }}
      className="table-body"
    >
      <div className="fac-body-name">
        <span>
          {!picture ? (
            <div className="img-container">
              <p>
                <IoBusinessOutline />
              </p>
            </div>
          ) : (
            <div className="img-container">
              <img src={picture} alt="Hospital Picture" />
            </div>
          )}
          {facility}
        </span>
      </div>
      <div className="fac-body-doctors">
        {listUsers.filter((e) => e.designation._id === id).length}
      </div>

      <div className="fac-body-add">
        {!address.city ? (
          <p>
            <em>(No Address)</em>
          </p>
        ) : (
          address.city
        )}
      </div>
    </div>
  );
};

export default FacilityTableBody;
