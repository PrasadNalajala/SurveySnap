"use client";

import ReactECharts from "echarts-for-react";

const PollChart = ({ pollData }) => {
  if (!pollData)
    return <p style={{ color: "white" }}>No poll data available</p>;

  const colors = [
    "#22D3EE",
    "#A855F7",
    "#EC4899",
    "#F43F5E",
    "#4F46E5",
    "#F97316",
    "#14B8A6",
    "#EAB308",
  ];

  const option = {
    title: {
      text: pollData.title,
      textStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "15%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: pollData.options.map((option) => option.text),
      axisLine: { lineStyle: { color: "#fff" } },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#fff" } },
    },
    series: [
      {
        name: "Votes",
        type: "bar",
        data: pollData.options.map((option, index) => ({
          value: option.votes,
          itemStyle: {
            color: colors[index % colors.length],
            borderRadius: [8, 8, 0, 0],
          },
        })),
      },
    ],
    backgroundColor: "black",
  };

  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "12px",
        backgroundColor: "#1e1e1e",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <ReactECharts option={option} style={{ height: 400, width: "100%" }} />
    </div>
  );
};

export default PollChart;
