import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ExportButton = React.memo(function ExportButton({ data, filename = 'data.csv', headers, label = 'Export CSV' }) {
    const handleExport = useCallback(() => {
        const csv = convertArrayOfObjectsToCSV(data, headers);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link);
    }, [data, filename, headers]);

    const convertArrayOfObjectsToCSV = (data, headers) => {
        const headerString = headers.join(',') + '\n';
        const rows = data.map(item => {
            return headers.map(header => {
                const value = item[header];
                return value !== undefined ? value.toString().replace(/,/g, ' ') : ''; 
            }).join(','); 
        }).join('\n');
        return headerString + rows; 
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label}
        </Button>
    );
});

ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
};

export default ExportButton;
