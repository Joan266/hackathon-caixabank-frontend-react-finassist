import React, { useState, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore, addTransaction, deleteTransaction } from '../stores/transactionStore';
import TransactionForm from './TransactionForm';
import { allCategories } from '../constants/categories'; 

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
    Alert
} from '@mui/material';
import { useTransactionListModifiers } from '../hooks/useTransactionListModifiers.js'; 

function TransactionList() {
    const transactions = useStore(transactionsStore);
    
    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortConfig, setSortConfig] = useState({
        type: 'number',
        property: "",
        direction: -1 // Sort direction from top to bottom
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openForm, setOpenForm] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    
    // Utilize the useTableModifiers to manage transactions
    const { dataCurrentPage, totalPages, goToPage } = useTransactionListModifiers(
        transactions,
        rowsPerPage,
        filterType,
        filterCategory,
        sortConfig,
    );

    // Implement delete functionality
    const handleDelete = useCallback((id) => {
        deleteTransaction(id); // Call the store action to delete the transaction
    }, []);

    // Implement edit functionality
    const handleEdit = useCallback((transaction) => {
        setEditingTransaction(transaction);
        setOpenForm(true);
    }, []);

    const handleAddTransaction = () => {
        setEditingTransaction(null); // Clear editing state
        setOpenForm(true); // Open the form to add a new transaction
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingTransaction(null);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

            {/* Add transaction */}
            <Button variant="contained" color="primary" onClick={handleAddTransaction}>
                Add Transaction
            </Button>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {allCategories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-type-label">Type</InputLabel>
                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-field-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-field-label"
                        value={sortConfig.property}
                        onChange={(e) => setSortConfig({...sortConfig, property:e.target.value})}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Table of transactions */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataCurrentPage.map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleEdit(transaction)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(transaction.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination controls */}
            <Box sx={{ mt: 2 }}>
                <Button disabled={page === 0} onClick={() => goToPage(page - 1)}>Previous</Button>
                <Button disabled={page === totalPages - 1} onClick={() => goToPage(page + 1)}>Next</Button>
            </Box>

            {/* Transaction Form Modal */}
            {openForm && (
                <TransactionForm 
                    transaction={editingTransaction}
                    onClose={handleCloseForm}
                />
            )}
        </Box>
    );
}

export default TransactionList;
