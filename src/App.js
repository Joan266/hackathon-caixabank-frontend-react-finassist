// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BudgetAlert from './components/BudgetAlert'; 
import { authStore } from './stores/authStore'; 
import { useStore } from '@nanostores/react'; 
import DashboardLayoutBasic from './components/DashboardLayoutBasic'; 

function App() {
  const auth = useStore(authStore); // Get authentication status from auth store

  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Use effect to apply theme on load
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Apply the correct baseline for the theme */}
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Ensures footer is at the bottom
          }}
        >
            <DashboardLayoutBasic isAuthenticated={auth.isAuthenticated} />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
