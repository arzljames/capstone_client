import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";


//Component for importing multiple patients
const ImportModal = ({ setCSV, CSV, toast }) => {
  let domNode = useClickOutside(() => {
    setCSV([]);
  });

  const { setAppState } = useAuth();

  const [isClick, setIsClick] = useState(false);

  const handleSubmit = async () => {
    try {
      let response = await api.put("/api/patient/import-patients", {
        CSV: CSV[0],
      });

      if (response) {
        toast.success(`Imported ${CSV[0].length} patients.`);
        setCSV([]);
        setAppState(response.data.ok);
        setTimeout(() => setAppState(""), 500);
        setIsClick(false);
      }
    } catch (error) {
      toast.error(error.message);
      setCSV([]);
      setIsClick(false);
    }
  };

  useEffect(() => {
    console.log(CSV[0]);
  }, []);

  return (
    <div className="modal-container">
      <div ref={domNode} className="popup-modal">
        <h1>Import Patients</h1>
        <p>
          Importing <b>{CSV[0].length}</b> existing patients. Make sure that you
          are uploading a .csv file and followed the correct format.
        </p>
        <div className="popup-modal-btns">
          <button onClick={() => setCSV([])} className="gray-cta">
            Cancel
          </button>
          <button
            onClick={() => {
              setIsClick(true);
              handleSubmit();
            }}
            className={isClick ? "green-cta-disable" : "green-cta"}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
