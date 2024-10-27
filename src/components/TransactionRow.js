import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function TransactionRow({ transaction, onEdit, onDelete }) {
    return (
        <TableRow key={transaction.id}>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>{transaction.amount}</TableCell>
        <TableCell>{transaction.type}</TableCell>
        <TableCell>{transaction.category}</TableCell>
        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
        <TableCell>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => onEdit(transaction)}
                sx={{ marginRight: '0.5em' }}
            >
                Edit
            </Button>
            <Button variant="contained" color="error" onClick={() => onDelete(transaction.id)}>
                Delete
            </Button>
        </TableCell>
    </TableRow>
    );
}

export default TransactionRow;
