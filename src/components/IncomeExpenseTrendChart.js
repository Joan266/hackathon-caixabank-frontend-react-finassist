import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Paper, Typography } from '@mui/material';

const IncomeExpenseTrendChart = ({ data }) => {
    return (
        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
                Income and Expenses Trend
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis dataKey="key" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#28B463" name="Income" />
                    <Line type="monotone" dataKey="expense" stroke="#E74C3C" name="Expenses" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default IncomeExpenseTrendChart;
