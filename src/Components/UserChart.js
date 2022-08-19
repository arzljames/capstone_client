import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useAuth from "../Hooks/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Patients",
      data: [23, 60, 110],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Cases",
      data: [232, 100, 10],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const UserChart = () => {
  const { patients } = useAuth();

  useEffect(() => {
    console.log(
      patients
        .map((e) => new Date(e.createdAt).getMonth() + 1)
        .filter((f) => {
          return f === 7;
        })
    );
  }, []);

  return (
    <div className="chart-container">
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
        data={data}
      />
    </div>
  );
};

export default UserChart;
