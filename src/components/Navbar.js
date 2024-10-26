import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Typography, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { authStore } from '../stores/authStore'; // Import auth store for authentication state
import { useStore } from '@nanostores/react';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated, user } = useStore(authStore);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    {/* Navigation links */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton>
                            <Badge color="error" variant="dot">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        {/* User avatar */}
                        {isAuthenticated && user && (
                            <Avatar
                                alt={user.email}
                                sx={{ marginLeft: 2 }}
                                title={user.email}
                            >{user.email.charAt(0)}</Avatar>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, padding: 2 }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >
                    {/* Drawer navigation links */}
                    {isAuthenticated && user ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Welcome, {user.email || 'User'}
                            </Typography>
                            <Link to="/dashboard">
                                <Button fullWidth variant="text">Dashboard</Button>
                            </Link>
                            <Link to="/transactions">
                                <Button fullWidth variant="text">Transactions</Button>
                            </Link>
                            <Link to="/settings">
                                <Button fullWidth variant="text">Settings</Button>
                            </Link>
                            <Link to="/logout">
                                <Button fullWidth variant="text">Logout</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button fullWidth variant="text">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button fullWidth variant="text">Register</Button>
                            </Link>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;

