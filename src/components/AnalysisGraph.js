import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { allCategories } from '../constants/categories';
function AnalysisGraph() {
    const transactions = useStore(transactionsStore);

    const data = allCategories.map(category => {
        const categoryTransactions = transactions.filter(transaction => transaction.category === category);

        const income = categoryTransactions
            .filter(transaction => transaction.type === 'Income')
            .reduce((total, transaction) => total + transaction.amount, 0);

        const expense = categoryTransactions
            .filter(transaction => transaction.type === 'Expense')
            .reduce((total, transaction) => total + transaction.amount, 0);

        return { category, Income: income, Expense: expense };
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default AnalysisGraph;
