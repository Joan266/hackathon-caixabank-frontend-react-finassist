import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import calculateTransactionsTotalData  from '../utils/calculateTransactionsTotalData';

function Statistics() {
    const transactions = useStore(transactionsStore);
    const { totalExpense } = calculateTransactionsTotalData(transactions);
    const expenses = transactions.filter(transaction => transaction.type === 'Expense');

    const uniqueDates = [...new Set(expenses.map(transaction => dayjs(transaction.date).format('YYYY-MM-DD')))];
    const averageDailyExpense = uniqueDates.length > 0 ? (totalExpense / uniqueDates.length) : 0;

    const categoryExpenses = expenses.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
    }, {});

    let maxCategory = null;
    if (Object.keys(categoryExpenses).length > 0) {
        maxCategory = Object.keys(categoryExpenses).reduce((a, b) =>
            categoryExpenses[a] > categoryExpenses[b] ? a : b
        );
    }

    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Key Statistics</Typography>
            <Typography>
                Average Daily Expense: {averageDailyExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category: {maxCategory
                    ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
}

export default Statistics;
