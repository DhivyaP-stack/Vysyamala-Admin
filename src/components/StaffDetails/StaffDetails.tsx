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
    Button,
    Typography,
    Box,
    IconButton,
    CircularProgress,
    DialogActions,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { Add } from '@mui/icons-material';
import { apiAxios } from '../../api/apiUrl';
import AddStaffForm from './Staffform'; // Adjust path as needed
import { toast } from 'react-toastify';

// --- Type Definitions ---
interface Staff {
    id: number;
    email: string;
    username: string;
    role: number | string;
    role_name: string;
    state: number | string;
    state_name: string;
    status: number;
    status_display: string;
    password: string;
    permission: string;
    allocated_profiles_count: string;
    prospect_profile_count: string;
    paid_profile_count: string;
    delete_profile_count: string;
    others_profile_count: string;
}

interface Column {
    id: keyof Staff | 'actions' | 'staff_name' | 'state';
    label: string;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
}

interface RoleOption {
    id: number;
    name: string;
}

interface StateOption {
    State_Pref_id: number;
    State_name: string;
}

// Update the columns to match the new API keys (username, role_name, state_name, etc.)
const columns: Column[] = [
    { id: "username", label: "Staff Name", minWidth: 150 },
    // { id: "password", label: "Password", minWidth: 120 },
    { id: "role_name", label: "Role", minWidth: 120 },
    { id: "state_name", label: "State", minWidth: 130 },
    { id: "permission", label: "Permission", minWidth: 160 },
    { id: "allocated_profiles_count", label: "No. of Profiles Allocated", minWidth: 200 },
    { id: "prospect_profile_count", label: "Prospect", minWidth: 120 },
    { id: "paid_profile_count", label: "Paid", minWidth: 100 },
    { id: "delete_profile_count", label: "Delete", minWidth: 100 },
    { id: "others_profile_count", label: "Others", minWidth: 160 },
];

const StaffDetails: React.FC = () => {
    //const navigate = useNavigate();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Staff | "">("");
    const [data, setData] = useState<{ results: Staff[]; count: number }>({
        results: [],
        count: 0,
    });
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [roles, setRoles] = useState<RoleOption[]>([]);
    const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

    const handleRequestSort = (property: keyof Staff) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await apiAxios.get('api/users/');
            const apiResults: any[] = response.data;

            const formattedData: Staff[] = apiResults.map(item => ({
                id: item.id,
                email: item.email,
                username: item.username,
                role: item.role,
                role_name: item.role_name,
                state: item.state,
                state_name: item.state_name,
                status: item.status,
                status_display: item.status_display,
                password: '••••••••',
                permission: item.permission,
                allocated_profiles_count: item.allocated_profiles_count || 0,
                prospect_profile_count: item.prospect_profile_count || 0,
                paid_profile_count: item.paid_profile_count || 0,
                delete_profile_count: item.delete_profile_count || 0,
                others_profile_count: item.others_profile_count || 0,
            }));

            setData({
                results: formattedData,
                count: formattedData.length
            });

        } catch (error) {
            console.error("Error fetching staff data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await apiAxios.get('api/roles/dropdown/');
            if (response.data && response.data.roles) {
                setRoles(response.data.roles);
            }
        } catch (error) {
            console.error("Error fetching roles data:", error);
        }
    };

    const fetchStates = async () => {
        try {
            const response = await apiAxios.post('auth/Get_State_Pref/');
            const apiStates: { [key: string]: StateOption } = response.data;
            const formattedStates: StateOption[] = Object.values(apiStates).map(state => ({
                State_Pref_id: state.State_Pref_id,
                State_name: state.State_name,
            }));
            const validStates = formattedStates.filter(s => s.State_Pref_id && s.State_name);
            setStateOptions(validStates);
        } catch (error) {
            console.error("Error fetching state data:", error);
        }
    };

    const fetchStaffById = async (id: number) => {
        try {
            const response = await apiAxios.get(`api/users/${id}/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching staff details:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchStates();
        fetchRoles();
        fetchData();
    }, []);


    // Handler for when staff is successfully added
    const handleStaffAdded = () => {
        // Refresh the data
        fetchData();
        // Close the form
        setShowAddForm(false);
    };

    const handleOpenAddForm = () => {
        // 1. Reset editing state
        setEditingStaff(null);
        setIsEditMode(false);
        // 2. Open the form
        setShowAddForm(true);
    };

    // Handler for canceling the form
    const handleCancelAddForm = () => {
        // Reset both form visibility and editing state upon cancellation
        setShowAddForm(false);
        setEditingStaff(null);
        setIsEditMode(false);
    };
    const handleDeleteStaff = (staff: Staff) => {
        setStaffToDelete(staff);
        setDeleteConfirmation(true);
    };

    const handleEditStaff = async (staff: Staff) => {
        try {
            setIsLoading(true);
            // Fetch the latest staff data by ID
            const staffDetails = await fetchStaffById(staff.id);

            // Set the staff data for editing
            setEditingStaff({
                ...staff,
                ...staffDetails
            });
            setIsEditMode(true);
            setShowAddForm(true);

        } catch (error) {
            console.error("Error fetching staff details for editing:", error);
            toast.error('Failed to load staff details for editing');
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!staffToDelete) return;

        setIsDeleting(true);
        try {
            await apiAxios.delete(`api/users/${staffToDelete.id}/`, {
                data: {
                    admin_user_id: adminUserID,  // <-- RAW JSON body
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success(`Staff member deleted successfully`);

            // Refresh the data
            await fetchData();

            // Close the confirmation dialog
            setDeleteConfirmation(false);
            setStaffToDelete(null);

        } catch (error: any) {
            console.error("Error deleting staff:", error);
            toast.error(error.response?.data?.message || 'Failed to delete staff member');
        } finally {
            setIsDeleting(false);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation(false);
        setStaffToDelete(null);
    };

    const renderCellContent = (columnId: keyof Staff | 'staff_name' | 'state', value: any, row: Staff) => {
        if (columnId === 'password') {
            return '••••••••';
        }
        if (columnId === 'state' || columnId === 'state_name') {
            if (Array.isArray(row.state_name) && row.state_name.length > 0) {
                return row.state_name.join(", ");
            }
            return "N/A";
        }
        if (columnId === 'staff_name' || columnId === 'username') {
            return row.username ?? 'N/A';
        }
        return value ?? 'N/A';
    };

    // Sorting logic
    const sortedData = data.results.sort((a, b) => {
        if (orderBy === 'id' || orderBy === 'allocated_profiles_count' || orderBy === 'status') {
            // For numeric fields
            if (a[orderBy as keyof Staff] < b[orderBy as keyof Staff]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy as keyof Staff] > b[orderBy as keyof Staff]) {
                return order === 'asc' ? 1 : -1;
            }
        } else {
            // For string fields
            const aValue = String(a[orderBy as keyof Staff]).toLowerCase();
            const bValue = String(b[orderBy as keyof Staff]).toLowerCase();

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    return (
        <div className="p-4">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <h1 className="text-2xl text-black font-bold">
                        Staff Details <span className="text-lg font-normal">({data.count})</span>
                    </h1>
                    <Typography variant="subtitle2" sx={{ color: '#6b7280', fontSize: '13px' }}>
                        View, add, and manage staff members
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleOpenAddForm}
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

            {/* Use the separate AddStaffForm component */}
            {showAddForm && (
                <AddStaffForm
                    onStaffAdded={handleStaffAdded}
                    onCancel={handleCancelAddForm}
                    roles={roles}
                    stateOptions={stateOptions}
                    editingStaff={editingStaff}
                    isEditMode={isEditMode}
                />
            )}

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
                                            onClick={() => column.id !== 'actions' && handleRequestSort(column.id as keyof Staff)}
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 100
                                            }}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : data.results.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} align="center">
                                        No staff data found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                sortedData.map((row) => (
                                    <TableRow key={row.id} hover>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                {renderCellContent(column.id as keyof Staff | 'staff_name' | 'state', row[column.id as keyof Staff], row)}
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{ padding: '10px', textAlign: 'center' }}>
                                            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEditStaff(row)}
                                                >
                                                    <GrEdit style={{ fontSize: '16px' }} />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDeleteStaff(row)}
                                                >
                                                    <MdDeleteOutline
                                                        style={{ color: '#ff3333' }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {deleteConfirmation && (
                <Dialog
                    open={deleteConfirmation}
                    onClose={cancelDelete}
                    maxWidth="xs"
                    fullWidth
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete staff member "{staffToDelete?.username}"?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={cancelDelete}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            color="error"
                            variant="contained"
                            disabled={isDeleting}
                            startIcon={isDeleting ? <CircularProgress size={16} /> : null}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

        </div>
    );
};

export default StaffDetails;