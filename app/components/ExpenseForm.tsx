"use client"

import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ initialData = {}, onSubmit, buttonLabel }) => {
  const [expenseName, setExpenseName] = useState(initialData.expenseName || '');
  const [expenseAmount, setExpenseAmount] = useState(initialData.expenseAmount || '');
  const [categoryId, setCategoryId] = useState(initialData.categoryId || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [expenseDate, setExpenseDate] = useState(initialData.expenseDate || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [amountError, setAmountError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const MAX_AMOUNT = 999999;
  const MAX_DESCRIPTION_LENGTH = 500;

  const categories = [
    { id: 1, value: 'food', label: 'Food' },
    { id: 2, value: 'housing', label: 'Housing' },
    { id: 3, value: 'transportation', label: 'Transportation' },
    { id: 4, value: 'utilities', label: 'Utilities' },
    { id: 5, value: 'healthcare', label: 'Healthcare' },
    { id: 6, value: 'entertainment', label: 'Entertainment' },
    { id: 7, value: 'education', label: 'Education' },
    { id: 8, value: 'other', label: 'Other' },
  ];


  useEffect(() => {
    const isValid =
      expenseName &&
      expenseAmount &&
      categoryId &&
      expenseDate &&
      description &&
      !amountError &&
      !descriptionError;
    setIsFormValid(isValid);
  }, [expenseName, expenseAmount, categoryId, expenseDate, description, amountError, descriptionError]);


  const handleInput = (e) => {
    const { id, value } = e.target;
    if (id === 'expenseAmount') {
      // Allow only numbers and a single decimal point
      let validValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
      // Ensure the value does not exceed the maximum amount
      if (parseFloat(validValue) > MAX_AMOUNT) {
        setAmountError(`Amount cannot exceed ${MAX_AMOUNT}`);
      } else if (parseFloat(validValue) === 0) {
        setAmountError('Amount must be greater than 0.');
      } else {
        setAmountError(''); // Clear error if valid
      }
      setExpenseAmount(validValue);
      e.target.value = validValue;
    } else if (id === 'description') {
        // Ensure the description does not exceed the maximum length
        if (value.length > MAX_DESCRIPTION_LENGTH) {
          setDescriptionError(`Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`);
        } else {
          setDescriptionError(''); // Clear error if valid
        }
        setDescription(value);
      }
     else {
      // Remove special characters for other inputs
      const validValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
      e.target.value = validValue;
      if (id === 'expenseName') setExpenseName(validValue);
      if (id === 'description') setDescription(validValue);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(cat => cat.value === e.target.value);
    setCategoryId(selectedCategory ? selectedCategory.id : '');
    setCategory(selectedCategory ? selectedCategory.value : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amountError) {
      return; // Prevent form submission if there's an amount error
    }
    onSubmit({
      expenseName,
      expenseAmount,
      categoryId,
      expenseDate,
      description
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="expenseName" className="block text-sm font-bold text-gray-900">Expense Name</label>
        <input
          type="text"
          id="expenseName"
          placeholder="Enter expense name"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          onInput={handleInput}
          required
        />
      </div>
      <div>
        <label htmlFor="expenseAmount" className="block text-sm font-bold text-gray-900">Expense Amount</label>
        <input
          type="number"
          id="expenseAmount"
          placeholder="Enter expense amount"
          className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring ${
            amountError ? 'border-red-500' : 'border-gray-300'
          } text-gray-700`}
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          onInput={handleInput}
          required
        />
        {amountError && <div className="text-sm text-red-700">{amountError}</div>}
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-bold text-gray-900">Category of expense</label>
        <select
          id="category"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700 bg-white"
          value={category}
          onChange={handleCategoryChange}
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="expenseDate" className="block text-sm font-bold text-gray-900">Expense Date</label>
        <input
          type="date"
          id="expenseDate"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-gray-900">Expense Description</label>
        <textarea
          id="description"
          placeholder="Enter expense description"
          className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
          onInput={handleInput}
          required
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700" disabled={!isFormValid}>{buttonLabel}</button>
    </form>
  );
};

export default ExpenseForm;