"use client"

import React, { useEffect, useState } from 'react';
import { post } from '../utils/fetchAPI';
import { useRouter } from 'next/navigation';
import ExpenseForm from '../components/ExpenseForm';
import { fetchAPI } from '../utils/fetchAPI';
import DefaultLayout from '../components/Layouts/DefaultLayout';
const AddExpensePage = () => {
  const router = useRouter();

  useEffect(() => {
    fetchAPI('/transactions').then(res=>{
     console.log('res',res)
    }).catch(err=>{
     console.log('err',err)
    }) 
    
   }, [])

  const handleSubmit = async (data) => {
    try {
      const response = await post('/expenses', {
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
    <DefaultLayout>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Add Expense</h2>
        <ExpenseForm onSubmit={handleSubmit} buttonLabel="Save Expense" />
      </div>
    </div>
    </DefaultLayout>
  );
};

export default AddExpensePage;