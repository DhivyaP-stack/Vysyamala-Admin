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
    Checkbox,
    Typography,
    Box,
} from '@mui/material';
import axios from 'axios';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { FaRegEye } from 'react-icons/fa';

// --- 1. Updated API endpoint ---
const RENEWAL_API_URL = 'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/renewal-profiles/';
const API_URL = 'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api'; // Base API for delete

// --- 2. Updated data fetching function ---
export const getRenewalProfiles = async (
    search: string,
    orderBy: string,
    order: 'asc' | 'desc',
    rowsPerPage: number,
    page: number,
) => {
    const params = new URLSearchParams({
        page_size: rowsPerPage.toString(),
        page: page.toString(),
    });

    if (search) {
        params.append('search', search);
    }

    // Add sorting parameters if needed by the API
    // params.append('ordering', `${order === 'desc' ? '-' : ''}${orderBy}`);

    const url = `${RENEWAL_API_URL}?${params.toString()}`;
    const response = await axios.get(url);
    return response;
};

// --- 3. Updated Column interface and definitions to match the new API response ---
interface Column {
    id: keyof RenewalProfile; // Use keys from the data interface for type safety
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

// Interface for a single profile from the renewal API
interface RenewalProfile {
    ContentId: number;
    ProfileId: string;
    Profile_name: string;
    Gender: string;
    Mobile_no: string;
    Profile_whatsapp: string;
    EmailId: string;
    Profile_dob: string;
    DateOfJoin: string;
    birthstar_name: string;
    MaritalStatus: string;
    complexion_desc: string;
    country_name: string;
    Profile_for: string;
    highest_education: string;
    profession: string;
    anual_income: string;
    years: number;
    city_name: string;
    state_name: string;
    district_name: string;
}


const columns: Column[] = [
    { id: 'ProfileId', label: 'Profile ID', minWidth: 120 },
    { id: 'Profile_name', label: 'Profile Name', minWidth: 170 },
    { id: 'Gender', label: 'Gender', minWidth: 100 },
    { id: 'Mobile_no', label: 'Mobile No', minWidth: 150 },
    { id: 'Profile_whatsapp', label: 'WhatsApp', minWidth: 150 },
    { id: 'EmailId', label: 'Email', minWidth: 200 },
    { id: 'Profile_alternate_mobile', label: 'Alternate Mobile', minWidth: 200 },
    { id: 'Profile_dob', label: 'DOB', minWidth: 120 },
    { id: 'years', label: 'Age', minWidth: 80, align: 'center' },
    { id: 'DateOfJoin', label: 'Renewal Date', minWidth: 150 },
    { id: 'birthstar_name', label: 'Birth Star', minWidth: 130 },
    { id: 'MaritalStatus', label: 'Marital Status', minWidth: 150 },
    { id: 'complexion_desc', label: 'Complexion', minWidth: 130 },
    { id: 'country_name', label: 'Country', minWidth: 120 },
    { id: 'state_name', label: 'State', minWidth: 120 },
    { id: 'district_name', label: 'District', minWidth: 120 },
    { id: 'city_name', label: 'City', minWidth: 120 },
    { id: 'Profile_for', label: 'Profile For', minWidth: 120 },
    { id: 'highest_education', label: 'Education', minWidth: 180 },
    { id: 'profession', label: 'Profession', minWidth: 150 },
    { id: 'anual_income', label: 'Annual Income', minWidth: 180 },
    { id: 'years', label: 'Years', minWidth: 180 },
];


const RenewalProfiles: React.FC = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof RenewalProfile>('ProfileId');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [data, setData] = useState<{ results: RenewalProfile[]; count: number }>({
        results: [],
        count: 0,
    });
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    // const [selectAll, setSelectAll] = useState<boolean>(false);
    const [, setSelectAll] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]); // Store ProfileId (string)
     const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, order, orderBy, search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // --- 4. Call the new data fetching function ---
            const response = await getRenewalProfiles(
                search.trim(),
                orderBy,
                order,
                rowsPerPage,
                page + 1,
            );
            setData(response.data);
            setTotalCount(response.data.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRequestSort = (property: keyof RenewalProfile) => {
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

    const handleDelete = async (contentId: number) => {
        if (!contentId) {
            console.error('Error: Missing ID for the row to delete');
            return;
        }

        const confirmed = window.confirm(
            'Are you sure you want to delete this profile?',
        );
        if (!confirmed) return;

        try {
            // Assuming the delete endpoint uses the ContentId
            await axios.delete(`${API_URL}/logindetails/${contentId}/`);
            fetchData(); // Refresh the data after deletion
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            setSelectedRows(data.results.map((row) => row.ProfileId));
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (profileId: string) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(profileId)
                ? prevSelected.filter((id) => id !== profileId)
                : [...prevSelected, profileId],
        );
    };

    const generateShortProfilePDF = async (profileIds: string[]) => {
        try {
            const response = await axios.post(
                'https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/generate_short_profile_pdf/',
                {
                    profile_id: profileIds.join(','),
                },
                {
                    responseType: 'blob',
                },
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'profiles.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove(); // Clean up the link element
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        } finally {
            setSelectedRows([]);
            setSelectAll(false);
        }
    };

    // --- 5. Simplified renderCellContent function ---
    const renderCellContent = (columnId: keyof RenewalProfile, value: any, row: RenewalProfile) => {
        if (columnId === 'ProfileId') {
            return (
                <Typography
                    onClick={() => navigate(`/viewProfile?profileId=${row.ProfileId}`)}
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
        return value ?? 'N/A'; // Return 'N/A' for null or undefined values
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl text-black font-bold mb-4">Renewal Profiles <span className="text-lg font-normal">({totalCount})</span></h1>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                    onClick={() => generateShortProfilePDF(selectedRows)}
                    variant="contained"
                    color="primary"
                    disabled={selectedRows.length === 0}
                >
                    Download Short Profile(s)
                </Button>
                <TextField
                    size="medium"
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ width: '300px' }}
                />
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640, backgroundColor: 'white' }}>
                    <Table sx={{ border: '1px solid #E0E0E0' }} stickyHeader aria-label="renewal profiles table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" sx={{ backgroundColor: '#FFF9C9' }}>
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selectedRows.length > 0 && selectedRows.length < data.results.length}
                                        checked={data.results.length > 0 && selectedRows.length === data.results.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
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
                                    <TableCell colSpan={columns.length + 2} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.results.map((row) => {
                                    const isItemSelected = selectedRows.includes(row.ProfileId);
                                    return (
                                        <TableRow
                                            key={row.ProfileId}
                                            selected={isItemSelected}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            onClick={() => handleRowSelect(row.ProfileId)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
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
                                                        onClick={() =>
                                                            navigate(`/viewProfile?profileId=${row.ProfileId}`)
                                                        }
                                                    >
                                                        <FaRegEye />
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            navigate(`/editProfile?profileId=${row.ProfileId}`)
                                                        }
                                                    >
                                                        <GrEdit />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(row.ContentId)}>
                                                        <MdDeleteOutline
                                                            style={{
                                                                height: '17px',
                                                                width: '25px',
                                                                color: '#ff3333',
                                                            }}
                                                        />
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
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
        </div>
    );
};

export default RenewalProfiles;
