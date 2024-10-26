import { useState, useMemo } from 'react';

export const useTransactionListModifiers = (
    transactions,
    rowsPerPage,
    activeType,
    activeCategory,
    sortConfig,
) => {
    const [page, setPage] = useState(0);

    const { dataCurrentPage, totalPages, dataLength } = useMemo(() => {
        if (!transactions) return { dataCurrentPage: [], totalPages: 0, dataLength: 0 };
        // Sorting logic
        const sortedData = sortConfig?.property
            ? [...transactions].sort((a, b) => {
                const valueA = a[sortConfig.property];
                const valueB = b[sortConfig.property];

                if (sortConfig.property === 'date') {
                    // Sort dates in descending order
                    return new Date(valueB) - new Date(valueA);
                } else if (sortConfig.type === 'number') {
                    // Sort numbers in descending order
                    return -(Number(valueA) - Number(valueB)); 
                }
                return 0;
            })
            : transactions;

        // Filtering by type and category
        const filteredData = sortedData.filter(item =>
            (activeType ? item.type === activeType : true) &&
            (activeCategory ? item.category === activeCategory : true)
        );

        const dataLength = filteredData.length;
        const totalPages = Math.ceil(dataLength / rowsPerPage);

        // Pagination logic
        const startIndex = page * rowsPerPage;
        const dataCurrentPage = filteredData.slice(startIndex, startIndex + rowsPerPage);

        return { dataCurrentPage, totalPages, dataLength };
    }, [transactions, sortConfig, activeType, activeCategory, rowsPerPage, page]);

    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };


    return {
        dataCurrentPage,
        goToPage,
        totalPages,
        dataLength,
        page
    };
};
