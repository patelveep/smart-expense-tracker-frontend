import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchAPI } from '../utils/fetchAPI';

type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  description: string;
};

const transactions: Transaction[] = [
  { id: 1, name: 'ChatGPT Subscription', category: 'Utility', amount: 25, date: '2023-04-28T12:40:00Z', description: 'Monthly subscription' },
  { id: 2, name: 'Office Furniture', category: 'Utility', amount: 2500, date: '2023-05-17T13:30:00Z', description: 'Office chairs and desks' },
  { id: 3, name: 'iPhone 13 purchase', category: 'Mobile', amount: 1500, date: '2023-06-29T10:45:00Z', description: 'New iPhone 13' },
  { id: 4, name: 'DSTV Subscription', category: 'Utility', amount: 350, date: '2023-06-24T15:50:00Z', description: 'Monthly DSTV subscription' },
  { id: 5, name: 'DevFest Tfare', category: 'Travel', amount: 15, date: '2023-07-11T11:40:00Z', description: 'Travel fare for DevFest' },
  // ...additional transactions...
];

const categories = ['All', 'Utility', 'Mobile', 'Travel', 'Food', 'Entertainment'];

export default function TransactionHistoryTable() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'ascending' | 'descending' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
   fetchAPI('/transactions').then(res=>{
    console.log('res',res)
   }).catch(err=>{
    console.log('err',err)
   })
  
   
  }, [])
  

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof Transaction) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Transaction) => {
    if (!sortConfig) return null;
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            <th onClick={() => requestSort('id')} className="cursor-pointer min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              ID {getSortIndicator('id')}
            </th>
            <th onClick={() => requestSort('name')} className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              Name {getSortIndicator('name')}
            </th>
            <th onClick={() => requestSort('category')} className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              Category {getSortIndicator('category')}
            </th>
            <th onClick={() => requestSort('amount')} className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              Amount {getSortIndicator('amount')}
            </th>
            <th onClick={() => requestSort('date')} className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              Date {getSortIndicator('date')}
            </th>
            <th onClick={() => requestSort('description')} className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              Description {getSortIndicator('description')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((t, idx) => (
            <tr key={idx} className="border-t">
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.id}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.name}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.category}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.amount}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{format(new Date(t.date), 'MMM dd, yyyy')}</td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>Showing {itemsPerPage} of {transactions.length}</p>
        <div className="flex space-x-2">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
              </li>
              {[...Array(Math.ceil(transactions.length / itemsPerPage)).keys()].map(page => (
                <li key={page + 1}>
                  <button onClick={() => handlePageChange(page + 1)} className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === page + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                    {page + 1}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(transactions.length / itemsPerPage)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
