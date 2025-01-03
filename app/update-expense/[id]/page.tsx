"use client"

import React, { useEffect, useState } from 'react';
import { get, put } from '../../utils/fetchAPI';
import { useRouter, useParams } from 'next/navigation';
import ExpenseForm from '../../components/ExpenseForm';

const UpdateExpensePage = () => {
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();
  const { id: expenseId } = useParams();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await get(`/expenses/${expenseId}`);
        setInitialData(response);
      } catch (error) {
        console.error('There was an error fetching the expense!', error);
      }
    };

    if (expenseId) {
      fetchExpense();
    }
  }, [expenseId]);

  const handleSubmit = async (data) => {
    try {
      const response = await put(`/expenses/${expenseId}`, {
        name: data.expenseName,
        userId: 0, // Replace with actual user ID if available
        categoryId: data.categoryId,
        amount: parseFloat(data.expenseAmount),
        date: new Date(data.expenseDate).toISOString(),
        description: data.description
      });
      console.log(response.data);
      if (response) {
        router.push('/expenses');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Update Expense</h2>
        <ExpenseForm initialData={initialData} onSubmit={handleSubmit} buttonLabel="Update Expense"/>
      </div>
    </div>
  );
};

export default UpdateExpensePage;