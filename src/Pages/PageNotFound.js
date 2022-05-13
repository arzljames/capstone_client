import React from "react";
import "./PageNotFound.css";
import broken from "../Assets/broken.svg";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found-container">
      <div className="page-not-found">
        <img src={broken} alt="Broken" />
        <div className="page-404">
          <h1>404</h1>
          <h2>Looks like you're lost</h2>
          <p>Page not found</p>

          <button onClick={() => navigate("/")}>
            Back to home{" "}
            <p>
              <HiArrowNarrowRight />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
