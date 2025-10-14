import React, { useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    TextField,
    Button,
    CircularProgress,
    Typography,
    FormControl,
    FormLabel,
    Box,
    IconButton,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Interfaces (no changes)
interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
}

interface TransactionHistoryData {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}

interface FilterParams {
    from_date?: string;
    to_date?: string;
    filter_type?: 'today' | 'last_week' | 'new_approved' | 'delete_others' | 'all';
    search?: string;
    page: number;
}

const getTransactionHistory = async (params: FilterParams) => {
    const queryParams: any = {
        page: params.page.toString(),
    };

    if (params.from_date) queryParams.from_date = params.from_date;
    if (params.to_date) queryParams.to_date = params.to_date;
    if (params.filter_type && params.filter_type !== 'all') queryParams.filter_type = params.filter_type;
    if (params.search) queryParams.search = params.search;

    const url = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/transaction-history/`;
    const response = await axios.get(url, { params: queryParams });
    return response.data;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString.split(' ')[0];
};

const TransactionHistoryNew: React.FC = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('created_at');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [data, setData] = useState<TransactionHistoryData>({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });

    const [search, setSearch] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    // 1. ADD TEMPORARY DATE STATES FOR INPUT FIELDS
    const [tempFromDate, setTempFromDate] = useState<string>('');
    const [tempToDate, setTempToDate] = useState<string>('');
    // 2. ADD ACTUAL FILTER STATES THAT WILL BE USED IN API CALLS
    const [appliedFromDate, setAppliedFromDate] = useState<string>('');
    const [appliedToDate, setAppliedToDate] = useState<string>('');
    const [filterType, setFilterType] = useState<'today' | 'last_week' | 'new_approved' | 'delete_others' | 'all'>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [goToPageInput, setGoToPageInput] = useState<string>('');



    // Only keep the dependencies that should trigger automatic API calls
    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, order, orderBy, filterType, appliedFromDate, appliedToDate, debouncedSearch]);

    // Debounced search effect (unchanged)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(0);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [search]);

    const buildFilterParams = (): FilterParams => {
        const params: FilterParams = {
            page: page + 1,
        };

        // 4. USE APPLIED DATES INSTEAD OF TEMP DATES
        if (appliedFromDate) params.from_date = appliedFromDate;
        if (appliedToDate) params.to_date = appliedToDate;
        if (filterType && filterType !== 'all') params.filter_type = filterType;
        if (debouncedSearch) params.search = debouncedSearch;

        return params;
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const filterParams = buildFilterParams();
            const response = await getTransactionHistory(filterParams);
            setData(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearch = () => {
        setDebouncedSearch(search);
        setPage(0);
    };

    // 5. UPDATE TEMPORARY DATE STATES (WON'T TRIGGER API CALL)
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'fromDate') {
            setTempFromDate(value);
        } else if (name === 'toDate') {
            setTempToDate(value);
        }
    };

    // 6. ADD SUBMIT BUTTON HANDLER
    const handleSubmit = () => {
        // Apply the temporary dates to the actual filter states
        setAppliedFromDate(tempFromDate);
        setAppliedToDate(tempToDate);
        setPage(0); // Reset to first page
    };

    // 7. ADD CLEAR BUTTON HANDLER
    const handleClear = () => {
        setTempFromDate('');
        setTempToDate('');
        setAppliedFromDate('');
        setAppliedToDate('');
        setSearch('');
        setDebouncedSearch('');
        setFilterType('all');
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const columns: Column[] = [
        { id: 'created_at', label: 'Paid Info Date', minWidth: 180, align: 'center', format: formatDate },
        { id: 'payment_type', label: 'Payment Mode', minWidth: 150 },
        { id: 'status', label: 'T. Status', minWidth: 120 },
        { id: 'order_id', label: 'Order ID', minWidth: 180 },
        { id: 'admin_status', label: 'A. Status', minWidth: 150 },
        { id: 'ProfileId', label: 'Profile ID', minWidth: 120 },
        { id: 'Profile_name', label: 'Name', minWidth: 150 },
        { id: 'Profile_city', label: 'City', minWidth: 120 },
        { id: 'Profile_state', label: 'State', minWidth: 120 },
        { id: 'plan_name', label: 'Mode', minWidth: 120 },
        { id: 'profile_status', label: 'P. Status', minWidth: 120 },
        { id: 'Mobile_no', label: 'Mobile No', minWidth: 140 },
    ];

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getLastWeekDate = () => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return lastWeek.toISOString().split('T')[0];
    };

    const applyQuickFilter = (type: 'today' | 'last_week' | 'new_approved' | 'delete_others' | 'all') => {
        setFilterType(type);

        if (type === 'today') {
            setTempFromDate(getTodayDate());
            setTempToDate(getTodayDate());
            setAppliedFromDate(getTodayDate());
            setAppliedToDate(getTodayDate());
        } else if (type === 'last_week') {
            setTempFromDate(getLastWeekDate());
            setTempToDate(getTodayDate());
            setAppliedFromDate(getLastWeekDate());
            setAppliedToDate(getTodayDate());
        } else {
            setTempFromDate('');
            setTempToDate('');
            setAppliedFromDate('');
            setAppliedToDate('');
        }

        setPage(0);
    };

    const handleDownloadExcel = async () => {
        setIsDownloading(true);

        const params: any = {};
        if (appliedFromDate) params.from_date = appliedFromDate;
        if (appliedToDate) params.to_date = appliedToDate;
        if (filterType && filterType !== 'all') params.filter_type = filterType;
        if (debouncedSearch) params.search = debouncedSearch;

        try {
            const url = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/transaction-export/`;
            const response = await axios.get(url, {
                params,
                responseType: 'blob',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'transaction-history.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.error('Error downloading the file:', error);
        } finally {
            setIsDownloading(false);
        }
    };


    const handleGoToPage = () => {
        const pageNumber = parseInt(goToPageInput, 10);
        if (!isNaN(pageNumber)) {
            const lastPage = Math.ceil(data.count / rowsPerPage) - 1;
            const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
            setPage(newPage);
            setGoToPageInput('');
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };


    // Add this function inside your component
    const getStatusColor = (status: string) => {
        if (!status) return 'inherit';

        const statusLower = status.toLowerCase();

        switch (statusLower) {
            case 'paid':
                return '#2e7d32'; // Green for success
            case 'failed':
                return '#d32f2f'; // Red for failure
            case 'initialized':
                return '#ed6c02'; // Orange for pending/initialized
            default:
                return 'inherit'; // Default color
        }
    };

    const getPStatusColor = (profile_status: string) => {
        if (!profile_status) return 'inherit';

        const statusLower = profile_status.toLowerCase();

        switch (statusLower) {
            case 'approved':
                return '#2e7d32'; // Green for success
            case 'pending':
                return '#ed6c02'; // Orange for pending/initialized
            default:
                return 'inherit'; // Default color
        }
    };

    // Custom pagination component
    const renderCustomPagination = () => {
        const totalPages = Math.ceil(data.count / rowsPerPage);
        const maxVisiblePages = 5;
        let startPage, endPage;

        if (totalPages <= maxVisiblePages) {
            startPage = 0;
            endPage = totalPages - 1;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

            if (page < maxPagesBeforeCurrent) {
                startPage = 0;
                endPage = maxVisiblePages - 1;
            } else if (page + maxPagesAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisiblePages;
                endPage = totalPages - 1;
            } else {
                startPage = page - maxPagesBeforeCurrent;
                endPage = page + maxPagesAfterCurrent;
            }
        }

        const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);


        return (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                    Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.count)} of {data.count} records
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Typography variant="body2">Go to page:</Typography>
                        <TextField
                            size="small"
                            type="number"
                            value={goToPageInput}
                            onChange={(e) => setGoToPageInput(e.target.value)}
                            inputProps={{
                                min: 1,
                                max: Math.ceil(data.count / rowsPerPage),
                            }}
                            style={{ width: '80px' }}
                            onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleGoToPage}
                            disabled={!goToPageInput}
                        >
                            Go
                        </Button>
                    </div>

                    <IconButton
                        onClick={() => setPage(0)}
                        disabled={page === 0}
                        aria-label="first page"
                    >
                        {"<<"}
                    </IconButton>

                    <IconButton
                        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        aria-label="previous page"
                    >
                        {"<"}
                    </IconButton>

                    <div className="flex">
                        {pages.map((pageNum) => (
                            <Button
                                key={pageNum}
                                variant={page === pageNum ? "contained" : "text"}
                                onClick={() => setPage(pageNum)}
                                style={{
                                    minWidth: '32px',
                                    height: '32px',
                                    margin: '0 2px',
                                    backgroundColor: page === pageNum ? '#1976d2' : 'transparent',
                                    color: page === pageNum ? '#fff' : '#000',
                                }}
                            >
                                {pageNum + 1}
                            </Button>
                        ))}
                    </div>

                    <IconButton
                        onClick={() => setPage(prev => Math.min(prev + 1, Math.ceil(data.count / rowsPerPage) - 1))}
                        disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
                        aria-label="next page"
                    >
                        {">"}
                    </IconButton>

                    <IconButton
                        onClick={() => setPage(Math.ceil(data.count / rowsPerPage) - 1)}
                        disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
                        aria-label="last page"
                    >
                        {">>"}
                    </IconButton>
                </div>
            </div>
        );
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-black">
                Transaction History <span className="text-lg font-normal">({data.count})</span>
            </h1>

            <div className="w-full py-2 flex justify-between">
                <Box
                    component={Paper}
                    elevation={2}
                    sx={{
                        padding: '16px',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        marginBottom: '16px',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'flex-end',
                            gap: '1.5rem',
                        }}
                    >
                        {/* Left side: From/To Date + Search + Buttons */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flex: 1 }}>
                            <FormControl sx={{ width: '200px' }}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>From Date</FormLabel>
                                <TextField
                                    type="date"
                                    name="fromDate"
                                    value={tempFromDate} // Use tempFromDate
                                    onChange={handleDateChange}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        max: new Date().toISOString().split('T')[0]
                                    }}
                                />
                            </FormControl>

                            <FormControl sx={{ width: '200px' }}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>To Date</FormLabel>
                                <TextField
                                    type="date"
                                    name="toDate"
                                    value={tempToDate} // Use tempToDate
                                    onChange={handleDateChange}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        max: new Date().toISOString().split('T')[0]
                                    }}
                                />
                            </FormControl>
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{
                                        height: '40px',
                                        minWidth: '100px',
                                        textTransform: 'none',
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>

                            <FormControl sx={{ width: '400px' }}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>Search</FormLabel>
                                <TextField
                                    placeholder="Profile ID / Name / Mobile"
                                    variant="outlined"
                                    value={search}
                                    onChange={handleSearchChange}
                                    size="small"
                                    fullWidth
                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />
                            </FormControl>

                            {/* 8. ADD SUBMIT AND CLEAR BUTTONS */}

                        </Box>

                        {/* Right side: Download button */}
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleDownloadExcel}
                                disabled={isDownloading}
                                sx={{
                                    height: '40px',
                                    minWidth: '200px',
                                    textTransform: 'none',
                                }}
                            >
                                {isDownloading ? 'Downloading...' : 'Download Excel'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </div>

            {/* Quick Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <Button
                    variant={filterType === 'last_week' ? "contained" : "outlined"}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                    color="primary"
                    onClick={() => applyQuickFilter('last_week')}
                >
                    Last Week
                </Button>
                <Button
                    variant={filterType === 'today' ? "contained" : "outlined"}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                    color="primary"
                    onClick={() => applyQuickFilter('today')}
                >
                    Today
                </Button>
                <Button
                    variant={filterType === 'new_approved' ? "contained" : "outlined"}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                    color="primary"
                    onClick={() => applyQuickFilter('new_approved')}
                >
                    New / Approved
                </Button>
                <Button
                    variant={filterType === 'delete_others' ? "contained" : "outlined"}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                    color="primary"
                    onClick={() => applyQuickFilter('delete_others')}
                >
                    Delete / Others
                </Button>

                <Button
                    variant={filterType === 'all' ? "contained" : "outlined"}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' }
                    }}
                    color="primary"
                    onClick={() => applyQuickFilter('all')}
                >
                    All
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#e0e0e0',
                        color: 'black',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#d5d5d5' }
                    }}
                >
                    Profiles ({data.count})
                </Button>
            </div>

            <Paper className="w-full">
                <TableContainer sx={{ border: '1px solid #E0E0E0' }} className="bg-white">
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        sx={{
                                            borderBottom: '1px solid #E0E0E0',
                                            background: '#FFF9C9',
                                            color: '#DC2635',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                        }}
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <TableSortLabel
                                            className="!text-red-600 !text-base !text-md text-nowrap font-semibold"
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : data.results.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Typography variant="body1" color="textSecondary">
                                            No records found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.results.map((row, index) => (
                                    <TableRow
                                        sx={{ whiteSpace: 'nowrap' }}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            const formattedValue = column.format ? column.format(value) : value;

                                            return (
                                                <TableCell
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        // Add color styling for T. Status column
                                                        ...(column.id === 'status' && {
                                                            color: getStatusColor(value),
                                                            fontWeight: 'bold'
                                                        }),
                                                         ...(column.id === 'profile_status' && {
                                                            color: getPStatusColor(value),
                                                            fontWeight: 'bold'
                                                        })
                                                    }}
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.id === 'ProfileId' ? (
                                                        <Typography
                                                            onClick={() =>
                                                                navigate(`/viewProfile?profileId=${row.ProfileId}`)
                                                            }
                                                            variant="body2"
                                                            sx={{
                                                                color: 'blue',
                                                                cursor: 'pointer',
                                                                textDecoration: 'none',
                                                                '&:hover': { textDecoration: 'underline' },
                                                            }}
                                                        >
                                                            {formattedValue}
                                                        </Typography>
                                                    ) : (
                                                        formattedValue
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
                {Math.ceil(data.count / rowsPerPage) > 0 && renderCustomPagination()}
            </Paper>
        </>
    );
};

export default TransactionHistoryNew;