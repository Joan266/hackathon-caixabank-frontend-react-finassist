import React from 'react';
import { TableRow, TableCell } from '@mui/material';

function TransactionRow({ transaction, columns }) {
    return (
        <TableRow key={transaction.id}>
        {columns.map((column, index) => (
            <TableCell key={index}>
                {column.accessor ? column.accessor(transaction) : transaction[column.key]}
            </TableCell>
        ))}
    </TableRow>
    );
}

export default TransactionRow;
