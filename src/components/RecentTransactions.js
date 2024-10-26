import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { transactionsStore } from '../stores/transactionStore';
import { useStore } from '@nanostores/react';

function RecentTransactions() {
    const transactions = useStore(transactionsStore);
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    const recentTransactions = sortedTransactions.slice(0, 5);

    return (
        <div>
            <h3>Recent Transactions</h3>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentTransactions.map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RecentTransactions;
