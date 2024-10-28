import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import TransactionsTable from './TransactionsTable';
import { Box, Typography } from '@mui/material';

function RecentTransactions() {
    const transactions = useStore(transactionsStore);

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentTransactions = sortedTransactions.slice(0, 5);

    const columns = [
        { header: 'Description', key: 'description' },
        { header: 'Amount (€)', key: 'amount', accessor: (transaction) => transaction.amount.toFixed(2) },
        { header: 'Type', key: 'type' },
        { header: 'Category', key: 'category' },
        { header: 'Date', key: 'date', accessor: (transaction) => new Date(transaction.date).toLocaleDateString() },
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Recent Transactions
            </Typography>
            <TransactionsTable transactions={recentTransactions} columns={columns} />
        </Box>
    );
}

export default RecentTransactions;
