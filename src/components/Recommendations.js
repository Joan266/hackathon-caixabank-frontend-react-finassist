import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

function Recommendations() {
    const transactions = useStore(transactionsStore);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const expenses = transactions.filter(transaction => transaction.type === 'Expense');
    const currentMonth = dayjs().month();
    const lastMonth = dayjs().subtract(1, 'month').month();
    const currentYear = dayjs().year();

    const expenseThisMonth = expenses
        .filter(transaction => 
            dayjs(transaction.date).month() === currentMonth && 
            dayjs(transaction.date).year() === currentYear)
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenseLastMonth = expenses
        .filter(transaction => 
            dayjs(transaction.date).month() === lastMonth && 
            dayjs(transaction.date).year() === currentYear)
        .reduce((total, transaction) => total + transaction.amount, 0);

    let message = '';

    if (expenseLastMonth === 0) {
        message = "You had no expenses last month. Keep recording your transactions to track your spending!";
    } else if (expenseThisMonth > expenseLastMonth) {
        const increase = ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100;
        message = `Your expenses have increased by ${increase.toFixed(2)}%. Consider reviewing your spending habits.`;
    } else if (expenseThisMonth < expenseLastMonth) {
        const decrease = ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100;
        message = `Great job! Your expenses have decreased by ${decrease.toFixed(2)}%. Keep it up!`;
    } else {
        message = "Your expenses have remained the same compared to last month.";
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Recommendations</Typography>
            <Typography>{message}</Typography>
        </Box>
    );
}

export default Recommendations;
