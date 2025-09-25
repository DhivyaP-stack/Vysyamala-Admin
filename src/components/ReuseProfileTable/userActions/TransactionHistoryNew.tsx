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
    // 1. ADD DEBOUNCED SEARCH STATE
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');

    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [filterType, setFilterType] = useState<'today' | 'last_week' | 'new_approved' | 'delete_others' | 'all'>('all');
    const [loading, setLoading] = useState<boolean>(true);

    // 2. ADD A useEffect TO DEBOUNCE THE SEARCH INPUT
    useEffect(() => {
        // Set a timer for 2 seconds (2000ms)
        const timerId = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(0); // Reset to first page when search term changes
        }, 1000);

        // This is the cleanup function. It runs if the user types again
        // before the 2 seconds are up, canceling the previous timer.
        return () => {
            clearTimeout(timerId);
        };
    }, [search]); // This effect runs only when the 'search' state changes

    const buildFilterParams = (): FilterParams => {
        const params: FilterParams = {
            page: page + 1,
        };

        if (fromDate) params.from_date = fromDate;
        if (toDate) params.to_date = toDate;
        if (filterType && filterType !== 'all') params.filter_type = filterType;
        
        // 3. USE THE DEBOUNCED SEARCH TERM FOR THE API CALL
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

    // 4. UPDATE THE MAIN useEffect's DEPENDENCY ARRAY
    // It now listens to 'debouncedSearch' instead of a manual trigger.
    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, order, orderBy, filterType, fromDate, toDate, debouncedSearch]);


    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    
    // The manual search button can still be used for an immediate search
    const handleSearch = () => {
        setDebouncedSearch(search); // Immediately apply the search term
        setPage(0);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'fromDate') {
            setFromDate(value);
        } else if (name === 'toDate') {
            setToDate(value);
        }
        setPage(0);
    };
    
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
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
            setFromDate(getTodayDate());
            setToDate(getTodayDate());
        } else if (type === 'last_week') {
            setFromDate(getLastWeekDate());
            setToDate(getTodayDate());
        } else {
            setFromDate('');
            setToDate('');
        }

        setPage(0);
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
                        {/* Left side: From/To Date + Search */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flex: 1 }}>
                            <FormControl sx={{ width: '200px' }}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>From Date</FormLabel>
                                <TextField
                                    type="date"
                                    name="fromDate"
                                    value={fromDate}
                                    onChange={handleDateChange}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

                            <FormControl sx={{ width: '200px' }}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>To Date</FormLabel>
                                <TextField
                                    type="date"
                                    name="toDate"
                                    value={toDate}
                                    onChange={handleDateChange}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>

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
                        </Box>


                        {/* Right side: Button aligned to right */}
                        <Box sx={{ display: 'flex', gap: '1rem' }}>

                            <Button
                                variant="contained"
                                color="success"
                                sx={{
                                    height: '40px',
                                    minWidth: '200px',
                                    textTransform: 'none',
                                }}
                            >
                                Download Excel
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
                        backgroundColor: '#1976d2', // MUI primary blue
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' } // darker hover
                    }}                    color="primary"
                    onClick={() => applyQuickFilter('last_week')}
                >
                    Last Week
                </Button>
                <Button
                    variant={filterType === 'today' ? "contained" : "outlined"}
 sx={{
                        backgroundColor: '#1976d2', // MUI primary blue
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' } // darker hover
                    }}                    color="primary"
                    onClick={() => applyQuickFilter('today')}
                >
                    Today
                </Button>
                <Button
                    variant={filterType === 'new_approved' ? "contained" : "outlined"}
 sx={{
                        backgroundColor: '#1976d2', // MUI primary blue
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' } // darker hover
                    }}                    color="primary"
                    onClick={() => applyQuickFilter('new_approved')}
                >
                    New / Approved
                </Button>
                <Button
                    variant={filterType === 'delete_others' ? "contained" : "outlined"}
 sx={{
                        backgroundColor: '#1976d2', // MUI primary blue
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' } // darker hover
                    }}                    color="primary"
                    onClick={() => applyQuickFilter('delete_others')}
                >
                    Delete / Others
                </Button>

                <Button
                    variant={filterType === 'all' ? "contained" : "outlined"}
 sx={{
                        backgroundColor: '#1976d2', // MUI primary blue
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#1565c0' } // darker hover
                    }}                    color="primary"
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
                                                    sx={{ whiteSpace: 'nowrap' }}
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

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default TransactionHistoryNew;