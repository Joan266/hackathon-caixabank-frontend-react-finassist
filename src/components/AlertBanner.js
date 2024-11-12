import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { userSettingsStore } from '../stores/userSettingsStore';
import { Alert, Collapse } from '@mui/material';
import calculateTransactionsTotalData from '../utils/calculateTransactionsTotalData';
import { expenseCategories } from '../constants/categories';

function AlertBanner() {
    const transactions = useStore(transactionsStore);
    const { totalBudgetLimit, categoryLimits, alertsEnabled } = useStore(userSettingsStore);

    const { totalExpense } = calculateTransactionsTotalData(transactions);

    if (!alertsEnabled) return null;

    const overTotalBudget = totalExpense > totalBudgetLimit;

    const exceededCategories = expenseCategories.map(category => {
        const categoryTransactions = transactions.filter(transaction => transaction.category === category);
        const amount = categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        const categoryExceeded = amount > categoryLimits[category];

        return { label: category, amount, limit: categoryLimits[category], categoryExceeded };
    }).filter(cat => cat.categoryExceeded);

    return (
        <div>
            <Collapse in={overTotalBudget}>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    You have exceeded your total budget limit of {totalBudgetLimit} €! Your total expenses are {totalExpense.toFixed(2)} €.
                </Alert>
            </Collapse>

            {exceededCategories.map(({ label, amount, limit }) => (
                <Collapse in={amount>limit && limit>0} key={label}>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        You have exceeded your budget limit for {label} ({limit} €)! Total spent: {amount.toFixed(2)} €.
                    </Alert>
                </Collapse>
            ))}
        </div>
    );
}

export default AlertBanner;
