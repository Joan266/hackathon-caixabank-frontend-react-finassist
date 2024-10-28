import React, { useState, useEffect } from 'react';
import { addTransaction } from '../stores/transactionStore';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Grid2
} from '@mui/material';
import Swal from 'sweetalert2';
import { expenseCategories, incomeCategories } from '../constants/categories';
import { expenseCategoryKeywords, incomeCategoriesKeywords } from '../constants/categoryKeywords';
import SelectFieldComponent from './SelectFieldComponent';
import DateFieldComponent from './DateFieldComponent';
import TextFieldComponent from './TextFieldComponent';
function TransactionForm({ transactionToEdit, onClose }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(new Date(transactionToEdit.date).toISOString().split('T')[0]);
        } else {
            setCategory('Other Expenses');
        }
    }, [transactionToEdit]);

    const getCategoriesForType = () => {
        return type === 'Income' ? incomeCategories : expenseCategories;
    };

    const findCategoryFromDescription = (desc, type) => {
        const lowerCaseDesc = desc.toLowerCase();
        
        const categoryKeywords = type === "Expense" ? expenseCategoryKeywords : incomeCategoriesKeywords;
    
        for (const [cat, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => lowerCaseDesc.includes(keyword))) {
                return cat;
            }
        }
    
        return type === "Expense" ? 'Other Expenses' : 'Other Income';
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount || !type || !category || !date) {
            Swal.fire({
                title: 'Error!',
                text: "Please fill in all fields.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (!getCategoriesForType(type).includes(category)) {
            Swal.fire({
                title: 'Error!',
                text: "Selected category does not match the transaction type.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const transaction = {
            id: transactionToEdit ? transactionToEdit.id : Date.now(),
            description,
            amount: parseFloat(amount),
            type,
            category,
            date,
        };

        try {
            addTransaction(transaction);
            Swal.fire({
                title: 'Success!',
                text: `Transaction ${transactionToEdit ? "updated" : "added"} successfully:\n\nDescription: ${transaction.description}\nAmount: €${transaction.amount.toFixed(2)}\nType: ${transaction.type}\nCategory: ${transaction.category}\nDate: ${new Date(transaction.date).toLocaleDateString()}`,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            onClose();

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: "An error occurred while processing your request.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid2 container spacing={2}>
                        <Grid2  size={{xs:12}}>
                            <TextFieldComponent
                                label="Description"
                                value={description}
                                onChange={(e) => {
                                    const desc = e.target.value;
                                    setDescription(desc);
                                    if (!transactionToEdit) setCategory(findCategoryFromDescription(desc, type));
                                }}
                                required
                            />
                        </Grid2>
                        <Grid2 size={{xs:12,sm:6}}>
                            <TextFieldComponent
                                label="Amount (€)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                slotProps={{ input: { min: 0, step: '0.01' } }}  // Updated to use slotProps
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <SelectFieldComponent
                                label="Type"
                                value={type}
                                onChange={(e) => {
                                    const selectedType = e.target.value;
                                    setType(selectedType);
                                    setCategory(findCategoryFromDescription(description, selectedType));
                                }}
                                options={["Income", "Expense"]}
                                required
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <SelectFieldComponent
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                options={getCategoriesForType()}
                                required
                            />
                        </Grid2>
                        <Grid2 item xs={12} sm={6}>
                            <DateFieldComponent
                                label="Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {transactionToEdit ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default TransactionForm;