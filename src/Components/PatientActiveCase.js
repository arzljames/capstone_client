import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import OutgoingCaseActive2 from "./OutgoingCaseActive2";

const PatientActiveCase = ({ state, name, patientId }) => {
  const { patients, cases } = useAuth();


  return (
    <>
      <h2>Active case</h2>

      {cases
        .filter((e) => e.patient._id === state._id && e.active === true)
        .map((item, key) => {
          return (
            <OutgoingCaseActive2
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

export default PatientActiveCase;
