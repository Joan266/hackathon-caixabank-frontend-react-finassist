import React, { Profiler } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid2, Paper } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';

const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function Dashboard() {
    const transactions = useStore(transactionsStore);

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Dashboard
                </Typography>

                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <ExportButton data={transactions} filename="transactions.csv" headers={['id', 'description', 'amount', 'type', 'category', 'date']} label="Export Transactions" />
                    <DownloadProfilerData />
                </Box>

                <Grid2 container spacing={4} sx={{ mt: 4 }}>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Income
                            </Typography>
                            <Typography variant="h5" data-testid="total-income">
                                {totalIncome.toFixed(2)} €
                            </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" data-testid="total-expenses">
                                {totalExpense.toFixed(2)} €
                            </Typography>
                        </Paper>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Balance
                            </Typography>
                            <Typography variant="h5" data-testid="balance">
                                {balance.toFixed(2)} €
                            </Typography>
                            {balance < 0 && (
                                <Typography color="error" variant="body2">
                                    Warning: Your balance is negative!
                                </Typography>
                            )}
                        </Paper>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={4} sx={{ mt: 4 }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <React.Suspense fallback={<Typography>Loading...</Typography>}>
                            <AnalysisGraph />
                        </React.Suspense>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <React.Suspense fallback={<Typography>Loading...</Typography>}>
                            <BalanceOverTime />
                        </React.Suspense>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={4} sx={{ mt: 4 }}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <React.Suspense fallback={<Typography>Loading...</Typography>}>
                            <Statistics />
                        </React.Suspense>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <React.Suspense fallback={<Typography>Loading...</Typography>}>
                            <Recommendations />
                        </React.Suspense>
                    </Grid2>
                </Grid2>

                <Grid2 container spacing={4} sx={{ mt: 4 }}>
                    <Grid2 size={{ xs: 12 }}>
                        <React.Suspense fallback={<Typography>Loading...</Typography>}>
                            <RecentTransactions />
                        </React.Suspense>
                    </Grid2>
                </Grid2>
            </Box>
        </Profiler>
    );
}

export default Dashboard;
