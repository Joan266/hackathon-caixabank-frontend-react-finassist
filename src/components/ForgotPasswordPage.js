import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === 'user@example.com') {
            await Swal.fire({
                title: 'Success!',
                text: 'A password recovery email has been sent to your email address.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            await Swal.fire({
                title: 'Error!',
                text: "The email address you entered is not found.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setEmail('');
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    Send Reset Link
                </Button>
            </form>
        </Box>
    );
}
