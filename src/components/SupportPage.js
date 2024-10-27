import React, { useState, useEffect, Profiler, Suspense, useMemo } from 'react';
import { Box, Typography, CircularProgress, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, Button, Alert } from '@mui/material';
import { onRenderCallback } from '../utils/onRenderCallback';

function SupportPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Implement the effect to get user data from the API
    // Instructions:
    // - Use the `useEffect` hook to make the request to the `https://jsonplaceholder.typicode.com/users` URL.
    // - If the response is successful, save the data in the `users` state and change `loading` to false.
    // - If there is an error, it saves the error message in `error` state and changes `loading` to false.

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

    // Filter users by search term
    // Instructions:
    // - Implement logic to filter users by `searchTerm`.
    // - Use the `filter` method to check if the `user.name` contains the `searchTerm`.
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
                {/* Implement the search bar */}
                {/* Instructions:
                    - Uses the `TextField` component of Material UI.
                    - The `label` must be ‘Search by Name’ and must be a fullWidth text field.
                    - The value of the field must be linked to `searchTerm` and must be updated when the user types into the field.
                */}
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 4 }}
                />

                {/* Implement the support contact list */}
                {/* Instructions:
                    - Use the `List` component of Material UI to display contacts.
                    - Within each `ListItem`, use `ListItemAvatar` to display an avatar with the `Avatar` component.
                    - For text, use `ListItemText` with `primary` as the name and email, and `secondary` for the phone and company.
                    - Add a contact button with the `Button` component of Material UI, which uses the `href` property to open the email with `mailto:${user.email}`.
                    - Don't forget to add `sx` to style the list.
                */}
                <Suspense fallback={<CircularProgress />}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <List>
                            {/* Here are the filtered users */}
                            {/* Instructions for each `ListItem`:
                                - Display name and email as primary text.
                                - Show phone and company as secondary text.
                                - Use `Avatar` in `ListItemAvatar` to display the avatar.
                                - Add the contact button with the e-mail address.
                            */}
                            {filteredUsers.map(user => (
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar>{user.name.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${user.name} (${user.email})`}
                                        secondary={`Phone: ${user.phone}, Company: ${user.company.name}`}
                                    />
                                    <Button href={`mailto:${user.email}`} variant="outlined">Contact</Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Suspense>
            </Box>
        </Profiler>
    );
}

export default SupportPage;
