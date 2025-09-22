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

const getTransactionHistory = async (fromDate: string, toDate: string, page: number) => {
    const params: any = {
        page: page.toString(),
    };

    if (fromDate) params.from_date = fromDate;
    if (toDate) params.to_date = toDate;

    const url = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/transaction-history/`;
    const response = await axios.get(url, { params });
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
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, [fromDate, toDate, page, rowsPerPage]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiPage = page + 1;
            const response = await getTransactionHistory(fromDate, toDate, apiPage);
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
        setPage(0);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'fromDate') {
            setFromDate(value);
        } else if (name === 'toDate') {
            setToDate(value);
        }
    };

    const handleSubmit = () => {
        setPage(0);
        fetchData();
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const columns: Column[] = [
        { id: 'created_at', label: 'Paid Info Date', minWidth: 180, align: 'center', format: formatDate },
        { id: 'payment_type', label: 'Payment Mode', minWidth: 150 },
        { id: 'status', label: 'T. Status', minWidth: 120 },
        { id: 'order_id', label: 'Order ID', minWidth: 180 },
        { id: 'activation_status', label: 'A. Status', minWidth: 150 },
        { id: 'ProfileId', label: 'Profile ID', minWidth: 120 },
        { id: 'Profile_name', label: 'Name', minWidth: 150 },
        { id: 'City', label: 'City', minWidth: 120 },
        { id: 'State', label: 'State', minWidth: 120 },
        { id: 'plan_name', label: 'Mode', minWidth: 120 },
        { id: 'profile_status', label: 'P. Status', minWidth: 120 },
        { id: 'Mobile_no', label: 'Mobile No', minWidth: 140 },
    ];

    const descendingComparator = (a: any, b: any, orderBy: string) => {
        if (b[orderBy] < a[orderBy]) return -1;
        if (b[orderBy] > a[orderBy]) return 1;
        return 0;
    };

    const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    };

    const stableSort = (array: any[], comparator: (a: any, b: any) => number) => {
        const stabilizedThis = array.map(
            (el, index) => [el, index] as [any, number],
        );
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const filteredResults = stableSort(
        data.results.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(search.toLowerCase()),
            ),
        ),
        getComparator(order, orderBy),
    );

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-black">Transaction History <span className="text-lg font-normal">({data.count})</span></h1>
            <div className="w-full py-2 flex justify-between">
                <Box
                    component={Paper}
                    elevation={2}
                    sx={{
                        padding: '16px',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        marginBottom: '16px',
                        width: '100%', // full width
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
                        <Box sx={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                            <FormControl sx={{ width: '200px' }}>
                                <FormLabel sx={{ fontWeight: 'bold' }}>From Date</FormLabel>
                                <TextField
                                    type="date"
                                    name="fromDate"
                                    value={fromDate}
                                    onChange={handleDateChange}
                                    size="small"
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
                                    marginTop: '22px',
                                }}
                            >
                                Download Excel
                            </Button>
                        </Box>
                    </Box>
                </Box>


            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <Button variant="contained" sx={{ textTransform: 'none' }} color="primary">Last Week</Button>
                <Button variant="contained" sx={{ textTransform: 'none' }} color="primary">Today</Button>
                <Button variant="contained" sx={{ textTransform: 'none' }} color="primary">New/Approved</Button>
                <Button variant="contained" sx={{ textTransform: 'none' }} color="primary">Delete/Others</Button>
                <Button variant="contained" sx={{ textTransform: 'none' }} color="primary" >All</Button>
                <Button variant="contained" sx={{ backgroundColor: '#e0e0e0', color: 'black', textTransform: 'none', '&:hover': { backgroundColor: '#d5d5d5' } }} >Profiles ({data.count}) </Button>
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
                            ) : (
                                filteredResults
                                    .slice(0, rowsPerPage)
                                    .map((row, index) => (
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
                                                                    navigate(
                                                                        `/viewProfile?profileId=${row.ProfileId}`,
                                                                    )
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