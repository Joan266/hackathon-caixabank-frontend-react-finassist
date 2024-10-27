
export default function calculateTransactionsTotalData(transactions) {
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'Income')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const totalExpense = transactions
    .filter(transaction => transaction.type === 'Expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpense;
  return {
    totalExpense,
    totalIncome,
    totalBalance,
  };
};