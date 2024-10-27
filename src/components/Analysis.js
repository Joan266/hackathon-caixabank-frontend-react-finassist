import React, { useState, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    Box,
    Typography,
    Grid2,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ExportButton from './ExportButton';
import { userSettingsStore } from '../stores/userSettingsStore';

function Analysis() {
    const transactions = useStore(transactionsStore);
    const { totalBudgetLimit } = useStore(userSettingsStore);
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [reportType, setReportType] = useState('trend');

    const trendData = useMemo(() => {
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

        return Object.values(data);
    }, [transactions, timeFrame]);

    const budgetData = useMemo(() => {
        const data = trendData.map(item => {
            const actualExpense = item.expense;
            const budget = totalBudgetLimit; 

            return {
                key: item.key,
                budget,
                actual: actualExpense,
            };
        });
        return data;
    }, [trendData, totalBudgetLimit]);

    const exportData = reportType === 'trend' ? trendData : budgetData;
    const exportHeaders = reportType === 'trend'
        ? ['Date', 'Income', 'Expense']
        : ['Date', 'Budget', 'Actual'];

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
                    <FormControl fullWidth>
                        <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
                        <Select
                            labelId="timeframe-select-label"
                            id="timeframe-select"
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4, sm: 6 }}>
                    <FormControl fullWidth>
                        <InputLabel id="report-type-select-label">Report Type</InputLabel>
                        <Select
                            labelId="report-type-select-label"
                            id="report-type-select"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <MenuItem value="trend">Trend Analysis</MenuItem>
                            <MenuItem value="budget">Budget vs. Actual</MenuItem>
                        </Select>
                    </FormControl>
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
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Income and Expenses Trend
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={trendData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#28B463" name="Income" />
                                    <Line type="monotone" dataKey="expense" stroke="#E74C3C" name="Expenses" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid2>
                </Grid2>
            )}

            {reportType === 'budget' && (
                <Grid2 container spacing={4}>
                    <Grid2 size={{ xs: 12, md: 12 }}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Budget vs. Actual Expenses
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={budgetData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#4CAF50" name="Budget" />
                                    <Bar dataKey="actual" fill="#FF9800" name="Actual" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
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
