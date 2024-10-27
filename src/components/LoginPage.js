import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, authStore } from '../stores/authStore';
import { useStore } from '@nanostores/react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Stack
} from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);
    const navigate = useNavigate();
    const { user } = useStore(authStore);
    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate that fields are not empty
        // Instructions:
        // - Check if the email and password fields are filled.
        if (!email || !password) {
            // - If either is empty, set an appropriate error message.
            setError("Missing credentials.")
            return;
        }

        // Validate credentials
        // Instructions:
        // - Check if the entered credentials match the default credentials or the stored user credentials.
        // - If valid, call the `login` function and navigate to the homepage.
        // - If invalid, set an error message.
        if (!(email === defaultCredentials.email && password === defaultCredentials.password) && !(email === user?.email && password === user?.password)) {
            setError("Not matching credentials.")
            return;
        }
        login({email,password, 
            image: 'https://avatars.githubusercontent.com/u/19550456'});
        setSuccess(true);
        setError(null);
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const handleShowDefaultCredentials = () => {
        // Show default credentials in case the user requests it
        setEmail(defaultCredentials.email);
        setPassword(defaultCredentials.password);
        setShowCredentials(true);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>

            <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowCredentials(handleShowDefaultCredentials)}
                >Show Credentials
                </Button>
            </Stack>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
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
                    Login
                </Button>
            </form>

            {/* Show error message when applicable */}
            {/* - Use the Alert component to display the error message if one exists. */}
            {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

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
            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Email:</strong> {defaultCredentials.email}<br />
                    <strong>Password:</strong> {defaultCredentials.password}
                </Alert>
            )}
        </Box>
    );
}

export default LoginPage;
