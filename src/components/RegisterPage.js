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

 
        if (!email || !password || !confirmPassword) {
            setError("Missing credentials.")
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords dont match.")
            return;
        }
        if (email === user?.email) {
            setError("Email already in use.")
            return;
        }
        login({ email, password,image: 'https://avatars.githubusercontent.com/u/19550456' });
        setSuccess(true);
        setError(null);
        setTimeout(() => {
            navigate('/dashboard');
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
