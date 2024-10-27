import React, { useState, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore, deleteTransaction } from '../stores/transactionStore';
import TransactionForm from './TransactionForm';
import TransactionRow from './TransactionRow.js';
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
    TablePagination
} from '@mui/material';
import { useTransactionListModifiers } from '../hooks/useTransactionListModifiers.js';
import Swal from 'sweetalert2';

function TransactionList() {
    const transactions = useStore(transactionsStore);

    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortConfig, setSortConfig] = useState({
        type: 'number',
        property: "",
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openForm, setOpenForm] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const {
        dataCurrentPage,
        goToPage,
        dataLength,
        page
    } = useTransactionListModifiers(
        transactions,
        rowsPerPage,
        filterType,
        filterCategory,
        sortConfig
    );

    const handleDelete = useCallback((id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTransaction(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Transaction has been deleted successfully.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        });
    }, []);

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setOpenForm(true);
    };

    const handleAddTransaction = () => {
        setEditingTransaction(null);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingTransaction(null);
    };

    const handleChangePage = (event, newPage) => {
        goToPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        goToPage(0);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'left',
                }}
            >
                Transaction List
            </Typography>

            <Button variant="contained" color="primary" onClick={handleAddTransaction}>
                Add Transaction
            </Button>

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
                        onChange={(e) => setSortConfig({ ...sortConfig, property: e.target.value })}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

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
                            <TransactionRow
                                key={transaction.id} 
                                transaction={transaction} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={dataLength}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {openForm && (
                <TransactionForm
                    transactionToEdit={editingTransaction}
                    onClose={handleCloseForm}
                />
            )}
        </Box>
    );
}

export default TransactionList;
