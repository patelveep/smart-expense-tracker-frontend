"use client";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import ExpenseByCatCharts from "@/components/ExpenseByCatCharts/ExpenseByCatCharts";
import ExpenseBarChart from "@/components/ExpenseByDateCharts/ExpenseByDateCharts";
import ExpenseTable from "@/components/ExpenseLastRecords/ExpenseLastRecords";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="grid items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* First two components side by side */}
            <div className="col-span-1 lg:col-span-1">
              <ExpenseByCatCharts />
            </div>
            <div className="col-span-1 lg:col-span-1">
              <ExpenseBarChart />
            </div>
            {/* Third component spans the full width */}
            <div className="col-span-1 lg:col-span-3">
              <ExpenseTable />
            </div>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
}
