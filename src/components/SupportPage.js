import React, { useState, useEffect, Profiler, Suspense, useMemo } from 'react';
import { Box, Typography, CircularProgress, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, Button, Alert } from '@mui/material';
import { onRenderCallback } from '../utils/onRenderCallback';
import ContactSupport from './ContactSupport';
function SupportPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    const errorResponse = await response.json();
                    const errorMessage = errorResponse?.message || `HTTP error! status: ${response.status}`;
                    setError(errorMessage);
                } else {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [users, searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Profiler id="SupportPage" onRender={onRenderCallback}>
            <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textAlign: 'left',
                    }}
                >
                    Support Contacts
                </Typography>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 4 }}
                />

                <Suspense fallback={<CircularProgress />}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <List>
                            {filteredUsers.map(user => (
                                <ContactSupport
                                    key={user.id}
                                    user={user}
                                />
                            ))}
                        </List>
                    </Paper>
                </Suspense>
            </Box>
        </Profiler>
    );
}

export default SupportPage;
