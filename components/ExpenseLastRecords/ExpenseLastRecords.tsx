"use client";

import React, { useEffect, useState } from "react";

const ExpenseTable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/expenses?page=1&pageSize=10", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        const cat = data?.map((ex) => ({
          id: ex.id,
          expenseName: ex.name,
          description: ex.description,
          category: ex.categoryName,
          amount: ex.amount,
          date: ex.date,
        }));
        setRecords(cat);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="col-span-12 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 sm:p-8 xl:col-span-5">
      <h5 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Last 10 Records
      </h5>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-700 dark:divide-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Expense Name</th>
              <th className="px-4 py-3 text-left font-medium">Description</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-right font-medium">Amount ($)</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3">{record.id}</td>
                  <td className="px-4 py-3">{record.expenseName}</td>
                  <td className="px-4 py-3">{record.description}</td>
                  <td className="px-4 py-3">{record.category}</td>
                  <td className="px-4 py-3 text-right">
                    {record.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{record.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
                >
                  No records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
