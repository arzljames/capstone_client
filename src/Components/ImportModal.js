import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import PulseLoader from "react-spinners/PulseLoader";
import api from "../API/Api";
import useAuth from "../Hooks/useAuth";

const ImportModal = ({ setCSV, CSV }) => {
  let domNode = useClickOutside(() => {
    setCSV([]);
  });

  const { setToast, setMessage, setIsError, setAppState } = useAuth();

  const [isClick, setIsClick] = useState(false);

  const handleSubmit = async () => {
    try {
      let response = await api.put("/api/patient/import-patients", {
        CSV: CSV[0],
      });

      if (response) {
        setToast(true);
        setMessage(`Imported ${CSV[0].length} patients.`);
        setIsError(false);
        setCSV([]);
        setAppState(response.data.ok);

        setTimeout(() => setAppState(""), 500);
      }
    } catch (error) {
      setToast(true);
      setIsError(true);
      setMessage(error.message);
      setCSV([]);
      setIsClick(false);
    }
  };

  useEffect(() => {
    console.log(CSV[0]);
  }, []);

  return (
    <div className="modal-container">
      <div ref={domNode} className="import-patient-modal">
        <h1>Import Patients</h1>
        <p>
          Importing <b>{CSV[0].length}</b> existing patients. Make sure that you
          are uploading a .csv file and followed the correct format.
        </p>
        <div className="import-patient-modal-footer">
          <button onClick={() => setCSV([])} className="cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              setIsClick(true);
              handleSubmit();
            }}
            className={isClick ? "save disable" : "save"}
          >
            {isClick ? (
              <PulseLoader size={7} margin={2} color="#fff" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;