import React, { useState, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    Box,
    Typography,
    Grid2,
    Paper,
} from '@mui/material';
import ExportButton from './ExportButton';
import { userSettingsStore } from '../stores/userSettingsStore';
import IncomeExpenseTrendChart from './IncomeExpenseTrendChart';
import BudgetActualChart from './BudgetActualChart';
import SelectFieldComponent from './SelectFieldComponent';

function Analysis() {
    const transactions = useStore(transactionsStore);
    const { totalBudgetLimit } = useStore(userSettingsStore);
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [reportType, setReportType] = useState('trend');
    const { trendData, budgetData } = useMemo(() => {
        const data = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            let key;

            switch (timeFrame) {
                case 'daily':
                    key = date.toLocaleDateString();
                    break;
                case 'weekly':
                    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
                    key = `${weekStart.getDate()}/${weekStart.getMonth() + 1}/${weekStart.getFullYear()}`;
                    break;
                case 'monthly':
                    key = `${date.getMonth() + 1}/${date.getFullYear()}`;
                    break;
                case 'yearly':
                    key = `${date.getFullYear()}`;
                    break;
                default:
                    key = `${date.getMonth() + 1}/${date.getFullYear()}`;
            }

            if (!acc[key]) {
                acc[key] = { key, income: 0, expense: 0 };
            }

            if (transaction.type === 'Income') {
                acc[key].income += transaction.amount;
            } else {
                acc[key].expense += transaction.amount;
            }

            return acc;
        }, {});
        const trendData = Object.values(data);
        const budgetData = trendData.map(item => {
            const actualExpense = item.expense;
            const budget = totalBudgetLimit;

            return {
                key: item.key,
                budget,
                actual: actualExpense,
            };
        });
        
        return { trendData, budgetData };
    }, [totalBudgetLimit, timeFrame, transactions]);

    const exportData = reportType === 'trend' ? trendData : budgetData;
    const exportHeaders = reportType === 'trend'
        ? ['key', 'income', 'expense']
        : ['key', 'budget', 'actual'];

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
                Advance Analysis
            </Typography>

            {transactions.length === 0 && (
                <Typography variant="h6" color="text.secondary">
                    No transactions available.
                </Typography>
            )}

            <Grid2 container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Grid2 size={{ xs: 12, md: 4, sm: 6 }}>
                    <SelectFieldComponent
                        label="Time Frame"
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        options={[{text:"Daily", value:"daily"}, {text:"Weekly", value:"weekly"}, {text:"Monthly", value:"monthly"}, {text:"Yearly", value:"yearly"}]}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4, sm: 6 }}>
                    <SelectFieldComponent
                        label="Report Type"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        options={[{text:"Trend Analysis", value:"trend"}, {text:"Budget vs. Actual",value:"budget"}]}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4, sm: 6 }}>
                    <ExportButton
                        data={exportData}
                        filename={`${reportType}_report.csv`}
                        headers={exportHeaders}
                    />
                </Grid2>
            </Grid2>

            {reportType === 'trend' && (
                <Grid2 container spacing={4}>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <IncomeExpenseTrendChart data={trendData} />
                    </Grid2>
                </Grid2>
            )}

            {reportType === 'budget' && (
                <Grid2 container spacing={4}>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <BudgetActualChart data={budgetData} />
                    </Grid2>
                </Grid2>
            )}

            <Grid2 container spacing={4} sx={{ mt: 4 }}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Savings Goals
                        </Typography>
                        <Typography>No savings goals set.</Typography>
                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Net Worth Over Time
                        </Typography>
                        <Typography>No net worth data available.</Typography>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Analysis;
