import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from 'recharts';
import { Paper, Typography } from '@mui/material';

function ReusableLineChart({
    data = [],
    xKey = 'date',
    yKey = 'Balance',
    title = 'Balance Over Time',
    lineColor = '#8884d8',
    height = 400
}) {
    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            {title && <Typography variant="h6">{title}</Typography>}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={yKey} stroke={lineColor} />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default ReusableLineChart;

