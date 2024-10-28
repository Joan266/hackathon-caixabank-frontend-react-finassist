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
    Grid2, 
} from '@mui/material';
import { useTransactionListModifiers } from '../hooks/useTransactionListModifiers.js';
import Swal from 'sweetalert2';
import SelectFieldComponent from './SelectFieldComponent.js';
import TransactionsTable from './TransactionsTable';

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
        <Box>  
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

            <Grid2 container spacing={2} sx={{ my: 2, flexWrap: 'wrap' }}>
                <Grid2 size={{xs:12,sm:4}}>
                    <SelectFieldComponent
                        label="Category"
                        value={filterCategory}
                        onChange={(e) => {
                            setFilterCategory(e.target.value);
                            goToPage(0);
                        }}
                        placeholder="All"
                        options={allCategories}
                    />
                </Grid2>
                <Grid2  size={{xs:12,sm:4}}>
                    <SelectFieldComponent
                        label="Type"
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            goToPage(0);
                        }}
                        placeholder="All"
                        options={["Income", "Expense"]}
                    />
                </Grid2>
                <Grid2  size={{xs:12,sm:4}}>
                    <SelectFieldComponent
                        label="Sort By"
                        value={sortConfig.property}
                        onChange={(e) => {
                            setSortConfig({ ...sortConfig, property: e.target.value });
                            goToPage(0);
                        }}
                        placeholder="None"
                        options={["Amount", "Date"]}
                    />
                </Grid2>
            </Grid2>

            <Box sx={{ overflowX: 'auto' }}>
                <TransactionsTable transactions={dataCurrentPage} columns={columns} />

                <TablePagination
                    component="div"
                    count={dataLength}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
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
