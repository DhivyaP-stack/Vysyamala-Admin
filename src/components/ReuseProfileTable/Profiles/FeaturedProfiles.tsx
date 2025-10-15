import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Box,
    IconButton,
} from '@mui/material';
import axios from 'axios';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { FaRegEye } from 'react-icons/fa';
import { Add } from '@mui/icons-material';

const FEATURED_API_URL = 'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/featured-profiles/';
const API_URL = 'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api'; // Base API for delete

export const getFeaturedProfiles = async (
    search: string,
    rowsPerPage: number,
    page: number,
    fromDate?: string,
    toDate?: string
) => {
    const params = new URLSearchParams({
        page_size: rowsPerPage.toString(),
        page: page.toString(),
    });

    if (search) params.append('search', search);
    if (fromDate) params.append('from_date', fromDate);
    if (toDate) params.append('to_date', toDate);

    const url = `${FEATURED_API_URL}?${params.toString()}`;
    const response = await axios.get(url);
    return response;
};

interface Column {
    id: keyof FeaturedProfile;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

interface FeaturedProfile {
    profile_id: string;
    Profile_name: string;
    Gender: string;
    name: string;
    plan_name: string;
    boosted_date: string | null;
    boosted_enddate: string | null;
    status_name: string;
    active: string;
}

const columns: Column[] = [
    { id: 'profile_id', label: 'Profile ID', minWidth: 120 },
    { id: 'Profile_name', label: 'Name', minWidth: 170 },
    { id: 'Gender', label: 'Gender', minWidth: 170 },
    { id: 'name', label: 'State', minWidth: 120 },
    { id: 'plan_name', label: 'Plan', minWidth: 170 },
    { id: 'boosted_date', label: 'From Date', minWidth: 170 },
    { id: 'boosted_enddate', label: 'To Date', minWidth: 120 },
    { id: 'status_name', label: 'Status', minWidth: 170 },
    { id: 'active', label: 'Active', minWidth: 170 },
];

const FeaturedProfiles: React.FC = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof FeaturedProfile>('profile_id');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [data, setData] = useState<{ results: FeaturedProfile[]; count: number }>({
        results: [],
        count: 0,
    });
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [goToPageInput, setGoToPageInput] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, order, orderBy, search, fromDate, toDate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getFeaturedProfiles(
                search.trim(),
                rowsPerPage,
                page + 1,
                fromDate,
                toDate
            );

            setData(response.data);
            setTotalCount(response.data.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(event.target.value);
    };

    const handleDateFilterSubmit = () => {
        setPage(0);
        fetchData();
    };

    const handleRequestSort = (property: keyof FeaturedProfile) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const handleDelete = async (profileId: string) => {
    //     if (!profileId) {
    //         console.error('Error: Missing Profile ID for the row to delete');
    //         return;
    //     }

    //     const confirmed = window.confirm(
    //         'Are you sure you want to delete this profile?',
    //     );
    //     if (!confirmed) return;

    //     try {
    //         // Adjust the delete endpoint according to your API
    //         await axios.delete(`${API_URL}/featured-profiles/${profileId}/`);
    //         fetchData();
    //     } catch (error) {
    //         console.error('Error deleting data:', error);
    //     }
    // };

    const renderCellContent = (columnId: keyof FeaturedProfile, value: any, row: FeaturedProfile) => {
        // Handle date formatting for boosted_date and boosted_enddate
        if (columnId === 'boosted_date' || columnId === 'boosted_enddate') {
            return value ? value.split(' ')[0] : 'N/A';
        }

        // Make Profile ID clickable
        if (columnId === 'profile_id') {
            return (
                <Typography
                    onClick={() => navigate(`/viewProfile?profileId=${row.profile_id}`)}
                    variant="body2"
                    sx={{
                        color: 'blue',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    {value}
                </Typography>
            );
        }

        return value ?? 'N/A';
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
        <div className="p-4">
            <h1 className="text-2xl text-black font-bold mb-4">
                Featured Profiles <span className="text-lg font-normal">({totalCount})</span>
            </h1>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)', // ⬆️ Increased shadow depth
                    padding: 2.5,
                    marginBottom: 3,
                    gap: 2,
                }}
            >
                {/* Left side - All fields in one line */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                        flex: 1,
                    }}
                >
                    {/* Profile ID */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, color: '#555', mb: 0.5 }}
                        >
                            Profile ID <span className='text-red-500'>*</span>
                        </Typography>
                        <TextField
                            placeholder="Enter Profile ID"
                            value={search}
                            onChange={handleSearchChange}
                            variant="outlined"
                            size="small"
                            sx={{ width: 250 }}
                        />
                    </Box>

                    {/* From Date */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#555', mb: 0.5 }}>
                            From Date <span className='text-red-500'>*</span>
                        </Typography>
                        <TextField
                            type="date"
                            size="small"
                            value={fromDate}
                            onChange={handleFromDateChange}
                            sx={{ width: 160 }}
                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                        />
                    </Box>

                    {/* To Date */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#555', mb: 0.5 }}>
                            To Date <span className='text-red-500'>*</span>  
                        </Typography>
                        <TextField
                            type="date"
                            size="small"
                            value={toDate}
                            onChange={handleToDateChange}
                            sx={{ width: 160 }}
                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                        />
                    </Box>
                </Box>


                {/* Add Profile Button */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />} // ⬅️ Plus icon
                    sx={{
                        height: 40,
                        minWidth: 150,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
                    }}
                >
                    Add Profile
                </Button>
            </Box>


            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        label="From Date"
                        type="date"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        inputProps={{
                            max: new Date().toISOString().split('T')[0] // This disables future dates
                        }}
                    />
                    <TextField
                        label="To Date"
                        type="date"
                        value={toDate}
                        onChange={handleToDateChange}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        inputProps={{
                            max: new Date().toISOString().split('T')[0] // This disables future dates
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleDateFilterSubmit}
                    >
                        Submit
                    </Button>
                </Box>

                <TextField
                    size="medium"
                    label="Search"
                    variant="outlined"
                    placeholder="Profile ID / Name"
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ width: '300px' }}
                />
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640, backgroundColor: 'white' }}>
                    <Table stickyHeader aria-label="featured profiles table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0' }}
                                    >
                                        <TableSortLabel
                                            className="!text-red-600 !text-base !font-semibold"
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell
                                    align="center"
                                    className="!text-red-600 !text-base !font-semibold"
                                    sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0' }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : data.results.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} align="center">
                                        No data found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.results.map((row) => {
                                    const isItemSelected = selectedRows.includes(row.profile_id);
                                    return (
                                        <TableRow
                                            key={row.profile_id}
                                            selected={isItemSelected}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {renderCellContent(column.id, row[column.id], row)}
                                                </TableCell>
                                            ))}
                                            <TableCell sx={{ padding: '10px', textAlign: 'center' }}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    gap={1}
                                                >
                                                    <Button
                                                        onClick={() => navigate(`/viewProfile?profileId=${row.profile_id}`)}
                                                    >
                                                        <FaRegEye />
                                                    </Button>
                                                    <Button
                                                        onClick={() => navigate(`/editProfile?profileId=${row.profile_id}`)}
                                                    >
                                                        <GrEdit />
                                                    </Button>
                                                    {/* <Button onClick={() => handleDelete(row.profile_id)}>
                                                        <MdDeleteOutline
                                                            style={{
                                                                height: '17px',
                                                                width: '25px',
                                                                color: '#ff3333',
                                                            }}
                                                        />
                                                    </Button> */}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
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
        </div>
    );
};

export default FeaturedProfiles;