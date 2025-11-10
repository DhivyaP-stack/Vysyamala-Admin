// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TableSortLabel,
//     TextField,
//     Button,
//     Typography,
//     Box,
//     IconButton,
// } from '@mui/material';
// import { MdDeleteOutline } from 'react-icons/md';
// import { GrEdit } from 'react-icons/gr';
// import { Add } from '@mui/icons-material';

// interface Column {
//     id: string;
//     label: string;
//     minWidth?: number;
// }

// interface FeaturedProfile {
//     profile_id: string;
//     Profile_name: string;
//     Gender: string;
//     name: string;
//     plan_name: string;
//     boosted_date: string | null;
//     boosted_enddate: string | null;
//     status_name: string;
//     active: string;
// }

// const columns: Column[] = [
//     { id: "staff_name", label: "Staff Name", minWidth: 150 },
//     { id: "password", label: "Password", minWidth: 120 },
//     { id: "role", label: "Role", minWidth: 120 },
//     { id: "state", label: "State", minWidth: 130 },
//     { id: "permission", label: "Permission", minWidth: 160 },
//     { id: "profiles_allocated", label: "No. of Profiles Allocated", minWidth: 200 },
//     { id: "prospect", label: "Prospect", minWidth: 120 },
//     { id: "paid", label: "Paid", minWidth: 100 },
//     { id: "delete_permission", label: "Delete", minWidth: 100 },
//     { id: "others", label: "Others", minWidth: 160 },
//     // { id: "actions", label: "Actions", minWidth: 100 },
// ];


// interface Staff {
//     staff_name: string;
//     password: string;
//     role: string;
//     state: string;
//     permission: string;
//     profiles_allocated: number;
//     prospect: string;
//     paid: string;
//     delete_permission: string;
//     others: string;
// }

// const staticData: Staff[] = [
//     {
//         staff_name: "Priya Kumar",
//         password: "priya@123",
//         role: "Admin",
//         state: "Tamil Nadu",
//         permission: "Full Access",
//         profiles_allocated: 20,
//         prospect: "5",
//         paid: "3",
//         delete_permission: "1",
//         others: "3",
//     },
//     {
//         staff_name: "Arun Raj",
//         password: "arun@321",
//         role: "Manager",
//         state: "Kerala",
//         permission: "Limited",
//         profiles_allocated: 15,
//         prospect: "5",
//         paid: "3",
//         delete_permission: "1",
//         others: "3",
//     },
//     {
//         staff_name: "Divya S",
//         password: "divya@555",
//         role: "Executive",
//         state: "Karnataka",
//         permission: "Restricted",
//         profiles_allocated: 10,
//         prospect: "5",
//         paid: "3",
//         delete_permission: "1",
//         others: "3",
//     },
// ];

// const StaffDetails: React.FC = () => {
//     const navigate = useNavigate();
//     const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//     const [orderBy, setOrderBy] = useState<keyof FeaturedProfile>('profile_id');
//     const [page, setPage] = useState<number>(0);
//     const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//     const [data, setData] = useState<{ results: FeaturedProfile[]; count: number }>({
//         results: [],
//         count: 0,
//     });
//     const [goToPageInput, setGoToPageInput] = useState<string>('');

//     useEffect(() => {
//         // Load static data
//         setData({ results: staticData, count: staticData.length });
//     }, []);

//     const handleRequestSort = (property: keyof FeaturedProfile) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };

//     const renderCellContent = (columnId: keyof FeaturedProfile, value: any, row: FeaturedProfile) => {
//         // Handle date formatting
//         if (columnId === 'boosted_date' || columnId === 'boosted_enddate') {
//             return value ? value.split(' ')[0] : 'N/A';
//         }

//         // Clickable Profile ID
//         if (columnId === 'profile_id') {
//             return (
//                 <Typography
//                     onClick={() => navigate(`/viewProfile?profileId=${row.profile_id}`)}
//                     variant="body2"
//                     sx={{
//                         color: 'blue',
//                         cursor: 'pointer',
//                         textDecoration: 'none',
//                         '&:hover': { textDecoration: 'underline' },
//                     }}
//                 >
//                     {value}
//                 </Typography>
//             );
//         }

//         return value ?? 'N/A';
//     };

//     const handleGoToPage = () => {
//         const pageNumber = parseInt(goToPageInput, 10);
//         if (!isNaN(pageNumber)) {
//             const lastPage = Math.ceil(data.count / rowsPerPage) - 1;
//             const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
//             setPage(newPage);
//             setGoToPageInput('');
//         }
//     };

//     const renderCustomPagination = () => {
//         const totalPages = Math.ceil(data.count / rowsPerPage);
//         const maxVisiblePages = 5;
//         let startPage, endPage;

//         if (totalPages <= maxVisiblePages) {
//             startPage = 0;
//             endPage = totalPages - 1;
//         } else {
//             const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
//             const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

//             if (page < maxPagesBeforeCurrent) {
//                 startPage = 0;
//                 endPage = maxVisiblePages - 1;
//             } else if (page + maxPagesAfterCurrent >= totalPages) {
//                 startPage = totalPages - maxVisiblePages;
//                 endPage = totalPages - 1;
//             } else {
//                 startPage = page - maxPagesBeforeCurrent;
//                 endPage = page + maxPagesAfterCurrent;
//             }
//         }

//         const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

//         return (
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
//                 <div className="text-sm text-gray-600">
//                     Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.count)} of {data.count} records
//                 </div>

//                 <div className="flex items-center gap-2">
//                     <Typography variant="body2">Go to page:</Typography>
//                     <TextField
//                         size="small"
//                         type="number"
//                         value={goToPageInput}
//                         onChange={(e) => setGoToPageInput(e.target.value)}
//                         inputProps={{
//                             min: 1,
//                             max: Math.ceil(data.count / rowsPerPage),
//                         }}
//                         style={{ width: '80px' }}
//                         onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
//                     />
//                     <Button variant="contained" size="small" onClick={handleGoToPage} disabled={!goToPageInput}>
//                         Go
//                     </Button>

//                     <IconButton onClick={() => setPage(0)} disabled={page === 0}>
//                         {"<<"}
//                     </IconButton>
//                     <IconButton onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
//                         {"<"}
//                     </IconButton>

//                     <div className="flex">
//                         {pages.map((pageNum) => (
//                             <Button
//                                 key={pageNum}
//                                 variant={page === pageNum ? "contained" : "text"}
//                                 onClick={() => setPage(pageNum)}
//                                 style={{
//                                     minWidth: '32px',
//                                     height: '32px',
//                                     margin: '0 2px',
//                                     backgroundColor: page === pageNum ? '#1976d2' : 'transparent',
//                                     color: page === pageNum ? '#fff' : '#000',
//                                 }}
//                             >
//                                 {pageNum + 1}
//                             </Button>
//                         ))}
//                     </div>

//                     <IconButton
//                         onClick={() => setPage(prev => Math.min(prev + 1, Math.ceil(data.count / rowsPerPage) - 1))}
//                         disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
//                     >
//                         {">"}
//                     </IconButton>
//                     <IconButton
//                         onClick={() => setPage(Math.ceil(data.count / rowsPerPage) - 1)}
//                         disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
//                     >
//                         {">>"}
//                     </IconButton>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl text-black font-bold mb-4">
//                Staff Details <span className="text-lg font-normal">({data.count})</span>
//             </h1>

//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<Add />}
//                     sx={{
//                         height: 40,
//                         alignSelf: 'flex-end',
//                         minWidth: 150,
//                         textTransform: 'none',
//                         fontWeight: 600,
//                         fontSize: '0.95rem',
//                         borderRadius: '8px',
//                         boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
//                     }}
//                 >
//                     Add Profile
//                 </Button>
//             </Box>

//             <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//                 <TableContainer sx={{ maxHeight: 640, backgroundColor: 'white' }}>
//                     <Table stickyHeader aria-label="featured profiles table">
//                         <TableHead>
//                             <TableRow>
//                                 {columns.map((column) => (
//                                     <TableCell
//                                         key={column.id}
//                                         align={column.align}
//                                         style={{ minWidth: column.minWidth }}
//                                         sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0' }}
//                                     >
//                                         <TableSortLabel
//                                             className="!text-red-600 !text-base !font-semibold"
//                                             active={orderBy === column.id}
//                                             direction={orderBy === column.id ? order : 'asc'}
//                                             // onClick={() => handleRequestSort(column.id)}
//                                         >
//                                             {column.label}
//                                         </TableSortLabel>
//                                     </TableCell>
//                                 ))}
//                                 <TableCell
//                                     align="center"
//                                     className="!text-red-600 !text-base !font-semibold"
//                                     sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0' }}
//                                 >
//                                     Actions
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {data.results.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={columns.length + 1} align="center">
//                                         No data found
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 data.results.map((row) => (
//                                     <TableRow key={row.profile_id} hover>
//                                         {columns.map((column) => (
//                                             <TableCell key={column.id} align={column.align}>
//                                                 {renderCellContent(column.id, row[column.id], row)}
//                                             </TableCell>
//                                         ))}
//                                         <TableCell sx={{ padding: '10px', textAlign: 'center' }}>
//                                             <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
//                                                 <Button
//                                                     // onClick={() => navigate(`/editProfile?profileId=${row.profile_id}`)}
//                                                 >
//                                                     <GrEdit />
//                                                 </Button>
//                                                 <Button>
//                                                     <MdDeleteOutline
//                                                         style={{
//                                                             height: '17px',
//                                                             width: '25px',
//                                                             color: '#ff3333',
//                                                         }}
//                                                     />
//                                                 </Button>
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {Math.ceil(data.count / rowsPerPage) > 0 && renderCustomPagination()}
//             </Paper>
//         </div>
//     );
// };

// export default StaffDetails;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Chip,
} from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { Add, Cancel } from '@mui/icons-material';

// --- Type Definitions ---

interface Column {
    id: keyof Staff | 'actions'; // Include 'actions' for the last column
    label: string;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
}

interface Staff {
    staff_name: string;
    password: string;
    role: string;
    state: string;
    permission: string;
    profiles_allocated: number;
    prospect: string;
    paid: string;
    delete_permission: string;
    others: string;
    // Add an ID for mapping if this were real data
    id: number;
}

// Ensure the columns match the Staff keys and include 'actions' if needed for sorting logic
const columns: Column[] = [
    { id: "staff_name", label: "Staff Name", minWidth: 150 },
    { id: "password", label: "Password", minWidth: 120 },
    { id: "role", label: "Role", minWidth: 120 },
    { id: "state", label: "State", minWidth: 130 },
    { id: "permission", label: "Permission", minWidth: 160 },
    { id: "profiles_allocated", label: "No. of Profiles Allocated", minWidth: 200 },
    { id: "prospect", label: "Prospect", minWidth: 120 },
    { id: "paid", label: "Paid", minWidth: 100 },
    { id: "delete_permission", label: "Delete", minWidth: 100 },
    { id: "others", label: "Others", minWidth: 160 },
];

const staticData: Staff[] = [
    {
        id: 1,
        staff_name: "Priya Kumar",
        password: "priya@123",
        role: "Admin",
        state: "Tamil Nadu",
        permission: "Full Access",
        profiles_allocated: 20,
        prospect: "5",
        paid: "3",
        delete_permission: "1",
        others: "3",
    },
    {
        id: 2,
        staff_name: "Arun Raj",
        password: "arun@321",
        role: "Manager",
        state: "Kerala",
        permission: "Limited",
        profiles_allocated: 15,
        prospect: "5",
        paid: "3",
        delete_permission: "1",
        others: "3",
    },
    {
        id: 3,
        staff_name: "Divya S",
        password: "divya@555",
        role: "Executive",
        state: "Karnataka",
        permission: "Restricted",
        profiles_allocated: 10,
        prospect: "5",
        paid: "3",
        delete_permission: "1",
        others: "3",
    },
];

// Initial state for a new staff member
const initialNewStaffState: Staff = {
    id: 0, // Placeholder, will be replaced with a new unique ID
    staff_name: "",
    password: "",
    role: "",
    state: "",
    permission: "Full Access", // Default or user-defined
    profiles_allocated: 0,
    prospect: "",
    paid: "",
    delete_permission: "",
    others: "",
};

// --- Staff Details Component ---

const StaffDetails: React.FC = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    // NOTE: Changed default sort key to a valid Staff key for consistency
    const [orderBy, setOrderBy] = useState<keyof Staff>('staff_name');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    // NOTE: Updated data state to use the correct Staff interface
    const [data, setData] = useState<{ results: Staff[]; count: number }>({
        results: [],
        count: 0,
    });
    const [goToPageInput, setGoToPageInput] = useState<string>('');
    // New state for form visibility
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    // New state for form data
    const [newStaff, setNewStaff] = useState<Staff>(initialNewStaffState);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    // Static options for form fields
    const roleOptions = ["Admin", "Manager", "Executive", "View Only", "Sales", "Biz Dev", "Franchise", "Customer Support"];
    const stateOptions = ["Tamil Nadu & Pondicherry", "Andhra Pradesh", "Telangana", "Karnataka", "Kerala", "Maharashtra", "Delhi", "Others"];

    useEffect(() => {
        // Load static data
        setData({ results: staticData, count: staticData.length });
    }, []);

    const handleRequestSort = (property: keyof Staff) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const renderCellContent = (columnId: keyof Staff, value: any, row: Staff) => {
        // You can add custom rendering logic here if needed, but for the Staff table, simple rendering works.
        // For 'password', you might want to obscure it.
        if (columnId === 'password') {
            return '••••••••';
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

    const handleAddStaff = () => {
        // Add logic to save the new staff member
        console.log("New Staff Data:", newStaff);
        console.log("Selected States:", selectedStates);
        console.log("Allocated Profiles File:", file);

        // Simple ID generation for static data simulation
        const newId = Math.max(...data.results.map(s => s.id), 0) + 1;
        const newStaffWithId = { ...newStaff, id: newId, state: selectedStates.join(', ') };

        setData(prev => ({
            results: [...prev.results, newStaffWithId],
            count: prev.count + 1,
        }));

        // Reset form
        setNewStaff(initialNewStaffState);
        setSelectedStates([]);
        setFile(null);
        setShowAddForm(false); // Hide form after submission
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
                    <Button variant="contained" size="small" onClick={handleGoToPage} disabled={!goToPageInput}>
                        Go
                    </Button>

                    <IconButton onClick={() => setPage(0)} disabled={page === 0}>
                        {"<<"}
                    </IconButton>
                    <IconButton onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
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
                    >
                        {">"}
                    </IconButton>
                    <IconButton
                        onClick={() => setPage(Math.ceil(data.count / rowsPerPage) - 1)}
                        disabled={page >= Math.ceil(data.count / rowsPerPage) - 1}
                    >
                        {">>"}
                    </IconButton>
                </div>
            </div>
        );
    };

    const AddStaffForm = () => (
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 4, marginTop: 4, borderRadius: '12px', boxShadow: '0 6px 20px rgba(15,23,42,0.06)' }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#0f172a' }}>
                Add New Staff
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ '& > div': { mb: 2 } }}>
                {/* Name */}
                <FormControl fullWidth required>
                    <TextField
                        label="Name"
                        value={newStaff.staff_name}
                        onChange={(e) => setNewStaff({ ...newStaff, staff_name: e.target.value })}
                        required
                        sx={{
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        }}
                    />
                </FormControl>

                {/* Password */}
                <FormControl fullWidth required>
                    <TextField
                        label="Password"
                        type="password"
                        value={newStaff.password}
                        onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                        required
                        sx={{
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        }}
                    />
                </FormControl>

                {/* Role */}
                <FormControl fullWidth required>
                    <InputLabel id="role-label" sx={{
                        '& .MuiFormLabel-asterisk': {
                            color: 'red',
                        },
                    }}>Role</InputLabel>
                    <Select
                        labelId="role-label"
                        label="Role"
                        value={newStaff.role}
                        onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                        required
                    >
                        <MenuItem value="">-- Select role --</MenuItem>
                        {roleOptions.map((role) => (
                            <MenuItem key={role} value={role}>{role}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* State / Region (Multi Select) */}
                <FormControl fullWidth>
                    <InputLabel id="state-select-label">State / Region (Multi Select)</InputLabel>
                    <Select
                        labelId="state-select-label"
                        id="state-select-multiple-chip"
                        multiple
                        value={selectedStates}
                        onChange={(e) => setSelectedStates(e.target.value as string[])}
                        input={<OutlinedInput id="select-multiple-chip" label="State / Region (Multi Select)" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {stateOptions.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Profile Allocation (File Upload) */}
                <Box sx={{ border: '1px solid #e6e9ef', borderRadius: '8px', padding: 2, background: '#fff' }}>
                    <Typography variant="body2" gutterBottom>Profile Allocation (Excel Upload)</Typography>
                    <input
                        type="file"
                        accept=".csv,.xls,.xlsx"
                        style={{ display: 'block', width: '100%' }}
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        Accepted: .xlsx .xls .csv — max 5 MB. Columns: profile_id, profile_owner
                    </Typography>
                </Box>

                {/* Actions */}
                <Box display="flex" justifyContent="flex-end" gap={2} pt={2}>
                    <Button
                        variant="outlined"
                        onClick={() => setShowAddForm(false)}
                    // startIcon={<Cancel />}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddStaff}
                        // startIcon={<Add />}
                        disabled={!newStaff.staff_name || !newStaff.password || !newStaff.role}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Paper>
    );

    return (
        <div className="p-4">

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <h1 className="text-2xl text-black font-bold">
                    Staff Details <span className="text-lg font-normal">({data.count})</span>
                    <Typography variant="subtitle2" sx={{ color: '#6b7280', fontSize: '13px' }}>
                        View, add, and manage staff members
                    </Typography>
                </h1>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setShowAddForm(true)} // Toggle visibility to true
                    sx={{
                        height: 40,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                        boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
                    }}
                >
                    Add New Staff
                </Button>
            </Box>

            {/* Conditional Rendering of Add Staff Form */}
            {showAddForm && <AddStaffForm />}

            {/* Staff Table */}

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1.5, color: '#0f172a' }}>
                    All Staff Details
                </Typography>
                <TableContainer sx={{ maxHeight: 640, backgroundColor: 'white' }}>
                    <Table stickyHeader aria-label="staff details table">
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
                                        // The original code commented out sorting logic. Uncomment below to enable sorting.
                                        // onClick={() => handleRequestSort(column.id as keyof Staff)} 
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell
                                    align="center"
                                    className="!text-red-600 !text-base !font-semibold"
                                    sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', minWidth: 100 }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.results.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} align="center">
                                        No staff data found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    // NOTE: Using 'id' for the key is safer in real apps, adjusted to use 'id' if available.
                                    <TableRow key={row.id} hover>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                {renderCellContent(column.id, row[column.id], row)}
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{ padding: '10px', textAlign: 'center' }}>
                                            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                                <IconButton
                                                    // onClick={() => navigate(`/editStaff?staffId=${row.id}`)}
                                                    color="primary"
                                                >
                                                    <GrEdit style={{ fontSize: '16px' }} />
                                                </IconButton>
                                                <IconButton
                                                // onClick={() => handleDeleteStaff(row.id)}
                                                >
                                                    <MdDeleteOutline style={{ color: '#ff3333' }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {Math.ceil(data.count / rowsPerPage) > 0 && renderCustomPagination()}
            </Paper>
        </div>
    );
};

export default StaffDetails;