import React from 'react';
import {
  Typography,
  Grid2,
} from '@mui/material';
import TransactionCard from './TransactionCard';
function TransactionsCards({ transactions, columns }) {
  return (
    <Grid2 container spacing={2}>
      {transactions.length === 0 ? (
        <Typography variant="body2" align="center" sx={{ padding: 2, width: '100%' }}>
          No recent transactions available.
        </Typography>
      ) : (
        transactions.map((transaction) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={transaction.id}>
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              columns={columns} />
          </Grid2>
        ))
      )}
    </Grid2>
  );
}

export default TransactionsCards;
