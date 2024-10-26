import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { login, authStore } from '../stores/authStore';
import { useStore } from '@nanostores/react';
function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { user } = useStore(authStore);

    const handleRegister = (e) => {
        e.preventDefault();

        // Instructions:

        // Validate that all fields (email, password, confirmPassword) are filled.
        // - If any field is empty, display an error message.
        if (!email || !password || !confirmPassword) {
            // - If either is empty, set an appropriate error message.
            setError("Missing credentials.")
            return;
        }

        // Check if the passwords match.
        // - If the passwords do not match, set an appropriate error message.
        if (password !== confirmPassword) {
            // - If either is empty, set an appropriate error message.
            setError("Passwords dont match.")
            return;
        }
        // Check if the email is already registered in localStorage.
        // - Retrieve the existing user from localStorage and verify if the entered email already exists.
        // - If the email exists, set an error message.
        if (email === user?.email) {
            // - If either is empty, set an appropriate error message.
            setError("Email already in use.")
            return;
        }
        // Save the new user's data to localStorage.
        // - If validation passes, store the new user's email and password in localStorage.
        login({ email, password });
        // Automatically log the user in after successful registration.
        // - Call the `login` function to set the authenticated user in the store.
        // Redirect the user to the dashboard.
        // - After successful registration and login, redirect the user to the home/dashboard page.
        setSuccess(true);
        setError(null);
        setTimeout(() => {
            navigate('/home/dashboard');
        }, 2000);
    };
    useEffect(() => { console.log(user) }, [user])
    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    name="email"
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    name="password"
                    autoComplete='new-password'
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    autoComplete='new-password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Account created successfully! Redirecting to login...
                </Alert>
            )}
        </Box>
    );
}

export default RegisterPage;
