"use client";

import React from 'react';
import TransactionList from '../components/TransactionHistoryTable';
import DefaultLayout from '../components/Layouts/DefaultLayout';

const TransactionsPage: React.FC = () => {
    return (
        <DefaultLayout>
            <TransactionList />
        </DefaultLayout>
    );
};

export default TransactionsPage;