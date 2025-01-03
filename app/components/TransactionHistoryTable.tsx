import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchAPI, put } from '../utils/fetchAPI';
import CustomModal from './CustomModal'; // Import the custom modal component

type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  description: string;
};

const categoriesList = [
  { id: 1, value: 'food', label: 'Food' },
  { id: 2, value: 'housing', label: 'Housing' },
  { id: 3, value: 'transportation', label: 'Transportation' },
  { id: 4, value: 'utilities', label: 'Utilities' },
  { id: 5, value: 'healthcare', label: 'Healthcare' },
  { id: 6, value: 'entertainment', label: 'Entertainment' },
  { id: 7, value: 'education', label: 'Education' },
  { id: 8, value: 'other', label: 'Other' },
];

const categories = ['All', ...categoriesList.map((category) => category.label)];

export default function TransactionHistoryTable() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'ascending' | 'descending' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAPI('/expenses?page=1&pageSize=10000')
      .then((res) => {
        console.log('res', res);

        setTransactions(
          res.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              category: item.categoryName,
              amount: item.amount,
              date: item.date,
              description: item.description,
              rawData: item
            };
          })
        );
        requestSort('date')
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (selectedCategory === 'All' || transaction.category === selectedCategory) &&
      (transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
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

  const openModal = (transactionId: number) => {
    setTransactionToDelete(transactionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionToDelete(null);
  };

  const handleDelete = () => {
    if (transactionToDelete !== null) {
      setTransactions(transactions.filter((t) => t.id !== transactionToDelete));


      const transactionDelete = transactions.filter((t) => t.id === transactionToDelete)[0];
      console.log('transactionToDelete', transactionDelete);
      
      put('/expenses/' + transactionToDelete, {
        isActive: false,
        isDeleted:true,
        ...transactionDelete.rawData
      })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
      }).finally(()=>{
      closeModal();

      })

    }
  };

  const paginatedTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mx-6 mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Transaction History</h1>
        <div className="flex space-x-4">

          <button
            onClick={() => {
              window.location.href = '/add-expense';
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Expense
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
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
            <th
              onClick={() => requestSort('id')}
              className="cursor-pointer min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left"
            >
              ID {getSortIndicator('id')}
            </th>
            <th
              onClick={() => requestSort('name')}
              className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left"
            >
              Name {getSortIndicator('name')}
            </th>
            <th
              onClick={() => requestSort('category')}
              className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left"
            >
              Category {getSortIndicator('category')}
            </th>
            <th
              onClick={() => requestSort('amount')}
              className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left"
            >
              Amount {getSortIndicator('amount')}
            </th>
            <th
              onClick={() => requestSort('date')}
              className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left"
            >
              Date {getSortIndicator('date')}
            </th>
            <th
              onClick={() => requestSort('description')}
              className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left"
            >
              Description {getSortIndicator('description')}
            </th>
            <th className="cursor-pointer min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11 text-left">
              Action
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
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                {format(new Date(t.date), 'MMM dd, yyyy')}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">{t.description}</td>
              <td className={`border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11`}>
                <button
                  onClick={() => {
                    window.location.href = `/update-expense/${t.id}`;
                  }}
                  className="hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#212121"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>

                <button onClick={() => openModal(t.id)} className="ml-3 hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing { itemsPerPage > filteredTransactions.length ? filteredTransactions.length:itemsPerPage} of {filteredTransactions.length}
        </p>
        <div className="flex space-x-2">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {[...Array(Math.ceil(transactions.length / itemsPerPage)).keys()].map((page) => (
                <li key={page + 1}>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight ${
                      currentPage === page + 1
                        ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(transactions.length / itemsPerPage)}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this transaction?</p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete
            </button>
            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
