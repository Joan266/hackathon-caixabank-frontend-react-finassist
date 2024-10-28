import React from 'react';
import { Paper, Typography } from '@mui/material';

function Statistics({
    title = "Key Statistics",
    averageExpense = 0,
    maxCategory = null,
    maxCategoryAmount = 0
}) {
    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <Typography>
                Average Daily Expense: {averageExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category: {maxCategory
                    ? `${maxCategory} (${maxCategoryAmount.toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
}

export default Statistics;
