import React from "react";
import "./StatisticCard.css";

const StatisticCard = ({ heading, subHeading, total, image }) => {
  return (
    <div className="statistic-card">
      <div className="statistic-card-header">
        <h2>{heading}</h2>
      </div>
      <div className="statistic-card-body">
        <img src={image} alt="Icons" />
        <h1>{total}</h1>
      </div>
    </div>
  );
};

export default StatisticCard;
