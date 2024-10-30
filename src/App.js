import React, { useState, useEffect, useMemo } from 'react';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardLayoutBasic from './components/DashboardLayoutBasic';
import {
  ThemeProvider,
  CssBaseline,
  createTheme
} from '@mui/material';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const theme = useMemo(() => createTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <DashboardLayoutBasic />
      </Router>
    </ThemeProvider>
  );
}

export default App;
