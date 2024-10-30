import React from 'react';
import { Typography, Card, Box, CardContent } from '@mui/material';

function TransactionCard({ transaction, columns }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {columns.map((column, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>{column.header}:</strong> {column.accessor ? column.accessor(transaction) : transaction[column.key]}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default TransactionCard;
