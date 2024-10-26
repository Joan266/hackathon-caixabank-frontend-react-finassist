import { atom } from 'nanostores';
import data from '../data/transactions.json';

const initialTransactions =  data;
// const initialTransactions = JSON.parse(localStorage.getItem('transactions')) || data;

export const transactionsStore = atom(initialTransactions);

export const setTransactions = (transactions) => {
    transactionsStore.set(transactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = [...currentTransactions, transaction];
    setTransactions(updatedTransactions); 
};

export const deleteTransaction = (id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions); 
};
