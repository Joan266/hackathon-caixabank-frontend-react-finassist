import React from 'react';
import { TextField } from '@mui/material';

const DateFieldComponent = ({ label, value, onChange, required = false, ...props }) => (
    <TextField
        label={label}
        type="date"
        value={value}
        onChange={onChange}
        fullWidth
        margin="normal"
        required={required}
        slotProps={{ inputLabel: { shrink: true, } }}
        {...props}
    />
);

export default DateFieldComponent;
