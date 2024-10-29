import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
const SelectFieldComponent = ({
    label,
    value,
    onChange,
    options,
    required = false,
    placeholder = null,
    ...props
}) => (
    <FormControl fullWidth margin="normal" required={required}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange} label={label} {...props}>
            {placeholder && (
                <MenuItem key={placeholder} value="">
                    {placeholder}
                </MenuItem>
            )}
            {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.text}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default SelectFieldComponent;
