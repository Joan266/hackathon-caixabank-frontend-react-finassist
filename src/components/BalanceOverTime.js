import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import ReusableLineChart from './ReusableLineChart';
import dayjs from 'dayjs';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore);

    const data = transactions
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .reduce((acc, transaction) => {
            const date = dayjs(transaction.date).format('YYYY-MM-DD');
            const amount = transaction.type === 'Income' ? transaction.amount : -transaction.amount;
            
            const lastBalance = acc.length > 0 ? acc[acc.length - 1].Balance : 0;
            const cumulativeBalance = lastBalance + amount;
            
            const formattedBalance = Number(cumulativeBalance.toFixed(2));

            acc.push({ date, Balance: formattedBalance });
            return acc;
        }, []);

    return (
        <ReusableLineChart
            data={data}
            xKey="date"
            yKey="Balance"
            title="Cumulative Balance Over Time"
            lineColor="#8884d8"
            height={400}
        />
    );
}

export default BalanceOverTime;
