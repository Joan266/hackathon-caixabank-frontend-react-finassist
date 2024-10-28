import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const SelectFieldComponent = ({ label, value, onChange, options, required = false, ...props }) => (
    <FormControl fullWidth margin="normal" required={required}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange} label={label} {...props}>
            {options.map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default SelectFieldComponent;
