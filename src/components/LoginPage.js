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
    Stack,
    Link
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
        if (!email || !password) {
            setError("Missing credentials.")
            return;
        }

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
        }, 1250);
    };

    const handleShowDefaultCredentials = () => {
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
                    onClick={handleShowDefaultCredentials}
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
            <Alert severity="warning" sx={{ mt: 2 }}>
                "Aviso de No Oficialidad: Este sitio no es oficial. No introduzcas datos personales ni información sensible."
            </Alert>
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
             <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                <Link href="/recoverpassword" style={{ color: '#1976d2' }}>
                    Forgot Password?
                </Link>
            </Typography>
        </Box>
    );
}

export default LoginPage;
