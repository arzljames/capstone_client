import React from "react";
import "./StatisticCard.css";

const StatisticCard = ({
  heading,
  subHeading,
  total,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="statistic-card">
      <div className="statistic-card-header">
        <h2>{heading}</h2>
        <p style={{ color: iconColor, background: iconBg }}>{icon}</p>
      </div>
      <h1>{total}</h1>

      <div style={{ background: iconBg }} className="footer">
        <p style={{ background: iconColor }}></p>
      </div>
    </div>
  );
};

export default StatisticCard;
