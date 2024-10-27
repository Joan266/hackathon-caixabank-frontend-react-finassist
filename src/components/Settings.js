import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { budgetAlertStore, updateBudgetAlert } from '../stores/budgetAlertStore';
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid2,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';
import { transactionsStore } from '../stores/transactionStore';
import Swal from 'sweetalert2';

function Settings() {
    const {
        totalBudgetLimit: storedBudgetLimit,
        categoryLimits,
        alertsEnabled: storedAlertsEnabled,
        budgetExceeded: storedBudgetExceeded,
    } = useStore(userSettingsStore);
    const store = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const [alertsEnabled, setAlertsEnabled] = useState(storedAlertsEnabled);
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(storedBudgetLimit);
    const [categoryBudgetLimits, setCategoryBudgetLimits] = useState(categoryLimits);

    useEffect(() => { console.log(store) }, [store]);
    const totalExpense = useMemo(() => {
        return transactions
            .filter(transaction => transaction.type === 'Expense')
            .reduce((total, transaction) => total + transaction.amount, 0);
    }, [transactions]);

    const budgetExceeded = useMemo(() => {
        return totalExpense > totalBudgetLimit;
    }, [totalExpense, totalBudgetLimit]);

    const handleSave = async (e) => {
        e.preventDefault();

        const totalCategoryLimit = categoryBudgetLimits.reduce((total, limit) => total + Number(limit), 0);
        if (totalCategoryLimit > totalBudgetLimit) {
            Swal.fire({
                title: 'Error!',
                text: "Total category limits exceed the total budget limit.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            updateBudgetAlert({ totalBudgetLimit, categoryLimits: categoryBudgetLimits, alertsEnabled });
            Swal.fire({
                title: 'Success!',
                text: 'Settings saved successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
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
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    textAlign: 'left',
                }}
            >
                Settings
            </Typography>

            <FormControlLabel
                control={
                    <Switch
                        color="primary"
                        checked={alertsEnabled}
                        onChange={(e) => setAlertsEnabled(e.target.checked)}
                    />
                }
                label="Enable Alerts"
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    value={totalBudgetLimit}
                    onChange={(e) => setTotalBudgetLimit(e.target.value)}
                    fullWidth
                    margin="normal"
                    slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                    sx={{ mt: 1 }}
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                <Grid2 container spacing={2} sx={{ mt: 1 }}>
                    {Object.entries(categoryBudgetLimits).map(([category, limit]) => (
                        <Grid2 key={category} size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                label={category}
                                type="number"
                                value={limit}
                                onChange={(e) => {
                                    const newLimits = { ...categoryBudgetLimits, [category]: Number(e.target.value) }; 
                                    setCategoryBudgetLimits(newLimits);
                                }}
                                fullWidth
                                margin="normal"
                                slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
