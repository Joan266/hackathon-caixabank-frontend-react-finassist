import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { allCategories } from '../constants/categories';
import calculateTransactionsTotalData from '../utils/calculateTransactionsTotalData';
function AnalysisGraph() {
    const transactions = useStore(transactionsStore);
    const { totalExpense, totalIncome } = calculateTransactionsTotalData(transactions);

    const data1 = [
        { label: 'Expenses', value: totalExpense },
        { label: 'Income', value: totalIncome },
    ];

    const data2 = allCategories.map(category => {
        const categoryTransactions = transactions.filter(transaction => transaction.category === category);
        const amount = categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        return { label: category, value: amount };
    });
    const COLORS1 = ['#2e96ff', '#02b2af'];
    const COLORS2 = ['#03008d', '#2731c8', '#60009b', '#b800d8', '#2e96ff', '#02b2af'];

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
