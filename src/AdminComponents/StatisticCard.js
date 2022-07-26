import React from "react";
import "./StatisticCard.css";
import { motion } from "framer-motion";


//Component used in dashboard to show statistics of data
const StatisticCard = ({
  heading,
  total,
  icon,
  bg,
  subBg,
  subTotal,
  setStats,
  stats,
}) => {
  const variant = {
    initial: {
      background: "#fff",
      border: "1px solid #dddddd",
    },
    animate: {
      background: subBg,
      border: `1px solid ${bg}`,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        border: "none",
      },
    },
  };
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate={stats === heading ? "animate" : "initial"}
      onClick={() => setStats(heading)}
      className="statistic-card"
    >
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
    </motion.div>
  );
};

export default StatisticCard;
