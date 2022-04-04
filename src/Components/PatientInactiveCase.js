import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import OutgoingCaseInactive from "./OutgoingCaseInactive";

const PatientInactiveCase = ({ state, name, patientId }) => {
  const { patients, cases } = useAuth();



  useEffect(() => {
console.log(cases
    .filter((e) => e.patient._id !== state._id ))
  },[])

  return (
    <>
      <h2>Inactive case</h2>

      {cases
        .filter((e) => e.patient._id === state._id && e.active === false)
        .map((item, key) => {
          return (
            <OutgoingCaseInactive
              key={key + 1}
              item={item}
              name={name}
              patientid={item.patient._id}
            />
          );
        })}
    </>
  );
};

export default PatientInactiveCase;
