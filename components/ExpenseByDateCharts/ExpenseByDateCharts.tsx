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

  const monthlyData = [
    { category: "Food", expense: 400 },
    { category: "Transport", expense: 200 },
    { category: "Shopping", expense: 150 },
    { category: "Others", expense: 100 },
    { category: "Entertainment", expense: 300 },
    { category: "Health", expense: 250 },
    { category: "Utilities", expense: 180 },
  ];

  const yearlyData = [
    { category: "Food", expense: 4800 },
    { category: "Transport", expense: 2400 },
    { category: "Shopping", expense: 1800 },
    { category: "Others", expense: 1200 },
    { category: "Entertainment", expense: 300 },
    { category: "Health", expense: 250 },
    { category: "Utilities", expense: 180 },
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
        },
      },
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
      categories: data.map((item) => item.category),
      title: {
        text: "Categories",
        style: {
          color: "#bbbbbb", // Light text color for the axis title
        },
      },
      labels: {
        style: {
          colors: "#bbbbbb", // Light text color for the axis labels
        },
      },
    },
    yaxis: {
      title: {
        text: "Expenses ($)",
        style: {
          color: "#bbbbbb", // Light text color for the axis title
        },
      },
      labels: {
        style: {
          colors: "#bbbbbb", // Light text color for the axis labels
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
        colors: "#bbbbbb", // Light text color for the legend labels
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
    <div className="col-span-12 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-6 py-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 sm:px-8 xl:col-span-5">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Expense by {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
        </h5>
        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-6">
        <div id="barChart" className="mx-auto flex justify-center w-full">
          <ReactApexChart options={options} series={series} type="bar" height={350} width={400} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
          >
            <span
              className="block h-4 w-4 rounded-full"
              style={{ backgroundColor: options.colors[index] }}
            ></span>
            <p className="flex flex-1 justify-between text-sm font-medium text-gray-800 dark:text-gray-200">
              <span>{item.category}</span>
              <span>${item.expense}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBarChart;
