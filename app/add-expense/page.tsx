"use client"

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ExpenseForm from '../components/ExpenseForm';
const AddExpensePage = () => {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/expenses', {
        name: data.expenseName,
        userId: 0, // Replace with actual user ID if available
        categoryId: data.categoryId,
        amount: parseFloat(data.expenseAmount),
        date: new Date(data.expenseDate).toISOString(),
        description: data.description
      });
      console.log(response.data);
      if (response.status === 200) {
        router.push('/expenses');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Add Expense</h2>
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddExpensePage;