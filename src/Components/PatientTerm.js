import React from "react";
import { motion } from "framer-motion";

const PatientTerm = ({ accept, setAccept, setTerm, setPatientForm }) => {
  return (
    <>
      <div className="form-body">
        <p>
          <strong>Introduction and Purpose:</strong> The ZCMC Regional
          Telemedicine Center has been established to provide sound medical
          advice to other healthcare providers through various telecommunication
          systems available. This may involve live two-way audio and video,
          patient pictures, medical images, patient’s medical records and other
          things that may be pertinent to the process of telemedicine. It does
          not have direct physical contact with the parties involved and relies
          solely on the information being given by the referring hospital.
          Electronic systems will utilize network and software security
          protocols to protect patient identity, privacy and confidentiality and
          to safeguard data and prevent corruption of data against intentional
          or unintentional corruption. <br />
          <br />
          <strong>Nature of the teleconsultation:</strong> It was explained to
          me by my attending physician that an SMS, phone call, online chat or
          video conferencing technology will be used to conduct the telemedicine
          consultation. I understand that as in the face-to-face consultation,
          my medical history along with my laboratory test/s, imaging results
          and other documents pertinent to my concerns will be shared by my
          attending physician to the ZCMC telemedicine specialists. Moreover, I
          may be asked to show certain body parts as may be considered important
          to form a diagnosis. This is in view of the fact that the specialist
          we will be referring to will not be in the same hospital as I am and
          would not be able to perform the necessary physical examination on me.{" "}
          <br />
          <br />
          <strong>Benefits:</strong> Through the use of teleconsultation, my
          attending physicians will be able to concur with certain specialists
          who will in turn aid them in obtaining a medical evaluation and
          impression of my condition. I may receive guidance on monitoring my
          condition and the next steps to do should my condition change,
          specific prescription on what to take, instructions on what laboratory
          and imaging tests to do. <br />
          <br />
          <strong>Potential Risks:</strong> I understand there are potential
          risks in using this technology, including technical difficulties,
          interruptions, poor transmission of images leading to misdiagnosis and
          consequently mistreatment, no access to paper charts/medical records,
          delays and deficiencies due to malfunction of electronic equipment and
          software, unauthorized access leading to breach of data privacy and
          confidentiality. <br />
          <br />
          All consultations are considered confidential but given the nature of
          technology, I understand that despite using appropriate measures, the
          ZCMC Telemedicine Regional Center OPD and other related units cannot
          guarantee the safety of my personal data from data hacking. Therefore,
          I cannot hold them liable for any data that may be lost, corrupted,
          destroyed or intercepted or the illegal use of my data arising from a
          breach in security. <br />
          <br />
          <strong>Data Privacy and Confidentiality:</strong> I agree to share my
          personal data in order to facilitate scheduling of my consultation and
          to be utilized for research purposes. I agree not to record in video
          or audio format nor divulge the details of my consultation in
          compliance with the Data Privacy Act of 2012. <br />
          <br />
          <strong>Rights:</strong> I have the right to: 1. Terminate the
          telemedicine teleconsultation at any time. 2. Be accompanied and
          assisted by a family member or caregiver during the teleconsultation.{" "}
          <br />
          <br />
          <strong>Limitations:</strong> The strength of network signal, the
          speed of the internet,audibility of the sound, the presence of
          background noise, clarity of the images, all affect the quality of the
          telemedicine consultation. Physical examination as done in the usual
          face-to-face consultation is not possible and is therefore a big
          limitation to the process of making a diagnosis. <br />
          <br /> <strong>In case of an urgent concern:</strong> It is my
          doctor’s responsibility to refer me to the nearest Emergency Room or
          hospital of my choice in case he/she deems my concern to be urgent and
          would warrant immediate action and management. <br />
          <br />I acknowledge that prior to engaging in such consultation
          platform, I have been made fully aware of its purpose, scopes and
          limitations. <br />
          <br />
          I further acknowledge that consent was given to share my medical
          history, records and laboratory results for the purpose of discussion,
          in accordance with the RA 10173 Data Privacy Act. <br />
          <br />I further acknowledge that I am aware this virtual encounter
          will be recorded and all details be kept confidential between my
          attending physician and the ZCMC Telemedicine healthcare personnel
          involved. <br />
          <br />
          I further acknowledge given that this is only a virtual consult, the
          ZCMC Regional Telemedicine Center along with its doctors shall not be
          held directly liable for my care or for any other untoward events that
          may occur in between, thus freeing them from any legal
          responsibilities in the future. <br />
          <br />I fully understand the nature, processes, risks and benefits of
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
