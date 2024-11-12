import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import TransactionRow from './TransactionRow';

function TransactionsTable({ transactions, columns }) {
    return (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={"h-"+index}>
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transaction => (
                        <TransactionRow
                            key={transaction.id}
                            transaction={transaction}
                            columns={columns}
                        />
                    ))}
                </TableBody>
            </Table>
            {transactions.length === 0 && (
                <Typography variant="body2" align="center" sx={{ padding: 2 }}>
                    No recent transactions available.
                </Typography>
            )}
        </TableContainer>
    );
}

export default TransactionsTable;
