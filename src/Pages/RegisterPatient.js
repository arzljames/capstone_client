import React from "react";
import "./RegisterPatient.css";

const RegisterPatient = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "auto",
        display: "flex",
        padding: "20px",
        justifyContent: "center",
        background: "#eee",
      }}
    >
      <div className="patient-registration">
        <div className="block">
          <h1>Personal Information</h1>
          <div className="block-inline">
            <label>
              Name <i>*</i>
            </label>
            <div className="container">
              <input
                className="firstname"
                placeholder="First name"
                type="text"
              />
              <input
                className="middlename"
                placeholder="Middle name"
                type="text"
              />

              <input className="lastname" placeholder="Last name" type="text" />
            </div>
          </div>

          <div className="block-inline">
            <label>
              Sex <i>*</i>
            </label>
            <div className="container">
              <input type="text" />
            </div>
          </div>

          <div className="block-inline">
            <label>
              Birthday <i>*</i>
            </label>
            <div className="container">
              <input type="date" />
            </div>
          </div>
        </div>

        <div className="block">
          <h1>Contact Information</h1>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;
