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
import TransactionRow from './TransactionRow';
function TransactionsTable({ transactions, columns }) {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column.header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(transaction => (
                      <TransactionRow transaction={transaction} columns={columns}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TransactionsTable;
