import DefaultLayout from "./components/Layouts/DefaultLayout";
import ExpenseByCatCharts from "@/components/ExpenseByCatCharts/ExpenseByCatCharts";
import ExpenseBarChart from "@/components/ExpenseByDateCharts/ExpenseByDateCharts";
import ExpenseTable from "@/components/ExpenseLastRecords/ExpenseLastRecords";

export default function Home() {
  const mockRecords = [
    {
      id: 1,
      expenseName: "Groceries",
      description: "Weekly food supplies",
      category: "Food",
      amount: 150.0,
      date: "2025-01-01",
    },
    {
      id: 2,
      expenseName: "Bus Ticket",
      description: "Daily commute",
      category: "Transport",
      amount: 2.5,
      date: "2025-01-02",
    },
    {
      id: 3,
      expenseName: "Movie Night",
      description: "Cinema tickets",
      category: "Entertainment",
      amount: 30.0,
      date: "2025-01-02",
    },
    {
      id: 4,
      expenseName: "Dinner",
      description: "Family dinner",
      category: "Food",
      amount: 70.0,
      date: "2025-01-03",
    },
    {
      id: 5,
      expenseName: "Gym Membership",
      description: "Monthly subscription",
      category: "Health",
      amount: 50.0,
      date: "2025-01-03",
    },
    {
      id: 6,
      expenseName: "Books",
      description: "Programming books",
      category: "Education",
      amount: 100.0,
      date: "2025-01-04",
    },
    {
      id: 7,
      expenseName: "Phone Bill",
      description: "Monthly payment",
      category: "Utilities",
      amount: 40.0,
      date: "2025-01-04",
    },
    {
      id: 8,
      expenseName: "Laptop Repair",
      description: "Keyboard replacement",
      category: "Maintenance",
      amount: 200.0,
      date: "2025-01-05",
    },
    {
      id: 9,
      expenseName: "Coffee",
      description: "Morning coffee",
      category: "Food",
      amount: 5.0,
      date: "2025-01-05",
    },
    {
      id: 10,
      expenseName: "Taxi Ride",
      description: "Airport drop-off",
      category: "Transport",
      amount: 25.0,
      date: "2025-01-05",
    },
  ];
  return (
    <DefaultLayout>
      <div className="grid items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* First two components side by side */}
            <div className="col-span-1 lg:col-span-1">
              <ExpenseByCatCharts />
            </div>
            <div className="col-span-1 lg:col-span-1">
              <ExpenseBarChart />
            </div>
            {/* Third component spans the full width */}
            <div className="col-span-1 lg:col-span-3">
              <ExpenseTable records={mockRecords} />
            </div>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
}
