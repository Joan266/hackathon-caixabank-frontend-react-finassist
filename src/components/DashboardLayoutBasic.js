// src/components/DashboardLayoutBasic.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';
import Analysis from './Analysis';
import Settings from './Settings';
import SupportPage from './SupportPage';
import ProtectedRoute from './ProtectedRoute'; // Import for route protection
import BudgetAlert from './BudgetAlert';
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
  },
  {
    segment: 'transactions',
    title: 'Transactions',
  },
  {
    segment: 'analysis',
    title: 'Analysis',
  },
  {
    segment: 'settings',
    title: 'Settings',
  },
  {
    segment: 'support',
    title: 'Support',
  },
];

export default function DashboardLayoutBasic({ isAuthenticated }) {
  return (
    <AppProvider navigation={NAVIGATION}>
      <DashboardLayout>
        <PageContainer>
        <BudgetAlert /> {/* Show BudgetAlert here */}
          <Routes>
            {/* Protected routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<SupportPage />} />
            </Route>
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
