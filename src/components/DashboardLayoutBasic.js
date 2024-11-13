import React, { useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, DashboardLayout } from '@toolpad/core';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';
import Analysis from './Analysis';
import Settings from './Settings';
import SupportPage from './SupportPage';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import RegisterPage from './RegisterPage';
import AlertBanner from '../components/AlertBanner'
import Logout from './Logout';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import { authStore } from '../stores/authStore';
import {
  Avatar,
  IconButton,
  Tooltip,
  Container
} from '@mui/material';
import { NAVIGATION, AUTHNAVIGATION } from '../constants/navigation';
import CaixaBankIcon from '../assets/caixabank-icon-blue.png';

function DashboardLayoutBasic() {
  const { isAuthenticated, user } = useStore(authStore);
  const location = useLocation();
  const navigate = useNavigate();

  const router = useMemo(() => ({
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path) => navigate(path),
  }), [location, navigate]);

  const branding = {
    logo: <img src={CaixaBankIcon} alt="Caixa Bank" />,
    title: 'Hackathon',
  };

  function AvatarDisplay() {
    if (!isAuthenticated || !user) return null;

    return (
      <Tooltip title={user.email}>
        <IconButton>
          <Avatar alt={user.email} src={user.image} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <AppProvider
      navigation={isAuthenticated ? NAVIGATION : AUTHNAVIGATION}
      session={user ? { user } : null}
      branding={branding}
      router={router}
    >
      <DashboardLayout
        slots={{ toolbarActions: () => <AvatarDisplay /> }}
      >
        <Container sx={{ flex: 1, mt: 4, textAlign: "center" }}>
          {isAuthenticated && <AlertBanner />}
          <Routes>
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recoverpassword" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
        <Footer />
      </DashboardLayout>
    </AppProvider>
  );
}


export default DashboardLayoutBasic;