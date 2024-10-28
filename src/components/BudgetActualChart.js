import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Paper, Typography } from '@mui/material';

const BudgetActualChart = ({ data }) => {
    return (
        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
                Budget vs. Actual Expenses
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="key" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="#4CAF50" name="Budget" />
                    <Bar dataKey="actual" fill="#FF9800" name="Actual" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default BudgetActualChart;
