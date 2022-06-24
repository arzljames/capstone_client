import React from "react";
import { IoBusinessOutline, IoBusiness } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const FacilityTableBody = ({ number, facility, specialization, address, users,setShowHospitalModal, setHospital, item, id  }) => {
  const navigate = useNavigate();

  const {listUsers} = useAuth()
  return (
    <div onClick={() => {
      setShowHospitalModal(true);
      setHospital(item)
    }} className={number % 2 === 0 ? "table-body" : "table-body-2"}>
      <div className="fac-body-name">
        <span>
        <p>
          <IoBusinessOutline />
        </p>
        {facility}
        </span>
      </div>
      <div className="fac-body-doctors">{listUsers.filter((e) => e.designation._id === id).length}</div>
      <div className="fac-body-spec">{specialization.length}</div>
      <div className="fac-body-add">{!address.city ? <p><em>(No Address)</em></p>: address.city}</div>
      
    </div>
  );
};

export default FacilityTableBody;
