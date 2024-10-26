import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore);

    const sortedTransactions = transactions
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = [];
    let cumulativeBalance = 0;

    sortedTransactions.forEach(transaction => {
        cumulativeBalance += transaction.type === 'Income' ? transaction.amount : -transaction.amount;
        const date = dayjs(transaction.date).format('YYYY-MM-DD');
        data.push({ date, Balance: cumulativeBalance });
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default BalanceOverTime;
