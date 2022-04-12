import React from "react";

const PatientGeneralInfo = ({ state }) => {
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <>
      <h2>Pesonal Information</h2>
      <div className="patient-content-name">
        <div className="info">
          <div>
            <h5>Last name</h5>
            <p>{state.lastname}</p>
          </div>

          <div>
            <h5>First name</h5>
            <p>{state.firstname}</p>
          </div>

          <div>
            <h5>Middle name</h5>
            <p>{state.middlename}</p>
          </div>
        </div>

        <div className="info">
          <div>
            <h5>Sex</h5>
            <p>{state.sex}</p>
          </div>
          <div>
            <h5>Birthday</h5>
            <p>{state.birthday}</p>
          </div>

          <div>
            <h5>Age</h5>
            <p>{getAge(state.birthday)}</p>
          </div>
        </div>

        <div className="info">
          <div>
            <h5>Civil Status</h5>
            <p>{state.civilStatus}</p>
          </div>

          <div>
            <h5>Religion</h5>
            <p>{state.religion}</p>
          </div>

          <div></div>
        </div>

        <div className="info">
          <div>
            <h5>Guardian</h5>
            <p>{state.guardian.name}</p>
          </div>

          <div>
            <h5>Relation</h5>
            <p>{state.guardian.relationship}</p>
          </div>

          <div></div>
        </div>
        <hr />
        <br />

        <div className="info">
          <div>
            <h5>Street</h5>
            <p>{state.address.street}</p>
          </div>

          <div>
            <h5>Barangay</h5>
            <p>{state.address.barangay}</p>
          </div>

          <div>
            <h5>City/Municipality</h5>
            <p>{state.address.city}</p>
          </div>
        </div>

        <div className="info">
          <div>
            <h5>Birth Place</h5>
            <p>{state.birthplace}</p>
          </div>

          <div>
            <h5>Ethnicity</h5>
            <p>{state.ethnicity}</p>
          </div>

          <div></div>
        </div>
        <hr />
        <br />

        <div className="info">
          <div>
            <h5>Contact #</h5>
            <p>+63 {state.contact}</p>
          </div>

          <div></div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default PatientGeneralInfo;
