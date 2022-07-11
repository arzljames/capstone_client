import React from "react";
import "./StatisticCard.css";

const StatisticCard = ({
  heading,
  total,
  icon,
  iconColor,
  bg,
  subBg,
  subTotal,
}) => {
  return (
    <div className="statistic-card">
      <div className="card-upper">
        <div className="card-content">
          <h2>{total}</h2>
          <p>{heading}</p>
          <p style={{ color: bg, fontWeight: 500, marginTop: "5px" }}>
            {subTotal}
          </p>
        </div>
        <div style={{ background: subBg }} className="card-icon">
          <p style={{ color: bg }}>{icon}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
