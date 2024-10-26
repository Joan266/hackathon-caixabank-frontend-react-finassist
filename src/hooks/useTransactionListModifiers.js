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

                if (sortConfig.type === 'date') {
                    return (new Date(valueA) - new Date(valueB)) * sortConfig.direction;
                } else if (sortConfig.type === 'number') {
                    return (Number(valueA) - Number(valueB)) * sortConfig.direction;
                } else if (sortConfig.type === 'string') {
                    return valueA.localeCompare(valueB) * sortConfig.direction;
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

    const goToNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const goToPrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return {
        dataCurrentPage,
        goToPage,
        goToNextPage,
        goToPrevPage,
        totalPages,
        page,
        dataLength,
    };
};
