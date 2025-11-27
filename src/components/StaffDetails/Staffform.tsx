import React, { useEffect, useState } from 'react';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Chip,
    SelectChangeEvent,
    CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiAxios } from '../../api/apiUrl';

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

interface RoleOption {
    id: number;
    name: string;
}

interface StateOption {
    State_Pref_id: number;
    State_name: string;
}

interface AddStaffFormProps {
    onStaffAdded: () => void;
    onCancel: () => void;
    roles: RoleOption[];
    stateOptions: StateOption[];
    editingStaff: Staff | null;
    isEditMode: boolean;
}

const initialNewStaffState: Staff = {
    id: 0,
    email: "",
    username: "",
    role: "",
    role_name: "",
    state: "",
    state_name: "",
    status: 0,
    status_display: "Active",
    password: "",
    permission: "Full Access",
    allocated_profiles_count: '0',
    prospect_profile_count: '0',
    paid_profile_count: '0',
    delete_profile_count: '0',
    others_profile_count: '0'
};

const AddStaffForm: React.FC<AddStaffFormProps> = ({
    onStaffAdded,
    onCancel,
    roles,
    stateOptions,
    editingStaff,
    isEditMode
}) => {
    const [newStaff, setNewStaff] = useState<Staff>(initialNewStaffState);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isFormValid = newStaff.username && newStaff.email;
    const isSaveDisabled = isLoading || !isFormValid || (!isEditMode && !newStaff.password);
    const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

    useEffect(() => {
        if (isEditMode && editingStaff) {
            setNewStaff({
                ...editingStaff,
                password: '' // Clear password in edit mode for security
            });

            // Handle comma-separated state IDs (e.g., "1,2,3")
            if (editingStaff.state) {
                const stateIds = String(editingStaff.state).split(',').map(id => id.trim());

                // Convert state IDs to state names
                const stateNames = stateIds
                    .map(id => {
                        const state = stateOptions.find(s => String(s.State_Pref_id) === id);
                        return state ? state.State_name : null;
                    })
                    .filter((name): name is string => name !== null);

                setSelectedStates(stateNames);
            }
        } else {
            // Reset form when not in edit mode
            setNewStaff(initialNewStaffState);
            setSelectedStates([]);
        }
    }, [editingStaff, isEditMode, stateOptions]);

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStaff(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (e: SelectChangeEvent<any>) => {
        const selectedId = e.target.value as number;
        const selectedRole = roles.find(r => r.id === selectedId);

        if (selectedRole) {
            setNewStaff(prev => ({
                ...prev,
                role: selectedRole.id,
                role_name: selectedRole.name
            }));
        } else {
            setNewStaff(prev => ({
                ...prev,
                role: 0,
                role_name: ""
            }));
        }
    };

    // const handleAddOrUpdateStaff = async () => {
    //     // Validation Check
    //     // if (!newStaff.username || !newStaff.email) {
    //     //     alert("Name and Email are required.");
    //     //     return;
    //     // }

    //     // // For new staff, password is required
    //     // if (!newStaff.password) {
    //     //     alert("Password is required for new staff.");
    //     //     return;
    //     // }

    //     setIsLoading(true);

    //     try {
    //         const selectedStateIDs = selectedStates.map(stateName => {
    //             const state = stateOptions.find(s => s.State_name === stateName);
    //             return state ? String(state.State_Pref_id) : null;
    //         }).filter((id): id is string => id !== null);

    //         const stateToSend = selectedStateIDs.join(',');

    //         let staffPayload: any = {
    //             email: newStaff.email,
    //             username: newStaff.username,
    //             role: String(newStaff.role),
    //             state: stateToSend,
    //             admin_user_id: adminUserID
    //         };

    //         // Only include password if it's provided (for new staff or when changing password)
    //         if (newStaff.password) {
    //             staffPayload.password = newStaff.password;
    //         }

    //         let response;
    //         if (isEditMode && editingStaff) {
    //             // UPDATE existing staff
    //             response = await apiAxios.patch(`/api/users/${editingStaff.id}/`, staffPayload);
    //             toast.success("Staff updated successfully");
    //         } else {
    //             // CREATE new staff
    //             response = await apiAxios.post('/api/users/', staffPayload);
    //             toast.success("Staff added successfully");
    //         }

    //         console.log(isEditMode ? 'Update staff' : 'Add staff', response);

    //         // Reset form
    //         setNewStaff(initialNewStaffState);
    //         setSelectedStates([]);
    //         setFile(null);

    //         // Notify parent component
    //         onStaffAdded();

    //     } catch (error) {
    //         if (axios.isAxiosError(error) && error.response) {
    //             console.error("API Error:", error.response.data);
    //             toast.error("Error: " + JSON.stringify(error.response.data));
    //         } else {
    //             console.error("General error:", error);
    //             toast.error("An unexpected error occurred.");
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleAddOrUpdateStaff = async () => {
        setIsLoading(true);

        try {
            const selectedStateIDs = selectedStates.map(stateName => {
                const state = stateOptions.find(s => s.State_name === stateName);
                return state ? String(state.State_Pref_id) : null;
            }).filter((id): id is string => id !== null);

            const stateToSend = selectedStateIDs.join(',');

            // Use FormData to handle file upload with other form data
            const formData = new FormData();

            // Append all staff data
            formData.append('email', newStaff.email);
            formData.append('username', newStaff.username);
            formData.append('role', String(newStaff.role));
            formData.append('state', stateToSend);
            if (adminUserID) {
                formData.append('admin_user_id', adminUserID);
            }

            // Only include password if it's provided
            if (newStaff.password) {
                formData.append('password', newStaff.password);
            }

            // Append the Excel file if selected
            if (file) {
                formData.append('excel_file', file);
            }

            let response;
            if (isEditMode && editingStaff) {
                // UPDATE existing staff with file
                response = await apiAxios.patch(`/api/users/${editingStaff.id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Staff updated successfully");
            } else {
                // CREATE new staff with file
                response = await apiAxios.post('/api/users/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Staff added successfully");
            }

            console.log(isEditMode ? 'Update staff' : 'Add staff', response);

            // Reset form
            setNewStaff(initialNewStaffState);
            setSelectedStates([]);
            setFile(null);

            // Notify parent component
            onStaffAdded();

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("API Error:", error.response.data);
                toast.error("Error: " + JSON.stringify(error.response.data));
            } else {
                console.error("General error:", error);
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, marginBottom: 4, marginTop: 4, borderRadius: '12px', boxShadow: '0 6px 20px rgba(15,23,42,0.06)' }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#0f172a' }}>
                {isEditMode ? 'Edit Staff' : 'Add New Staff'}
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ '& > div': { mb: 2 } }}>
                {/* Name */}
                <FormControl fullWidth required>
                    <TextField
                        label="Name"
                        name="username"
                        value={newStaff.username}
                        onChange={handleTextFieldChange}
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
                    />
                </FormControl>

                {/* Password */}
                <FormControl fullWidth required>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={newStaff.password}
                        onChange={handleTextFieldChange}
                        required={!isEditMode}
                        sx={{ '& .MuiFormLabel-asterisk': { color: isEditMode ? 'transparent' : 'red' } }}
                    />
                </FormControl>

                {/* Email */}
                <FormControl fullWidth required>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={newStaff.email}
                        onChange={handleTextFieldChange}
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
                    />
                </FormControl>

                {/* Role */}
                <FormControl fullWidth>
                    <InputLabel id="role-label" sx={{
                        '& .MuiFormLabel-asterisk': {
                            color: 'red',
                        },
                    }}>Role</InputLabel>
                    <Select
                        labelId="role-label"
                        label="Role"
                        value={newStaff.role as number}
                        onChange={handleRoleChange}
                        required
                        disabled={roles.length === 0}
                    >
                        <MenuItem value={0}>
                            {roles.length === 0 ? 'Loading roles...' : 'Select Role'}
                        </MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
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
                            <MenuItem key={state.State_Pref_id} value={state.State_name}>
                                {state.State_name}
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
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddOrUpdateStaff}
                        disabled={isSaveDisabled}
                        startIcon={isLoading ? <CircularProgress size={20} /> : null}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default AddStaffForm;