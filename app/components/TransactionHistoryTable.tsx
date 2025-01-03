import React from 'react';

type Transaction = {
  transaction: string;
  category: string;
  amount: string;
  date: string;
  time: string;
  status: 'Approved' | 'Pending' | 'Declined';
};

const transactions: Transaction[] = [
  { transaction: 'ChatGPT Subscription', category: 'Utility', amount: '$25', date: 'Apr 28, 2023', time: '12:40 PM', status: 'Approved' },
  { transaction: 'Office Furniture', category: 'Utility', amount: '$2500', date: 'May 17, 2023', time: '1:30 PM', status: 'Pending' },
  { transaction: 'iPhone 13 purchase', category: 'Mobile', amount: '$1500', date: 'Jun 29, 2023', time: '10:45 AM', status: 'Declined' },
  { transaction: 'DSTV Subscription', category: 'Utility', amount: '$350', date: 'Jun 24, 2023', time: '3:50 PM', status: 'Approved' },
  { transaction: 'DevFest Tfare', category: 'Travel', amount: '$15', date: 'Jul 11, 2023', time: '11:40 AM', status: 'Pending' },
  { transaction: 'ChatGPT Subscription', category: 'Utility', amount: '$25', date: 'Apr 28, 2023', time: '12:40 PM', status: 'Approved' },
  { transaction: 'Office Furniture', category: 'Utility', amount: '$2500', date: 'May 17, 2023', time: '1:30 PM', status: 'Pending' },
  { transaction: 'iPhone 13 purchase', category: 'Mobile', amount: '$1500', date: 'Jun 29, 2023', time: '10:45 AM', status: 'Declined' },
  { transaction: 'DSTV Subscription', category: 'Utility', amount: '$350', date: 'Jun 24, 2023', time: '3:50 PM', status: 'Approved' },
  { transaction: 'DevFest Tfare', category: 'Travel', amount: '$15', date: 'Jul 11, 2023', time: '11:40 AM', status: 'Pending' },
];

const statusStyles: Record<Transaction['status'], string> = {
  Approved: 'text-green-600',
  Pending: 'text-orange-500',
  Declined: 'text-red-600',
};

const categories = ['All', 'Utility', 'Mobile', 'Travel', 'Food', 'Entertainment'];

export default function TransactionHistoryTable() {
  return (
    <div className="mx-6 mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Transaction History</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">Transaction</th>
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">Category</th>
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">Amount</th>
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">Date</th>
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">Time</th>
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, idx) => (
            <tr key={idx} className="border-t">
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.transaction}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.category}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.amount}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.date}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.time}</td>
              <td className={`border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 ${statusStyles[t.status]}`}>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>Showing 10 of 50</p>
        <div className="flex space-x-2">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
