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
const handleDeleteClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    if(!bookingId)return;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOneThunk(bookingId))
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Booking has been deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/bookings");
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete room. Please try again.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          });
      }
    });
    setShowMenu(false);
  };
