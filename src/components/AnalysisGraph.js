import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { allCategories } from '../constants/categories';

function AnalysisGraph() {
    const transactions = useStore(transactionsStore);

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const data1 = [
        { label: 'Expenses', value: totalExpense },
        { label: 'Income', value: totalIncome },
    ];

    const data2 = allCategories.map(category => {
        const categoryTransactions = transactions.filter(transaction => transaction.category === category);
        const amount = categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        return { label: category, value: amount };
    });
    const COLORS1 = ['#3D5B99', '#64B5F6']; 
    const COLORS2 = ['#5F7B8A', '#A5D6A7', '#6A1B9A', '#9C27B0', '#4CAF50', '#00796B', '#26C6DA']; 

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data1}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {data1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                    ))}
                </Pie>

                <Pie
                    data={data2}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={120}
                    outerRadius={160}
                    fill="#82ca9d"
                    label
                >
                    {data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                    ))}
                </Pie>

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default AnalysisGraph;
