// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const UserChart = () => (
  <ResponsiveLine
    data={[
      {
        id: "Patients",
        color: "hsl(275, 70%, 50%)",
        data: [
          {
            x: "Jan",
            y: 107,
          },
          {
            x: "Feb",
            y: 19,
          },
          {
            x: "Mar",
            y: 247,
          },
          {
            x: "Apr",
            y: 61,
          },
          {
            x: "May",
            y: 72,
          },
          {
            x: "Jun",
            y: 71,
          },
          {
            x: "Jul",
            y: 59,
          },
          {
            x: "Aug",
            y: 168,
          },
          {
            x: "Sep",
            y: 196,
          },
          {
            x: "Oct",
            y: 195,
          },
          {
            x: "Nov",
            y: 189,
          },
          {
            x: "Dec",
            y: 192,
          },
        ],
      },
      {
        id: "Cases",
        color: "hsl(277, 70%, 50%)",
        data: [
          {
            x: "Jan",
            y: 118,
          },
          {
            x: "Feb",
            y: 9,
          },
          {
            x: "Mar",
            y: 17,
          },
          {
            x: "Apr",
            y: 250,
          },
          {
            x: "May",
            y: 0,
          },
          {
            x: "Jun",
            y: 54,
          },
          {
            x: "Jul",
            y: 264,
          },
          {
            x: "Aug",
            y: 292,
          },
          {
            x: "Sep",
            y: 55,
          },
          {
            x: "Oct",
            y: 173,
          },
          {
            x: "Nov",
            y: 300,
          },
          {
            x: "Dec",
            y: 54,
          },
        ],
      },
    ]}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
      legend: "Months",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={5}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default UserChart;
