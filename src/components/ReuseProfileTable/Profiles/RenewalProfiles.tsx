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

// --- Helper components for SVG icons to remove external dependencies ---
const EditIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
);

const DeleteIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(255, 51, 51)' }}><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200-80h-248v-48h248v48zM352 864H288l-24-512h88l24 512zm192 0h-88l24-512h40l-24 512zm136-448l-24 512H672l24-512h-88z"></path></svg>
);

const ViewIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
);


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
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]); // Store ProfileId (string)

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
            <h1 className="text-2xl text-black font-bold mb-4">Renewal Profiles</h1>
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
