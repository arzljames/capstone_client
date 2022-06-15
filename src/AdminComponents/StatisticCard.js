import React from "react";
import "./StatisticCard.css";

const StatisticCard = ({ heading, total, icon, iconColor, bg, subTotal }) => {
  return (
    <div style={{ background: bg }} className="statistic-card">
      <div className="card-upper">
        <div className="card-content">
          <h2>{total}</h2>
          <p>{heading}</p>
        </div>
        <div className="card-icon">
          <p>{icon}</p>
        </div>
      </div>

      <div className="card-lower">
        <p style={{ color: iconColor }}>{subTotal}</p>
      </div>
    </div>
  );
};

export default StatisticCard;
