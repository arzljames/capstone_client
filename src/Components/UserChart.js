// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import useAuth from "../Hooks/useAuth";
import { month } from "javascript-time-ago/gradation";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const UserChart = ({ yearSelected }) => {
  const { patients, cases } = useAuth();
  const [months, setMonths] = useState(null);
  const [monthsCase, setMonthsCase] = useState(null);

  useEffect(() => {
    function extract() {
      const groups = {};
      patients
        .filter(
          (e) =>
            parseInt(yearSelected) === parseInt(e.createdAt.substring(0, 4))
        )
        .map(function (val) {
          const dates = new Date(val.createdAt);
          const date = dates.toLocaleString("en-us", { month: "short" });
          if (date in groups) {
            groups[date].push(val._id);
          } else {
            groups[date] = new Array(val._id);
          }
        });

      setMonths(groups);
      return groups;
    }

    function extractCase() {
      const groups = {};
      cases
        .filter(
          (e) =>
            parseInt(yearSelected) === parseInt(e.createdAt.substring(0, 4))
        )
        .forEach(function (val) {
          const dates = new Date(val.createdAt);
          const date = dates.toLocaleString("en-us", { month: "short" });
          if (date in groups) {
            groups[date].push(val._id);
          } else {
            groups[date] = new Array(val._id);
          }
        });

      setMonthsCase(groups);
      return groups;
    }

    extract();
    extractCase();
  }, [patients, cases, yearSelected]);

  return (
    <>
      <ResponsiveLine
        data={[
          {
            id: "Patients",
            color: "hsl(169, 100%, 94%)",
            data: [
              months?.Jan
                ? { x: "Jan", y: months.Jan.length }
                : { x: "Jan", y: 0 },
              months?.Feb
                ? { x: "Feb", y: months.Feb.length }
                : { x: "Feb", y: 0 },
              months?.Mar
                ? { x: "Mar", y: months.Mar.length }
                : { x: "Mar", y: 0 },
              months?.Apr
                ? { x: "Apr", y: months.Apr.length }
                : { x: "Apr", y: 0 },
              months?.May
                ? { x: "May", y: months.May.length }
                : { x: "May", y: 0 },
              months?.Jun
                ? { x: "Jun", y: months.Jun.length }
                : { x: "Jun", y: 0 },
              months?.Jul
                ? { x: "Jul", y: months.Jul.length }
                : { x: "Jul", y: 0 },
              months?.Aug
                ? { x: "Aug", y: months.Aug.length }
                : { x: "Aug", y: 0 },
              months?.Sep
                ? { x: "Sep", y: months.Sep.length }
                : { x: "Sep", y: 0 },
              months?.Oct
                ? { x: "Oct", y: months.Oct.length }
                : { x: "Oct", y: 0 },
              months?.Nov
                ? { x: "Nov", y: months.Nov.length }
                : { x: "Nov", y: 0 },
              months?.Dec
                ? { x: "Dec", y: months.Dec.length }
                : { x: "Dec", y: 0 },
            ],
          },

          {
            id: "Cases",
            color: "hsl(169, 100%, 94%)",
            data: [
              monthsCase?.Jan
                ? { x: "Jan", y: monthsCase.Jan.length }
                : { x: "Jan", y: 0 },
              monthsCase?.Feb
                ? { x: "Feb", y: monthsCase.Feb.length }
                : { x: "Feb", y: 0 },
              monthsCase?.Mar
                ? { x: "Mar", y: monthsCase.Mar.length }
                : { x: "Mar", y: 0 },
              monthsCase?.Apr
                ? { x: "Apr", y: monthsCase.Apr.length }
                : { x: "Apr", y: 0 },
              monthsCase?.May
                ? { x: "May", y: monthsCase.May.length }
                : { x: "May", y: 0 },
              monthsCase?.Jun
                ? { x: "Jun", y: monthsCase.Jun.length }
                : { x: "Jun", y: 0 },
              monthsCase?.Jul
                ? { x: "Jul", y: monthsCase.Jul.length }
                : { x: "Jul", y: 0 },
              monthsCase?.Aug
                ? { x: "Aug", y: monthsCase.Aug.length }
                : { x: "Aug", y: 0 },
              monthsCase?.Sep
                ? { x: "Sep", y: monthsCase.Sep.length }
                : { x: "Sep", y: 0 },
              monthsCase?.Oct
                ? { x: "Oct", y: monthsCase.Oct.length }
                : { x: "Oct", y: 0 },
              monthsCase?.Nov
                ? { x: "Nov", y: monthsCase.Nov.length }
                : { x: "Nov", y: 0 },
              monthsCase?.Dec
                ? { x: "Dec", y: monthsCase.Dec.length }
                : { x: "Dec", y: 0 },
            ],
          },
        ]}
        margin={{ top: 60, right: 40, bottom: 60, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.0f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `Months of year ${yearSelected}`,
          legendOffset: 50,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "COUNT",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={4}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "top",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -50,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
          },
        ]}
      />
    </>
  );
};

export default UserChart;
