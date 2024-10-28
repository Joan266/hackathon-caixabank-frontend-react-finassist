import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, value, onChange, type = "text", required = false,slotProps = {}, ...props }) => (
    <TextField
        label={label}
        value={value}
        onChange={onChange}
        type={type}
        fullWidth
        margin="normal"
        required={required}
        slotProps={slotProps} 
        {...props}
    />
);

export default TextFieldComponent;