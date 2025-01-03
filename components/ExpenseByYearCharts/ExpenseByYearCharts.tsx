"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// Function to generate colors that repeat when categories exceed available colors
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
  return Array.from(
    { length: num },
    (_, i) => materialColors[i % materialColors.length]
  );
};

const ExpenseByYearCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonth = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getSummary`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        const cat = data?.groupedByYear?.map((cat) => {
          return {
            year: cat.year,
            expense: cat.totalAmount,
          };
        });

        console.log("cat", cat);
        setData(cat);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMonth();
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: generateRepeatingColors(data?.length),
    labels: data?.map((cat) => cat?.year),
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  const series = data?.map((cat) => cat.expense);

  return (
    <div className="col-span-12 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-6 py-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 sm:px-8 xl:col-span-5">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Expense by Year
          
        </h5>
      </div>

      <div className="mb-6">
        {!data || data.length === 0 ? (
          <div className="flex items-center justify-center py-6 w-full">
            <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              No data found
            </h2>
          </div>
        ) : (
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
        {data?.map((category, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-700"
          >
            <span
              className="block h-4 w-4 rounded-full"
              style={{ backgroundColor: options?.colors[index] }}
            ></span>
            <p className="flex flex-1 justify-between text-sm font-medium text-gray-800 dark:text-gray-200">
              <span>{category.year}</span>
              <span>
                {(
                  (category.expense / series.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(1)}
                %
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseByYearCharts;
