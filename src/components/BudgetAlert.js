// src/components/BudgetAlert.js
import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { budgetAlertStore, updateBudgetAlert, resetBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas

const BudgetAlert = () => {
    const { totalBudgetLimit } = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);
    const { isVisible, message } = useStore(budgetAlertStore);

    // Instructions:
    // - Calculate the total expenses from the transactions.
    const totalExpense = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Determine if the budget has been exceeded
    const budgetExceeded = totalExpense > totalBudgetLimit; // Replace with a comparison of totalExpense and userSettings.totalBudgetLimit

    // Use the useEffect hook to update the budgetAlertStore when the budget is exceeded
    useEffect(() => {
        // Instructions:
        // - If the budget has been exceeded, set the `isVisible` property in the `budgetAlertStore` to true and provide a warning message.
        // - If the budget has not been exceeded, set `isVisible` to false and clear the message.
        if (budgetExceeded) {
            updateBudgetAlert("Budget exceeded");
        } else {
            resetBudgetAlert();
        }
    }, [budgetExceeded]);

    return (
        // Conditional rendering of the alert
        // Instructions:
        // - If the budget is exceeded, return an `Alert` component with the appropriate message and severity.
        <>
            {isVisible && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
        </>
    );
};

export default BudgetAlert;
