// src/components/BudgetAlert.js
import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { budgetAlertStore, updateBudgetAlert, resetBudgetAlert } from '../stores/budgetAlertStore'; 

const BudgetAlert = () => {
    const { totalBudgetLimit } = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);
    const { isVisible, message } = useStore(budgetAlertStore);

    const totalExpense = transactions
    .filter(transaction => transaction.type === 'Expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

   const budgetExceeded = totalExpense > totalBudgetLimit; 

    useEffect(() => {
       if (budgetExceeded) {
            updateBudgetAlert("Budget exceeded");
        } else {
            resetBudgetAlert();
        }
    }, [budgetExceeded]);

    return (
         <>
            {isVisible && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {message}
                </Alert>
            )}
        </>
    );
};

export default BudgetAlert;
