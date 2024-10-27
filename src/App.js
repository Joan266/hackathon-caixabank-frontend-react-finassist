import React, { useState, useEffect, useMemo } from 'react';
import { lightTheme, darkTheme } from './theme';
import { useStore } from '@nanostores/react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import SupportPage from './components/SupportPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Logout from './components/Logout';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import BudgetAlert from './components/BudgetAlert';
import { authStore } from './stores/authStore';
import Box from '@mui/material/Box';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { NAVIGATION, AUTHNAVIGATION } from './constants/navigation';
import CaixaBankIcon from './assets/caixabank-icon-blue.png';

function App() {
  const { isAuthenticated, user } = useStore(authStore);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [pathname, setPathname] = useState('/dashboard');

  const router = useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => {
      setPathname(String(path));
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  }), [pathname]);

  useEffect(() => {
    if (!isAuthenticated) {
      setPathname("/login");
    } else {
      setPathname("/dashboard");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const theme = useMemo(() => createTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const branding = {
    logo: <img src={CaixaBankIcon} alt="Caixa Bank" />,
    title: 'CaixaBank',
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider
        navigation={isAuthenticated ? NAVIGATION : AUTHNAVIGATION}
        session={user ? { user } : null}
        branding={branding}
        router={router}
      >
        <Router>
          <DashboardLayout
            slots={{ toolbarActions: () => <AvatarDisplay /> }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <BudgetAlert />
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
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
              <Footer />
            </Box>
          </DashboardLayout>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
