import React, { useState, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore, deleteTransaction } from '../stores/transactionStore';
import TransactionForm from './TransactionForm';
import { allCategories } from '../constants/categories';
import {
    Box,
    Button,
    Typography,
    TablePagination,
    Paper
} from '@mui/material';
import { useTransactionListModifiers } from '../hooks/useTransactionListModifiers.js';
import Swal from 'sweetalert2';
import SelectFieldComponent from './SelectFieldComponent.js';
import TransactionsTable from './TransactionsTable'; // Importing TransactionsTable

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

    const columns = [
        { header: 'Description', key: 'description' },
        { header: 'Amount (€)', key: 'amount', accessor: (transaction) => transaction.amount.toFixed(2) },
        { header: 'Type', key: 'type' },
        { header: 'Category', key: 'category' },
        { header: 'Date', key: 'date', accessor: (transaction) => new Date(transaction.date).toLocaleDateString() },
        {
            header: 'Actions',
            key: 'actions',
            accessor: (transaction) => (
                <>
                    <Button onClick={() => handleEdit(transaction)} color="primary">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(transaction.id)} color="secondary" sx={{ ml: 1 }}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

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
                <SelectFieldComponent
                    label="Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    options={allCategories}
                />
                <SelectFieldComponent
                    label="Type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)} 
                    options={["Income", "Expense"]}
                />
                <SelectFieldComponent
                    label="Sort By"
                    value={sortConfig.property}
                    onChange={(e) => setSortConfig({ ...sortConfig, property: e.target.value })} 
                    options={["Amount", "Date"]}
                />
            </Box>

            <Paper>
                <TransactionsTable transactions={dataCurrentPage} columns={columns} />
            </Paper>

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
