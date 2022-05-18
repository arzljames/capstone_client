import React from "react";
import "./DevTeam.css";
import lao from "../Assets/lao.jpg";
import viray from "../Assets/viray.jpg";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { GoMarkGithub } from "react-icons/go";

const DevTeam = () => {
  return (
    <div className="dev">
      <div className="dev-header">
        <h1>Meet our Dev Team</h1>
        <h2>We Are, Therefore we Develop</h2>
      </div>

      <div className="dev-card-container">
        <div className="dev-card">
          <img src={viray} alt="Viray" />
          <h5>Erika Mae E. Viray</h5>
          <p>Archivist/Test Engineer</p>
          <div className="social-btns">
            <div className="btn fb">
              <p
                onClick={() =>
                  window.open("https://www.facebook.com/erikamae.v.9", "_blank")
                }
              >
                <CgFacebook />
              </p>
            </div>
            <div className="btn ig">
              <p
                onClick={() =>
                  window.open("https://www.instagram.com/eri.viray/", "_blank")
                }
              >
                <CgInstagram />
              </p>
            </div>
          </div>
        </div>
        <div className="dev-card">
          <img src={lao} alt="Lao" />
          <h5>Arzl James I. Lao</h5>
          <p>Tech Lead/Full-Stack Programmer</p>

          <div className="social-btns">
            <div className="btn fb">
              <p
                onClick={() =>
                  window.open("https://facebook.com/arzl.james", "_blank")
                }
              >
                <CgFacebook />
              </p>
            </div>
            <div className="btn ig">
              <p
                onClick={() =>
                  window.open("https://instagram.com/arzl.james", "_blank")
                }
              >
                <CgInstagram />
              </p>
            </div>
            <div className="btn gh">
              <p
                onClick={() =>
                  window.open("https://github.com/arzljames", "_blank")
                }
              >
                <GoMarkGithub />
              </p>
            </div>
          </div>
        </div>
        <div className="dev-card">
          <img src="" alt="Militante" />
          <h5>Rina Militante</h5>
          <div className="social-btns">
            <div className="btn fb">
              <p
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/rina.militante",
                    "_blank"
                  )
                }
              >
                <CgFacebook />
              </p>
            </div>
            <div className="btn ig">
              <p
                onClick={() =>
                  window.open("https://www.instagram.com/r1na_99/", "_blank")
                }
              >
                <CgInstagram />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTeam;
