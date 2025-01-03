"use client";
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// Function to generate repeating colors
const generateRepeatingColors = (num) => {
  const materialColors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#9E9E9E",
    "#607D8B",
  ];
  return Array.from({ length: num }, (_, i) => materialColors[i % materialColors.length]);
};

const ExpenseBarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Updated data with month names
  const monthlyData = [
    { month: "Jan", expense: 400 },
    { month: "Feb", expense: 200 },
    { month: "Mar", expense: 150 },
    { month: "Apr", expense: 100 },
    { month: "May", expense: 300 },
    { month: "Jun", expense: 250 },
    { month: "Jul", expense: 180 },
    { month: "Aug", expense: 220 },
    { month: "Sep", expense: 170 },
    { month: "Oct", expense: 190 },
    { month: "Nov", expense: 210 },
    { month: "Dec", expense: 230 },
  ];

  const yearlyData = [
    { month: "Jan", expense: 4800 },
    { month: "Feb", expense: 2400 },
    { month: "Mar", expense: 1800 },
    { month: "Apr", expense: 1200 },
    { month: "May", expense: 3600 },
    { month: "Jun", expense: 3000 },
    { month: "Jul", expense: 2160 },
    { month: "Aug", expense: 2640 },
    { month: "Sep", expense: 2040 },
    { month: "Oct", expense: 2280 },
    { month: "Nov", expense: 2520 },
    { month: "Dec", expense: 2760 },
  ];

  const data = selectedPeriod === "monthly" ? monthlyData : yearlyData;

  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Satoshi, sans-serif",
      toolbar: {
        show: true,
        tools: {
          download: false, // Removes the download option
          // You can disable other tools if needed
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      background: "#1F2937", // Dark background for the chart
      foreColor: "#D1D5DB", // Light text color for axes and labels
    },
    colors: generateRepeatingColors(data.length),
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%", // Makes the bars slightly wider
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: data.map((item) => item.month),
      title: {
        text: "Months",
        style: {
          color: "#D1D5DB", // Light text color for the axis title
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB", // Light text color for the axis labels
        },
      },
    },
    yaxis: {
      title: {
        text: "Expenses ($)",
        style: {
          color: "#D1D5DB", // Light text color for the axis title
        },
      },
      labels: {
        style: {
          colors: "#D1D5DB", // Light text color for the axis labels
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#D1D5DB", // Light text color for the legend labels
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.15,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "darken",
          value: 0.25,
        },
      },
    },
  };

  const series = [
    {
      name: "Expenses",
      data: data.map((item) => item.expense),
    },
  ];

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className="col-span-12 rounded-lg border border-gray-700 bg-gray-800 px-6 py-6 shadow-lg sm:px-8 xl:col-span-5">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-2xl font-semibold text-gray-200">
          Expense by {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
        </h5>
        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="rounded-md border border-gray-600 bg-gray-700 py-2 px-4 text-sm text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-6">
        <div id="barChart" className="mx-auto flex justify-center w-full">
          <ReactApexChart options={options} series={series} type="bar" height={350} width={600} />
        </div>
      </div>

      {/* Uncomment and modify if you want to display additional information */}
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-lg bg-gray-700 p-4"
          >
            <span
              className="block h-4 w-4 rounded-full"
              style={{ backgroundColor: options.colors[index] }}
            ></span>
            <p className="flex flex-1 justify-between text-sm font-medium text-gray-200">
              <span>{item.month}</span>
              <span>${item.expense}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBarChart;
