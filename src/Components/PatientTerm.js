import React from "react";
import { motion } from "framer-motion";

const PatientTerm = ({ accept, setAccept, setTerm, setPatientForm }) => {
  return (
    <>
      <div className="form-body">
        <p>
          I acknowledged that prior to engaging in such consultation, I have
          been made fully aware of its purpose, scope and limitations. <br />
          <br />I further acknowledge that consent was given to share my medical
          history, records and laboratory results for the purpose of discussion,
          in accordance with the RA 10173 Data Privace Act.
          <br />
          <br />I further acknowledge that I am aware this virtual encounter
          will be recorded and all details be kept confidential between my
          attending physician and the ZCMC Telemedicine healthcare personnel
          involved.
          <br />
          <br />I further acknowledge given that this is only a virtual consult,
          the ZCMC Regional Telemedicine Center along with its doctors shall not
          be held directly liable for my care or for any other untoward events
          that may occur in between, thus freeing them from any legal
          responsibilities in the future.
          <br />
          <br />I fully understand the nature, process, risks and benefits of
          teleconsultation as they were shared in a language that I can
          understand. I was given the opportunity to ask questions and my
          questions were answered.
        </p>
        <div className="accept-container">
          <input
            className="checkbox"
            type="checkbox"
            value={accept}
            checked={accept}
            onChange={() => {
              setAccept(!accept);
            }}
          />
          <p>Yes, I accept</p>
        </div>
      </div>
      <div className="form-btns">
        <div></div>
        <motion.button
          onClick={() => {
            setTerm(true);
            setPatientForm(false);
          }}
          whileTap={{ scale: 0.9 }}
          className={accept ? "consent-next-btn" : "consent-next-btn-disable"}
        >
          Next
        </motion.button>
      </div>
    </>
  );
};

export default PatientTerm;
