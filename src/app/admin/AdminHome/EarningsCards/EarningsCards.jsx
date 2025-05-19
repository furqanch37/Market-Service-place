"use client";

import React from "react";
import {
  Chart,
  Axis,
  Series,
  Tooltip,
  Line,
  Pie,
} from "@tanstack/react-charts";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";

import "./EarningsCards.css";


const yearlyData = [
  {
    label: "2024",
    data: [{ primary: "2024", secondary: 80 }],
  },
  {
    label: "2023",
    data: [{ primary: "2023", secondary: 20 }],
  },
];

const monthlyLineData = [
  {
    label: "Monthly Earnings",
    data: [
      { primary: new Date(2024, 0, 1), secondary: 3000 },
      { primary: new Date(2024, 1, 1), secondary: 2000 },
      { primary: new Date(2024, 2, 1), secondary: 4500 },
      { primary: new Date(2024, 3, 1), secondary: 3500 },
      { primary: new Date(2024, 4, 1), secondary: 5000 },
      { primary: new Date(2024, 5, 1), secondary: 4000 },
    ],
  },
];

const EarningsCards = () => {
  return (
    <div className="container">
      {/* Yearly Breakup Card */}
      <div className="card yearly">
        <div className="header">
          <h3>Yearly Breakup</h3>
          <div className="chart-pie">
            <Chart
              options={{
                data: yearlyData,
                primaryAxis: {
                  getValue: (datum) => datum.primary,
                },
                secondaryAxis: {
                  getValue: (datum) => datum.secondary,
                  stacked: true,
                },
                series: {
                  type: "pie",
                },
              }}
            >
              <Pie />
            </Chart>
          </div>
        </div>

        <div className="info">
          <h2>$36,358</h2>
          <div className="growth positive">
            <FiArrowUpRight />
            <span>+9% last year</span>
          </div>
        </div>

        <div className="legend">
          <div>
            <span className="dot blue"></span> 2024
          </div>
          <div>
            <span className="dot lightblue"></span> 2023
          </div>
        </div>
      </div>

      {/* Monthly Earnings Card */}
      <div className="card monthly">
        <div className="header">
          <h3>Monthly Earnings</h3>
          <div className="icon-circle">
            <FaDollarSign color="white" />
          </div>
        </div>

        <div className="info">
          <h2>$6,820</h2>
          <div className="growth negative">
            <FiArrowDownRight />
            <span>+9% last year</span>
          </div>
        </div>

        <div className="chart-line">
          <Chart
            options={{
              data: monthlyLineData,
              primaryAxis: {
                getValue: (datum) => datum.primary,
                scaleType: "time",
              },
              secondaryAxis: {
                getValue: (datum) => datum.secondary,
              },
            }}
          >
            <Line />
          </Chart>
        </div>
      </div>
    </div>
  );
};

export default EarningsCards;
