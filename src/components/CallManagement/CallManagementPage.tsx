import {
    Box,
    Button,
    Grid,
    Paper,
    Select,
    MenuItem,
    TextField,
    Typography,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { MdDeleteOutline } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { apiAxios } from "../../api/apiUrl";
import { toast } from "react-toastify";

interface MasterDataOption {
    id: number;
    // Note: The key name changes depending on the list (call_type, particulars, status, action_point)
    call_type?: string;
    particulars?: string;
    status?: string;
    action_point?: string;
}

interface MasterApiResponse {
    call_types: MasterDataOption[];
    particulars: MasterDataOption[];
    call_status: MasterDataOption[];
    action_points: MasterDataOption[];
}

interface ApiCallLog {
    id: number;
    call_management_id: number;
    call_date: string;
    comments: string;
    created_at: string;
    call_type_id: number;
    particulars_id: number;
    call_status_id: number;
    call_type_name: string;
    particulars_name: string;
    call_status_name: string; // This corresponds to 'callStatus' in the mock interface
    next_call_date: string;
    call_owner: string;
    profile_owner: String;
}

interface CallLogApiResponse {
    profile_id: string;
    call_logs: ApiCallLog[];
}

interface ApiActionLog {
    id: number;
    call_management_id: number;
    action_date: string;
    comments: string; // Corresponds to the detailed action comments
    created_at: string;
    action_point_id: number;
    next_action_id: string;
    action_point_name: string; // Corresponds to 'Call Action Today'
    next_action_name: string; // Corresponds to 'Future Action' / 'Next Action Comments'
    action_owner: string; // Assuming this is present or can be derived
    next_action_date: string;
}

interface ActionLogApiResponse {
    profile_id: string;
    action_logs: ApiActionLog[];
}

// ⭐️ NEW ASSIGN LOG INTERFACE
interface ApiAssignLog {
    id: number;
    call_management_id: number;
    assigned_date: string;
    assigned_to: number; // Use number if this is an ID, text if it's the name
    assigned_by: number; // Use number if this is an ID, text if it's the name
    notes: string; // Corresponds to 'Comments'
    created_at: string;
    assigned_to_name: string; // Add these for display purposes if not directly in API
    assigned_by_name: string; // Add these for display purposes if not directly in API
    assign_owner: string;
    assign_too_previous: string;
    assign_too_current: string;

}

interface AssignLogApiResponse {
    profile_id: string;
    assign_logs: ApiAssignLog[];
}

interface UserOption {
    id: number;
    username: string;
}

interface DetailedLogApiResponse {
    call_management_id: number;
    call_logs: (ApiCallLog & { profile_owner: string })[]; // Assuming profile_owner is available here too
    action_logs: ApiActionLog[];
    assign_logs: ApiAssignLog[];
}
// Utility component to display the colored badge and title for each section
const SectionBadge = ({ number, title, subtitle, color, icon: Icon }: { number: number; title: string; subtitle: string; color: string; icon: React.ElementType }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Box
            sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                background: color,
            }}
        >
            <Icon sx={{ fontSize: 24 }} />
        </Box>
        <Box>
            <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: 700, m: 0 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px" }}>
                {subtitle}
            </Typography>
        </Box>
    </Box>
);

// ⭐️ Utility function to get today's date in DD/MM/YYYY format for display
const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

// ⭐️ Utility function to get tomorrow's date in YYYY-MM-DD format for min attribute
const getTomorrowDateForInput = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set date to tomorrow

    // Format to YYYY-MM-DD string
    return tomorrow.toISOString().split('T')[0];
};


const CallManagementPage: React.FC = () => {
    const [activeForm, setActiveForm] = useState<'none' | 'call' | 'action' | 'assign'>('none');
    const [activeTab, setActiveTab] = useState<"call" | "action" | "assign" | "all">("call");

    // Form States (Set defaults to empty string or valid default value)
    const [callType, setCallType] = useState("");
    const [callStatus, setCallStatus] = useState("");
    const [actionToday, setActionToday] = useState("");
    const [nextActionComment, setNextActionComment] = useState("");
    const [assignOwner, setAssignOwner] = useState("");
    const [commentCallText, setCommentCallText] = useState('');
    const [commentActionText, setCommentActionText] = useState('');
    const [commentAssignText, setCommentAssignText] = useState('');
    const [commentCallError, setCommentCallError] = useState(false);
    const [commentActionError, setCommentActionError] = useState(false);
    const [commentAssignError, setCommentAssignError] = useState(false);
    const [currentDateString] = useState(getFormattedDate());
    const tomorrowMinDate = getTomorrowDateForInput();

    const [callLogs, setCallLogs] = useState<ApiCallLog[]>([]);
    const [actionLogs, setActionLogs] = useState<ApiActionLog[]>([]);
    const [assignLogs, setAssignLogs] = useState<ApiAssignLog[]>([]);
    const [callLoading, setCallLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const [masterData, setMasterData] = useState<MasterApiResponse | null>(null);
    const [masterLoading, setMasterLoading] = useState(false);

    // Form States: Change `callType`, `callStatus`, `actionToday`, `nextActionComment`, `assignOwner` 
    // to hold the selected *ID* (number or string) for API submission.
    // Use null or a specific placeholder string for "Select..."
    const [callTypeId, setCallTypeId] = useState<string>(''); // For API submission: ID
    const [callStatusId, setCallStatusId] = useState<string>(''); // For API submission: ID
    const [particularsId, setParticularsId] = useState<string>(''); // NEW: Must track for Call form
    const [actionTodayId, setActionTodayId] = useState<string>(''); // For API submission: ID
    const [nextActionCommentId, setNextActionCommentId] = useState<string>(''); // For API submission: ID
    const [userList, setUserList] = useState<UserOption[]>([]);
    const [userLoading, setUserLoading] = useState(false);
    const [assignTooId, setAssignTooId] = useState<string>('');
    const [callOwnerName, setCallOwnerName] = useState<string>("Owner 1");
    const [ActionOwnerName, setActionOwnerName] = useState<string>("Owner 1");
    const [AssignByName, setAssignByName] = useState<string>("Owner 1");
    const [nextActionDate, setnextActionDate] = useState<string>("");
    const [nextCallDate, setNextCallDate] = useState<string>("");
    const [editCallManagementId, setEditCallManagementId] = useState<number | null>(null);

    // ⭐️ EDIT MODE STATES
    const [isEditMode, setIsEditMode] = useState(false);
    const [editLogId, setEditLogId] = useState<number | null>(null);// Add these states near your other state declarations
    const [callDate, setCallDate] = useState<string>("");
    const [actionDate, setActionDate] = useState<string>("");
    const [assignDate, setAssignDate] = useState<string>("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const profileId = queryParams.get('profileId');

    // ⭐️ Data Fetching Logic
    const fetchCallLogs = async () => {
        setCallLoading(true);
        try {
            const response = await apiAxios.get<CallLogApiResponse>(
                `api/call-logs/${profileId}`
            );

            // Axios automatically parses JSON, so no need for .json()
            setCallLogs(response.data.call_logs);

        } catch (error: any) {
            console.error("Failed to fetch call logs:", error);

            // Optional: better error message
            if (error.response) {
                console.error("Response error:", error.response.data);
            }
        } finally {
            setCallLoading(false); // Stop loading
        }
    };

    const fetchActionLogs = async () => {
        setActionLoading(true);
        if (!profileId) return;
        try {
            const response = await apiAxios.get<ActionLogApiResponse>(
                `api/action-logs/${profileId}`
            );

            setActionLogs(response.data.action_logs);
        } catch (error: any) {
            console.error("Failed to fetch action logs:", error.response?.data || error.message);
        } finally {
            setActionLoading(false); // Stop loading
        }
    };

    const fetchAssignLogs = async () => {
        setAssignLoading(true);
        if (!profileId) return;
        try {
            const response = await apiAxios.get<AssignLogApiResponse>(
                `api/assign-logs/${profileId}`
            );

            setAssignLogs(response.data.assign_logs);
        } catch (error: any) {
            console.error("Failed to fetch assign logs:", error.response?.data || error.message);
        } finally {
            setAssignLoading(false); // Stop loading
        }
    };

    const fetchMasterData = async () => {
        setMasterLoading(true);
        const apiUrl = "api/callmanage-masters/";
        try {
            // Use the MasterApiResponse interface for type checking
            const response = await apiAxios.get<MasterApiResponse>(apiUrl);
            setMasterData(response.data);
        } catch (error) {
            console.error("Failed to fetch master data:", error);
        } finally {
            setMasterLoading(false);
        }
    };

    const fetchUsers = async () => {
        setUserLoading(true);
        const apiUrl = "api/users/";
        try {
            // The API returns an array directly, so we use Array<UserOption>
            const response = await apiAxios.get<UserOption[]>(apiUrl);
            // Filter for active users if necessary, but here we store all of them
            setUserList(response.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        fetchCallLogs();
        fetchActionLogs();
        fetchAssignLogs();
        fetchMasterData();
        fetchUsers();
    }, [profileId]); // Empty dependency array ensures it runs only once on mount

    const formatAPIDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const renderMenuItems = (
        data: MasterDataOption[] | undefined,
        keyName: 'call_type' | 'status' | 'particulars' | 'action_point',
        placeholder: string
    ) => {
        if (!data) return <MenuItem value="">Loading...</MenuItem>;

        return (
            [
                <MenuItem key="placeholder" value="" disabled>{placeholder}</MenuItem>,
                ...data.map((item) => (
                    <MenuItem key={item.id} value={String(item.id)}>
                        {item[keyName] as string}
                    </MenuItem>
                )),
            ]
        );
    };


    // Utility function to convert API Date (YYYY-MM-DDTHH:MM:SSZ) to HTML Input Date (YYYY-MM-DD)
    const toHtmlDate = (dateString: string): string => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    // ⭐️ New: Fetch Log Details Function
    const fetchLogDetails = async (id: number) => {
        try {
            // Note: Using a trailing slash for consistency if the API needs it
            const response = await apiAxios.get<DetailedLogApiResponse>(
                `api/call-details/${id}/`
            );
            return response.data;
        } catch (error) {
            console.error("Failed to fetch log details:", error);
            toast.error("Failed to load log details for editing.");
            return null;
        }
    };

    const handleEditOpen = async ({
        callManagementId,
        logId,
        formType
    }: {
        callManagementId: number;
        logId: number;
        formType: "call" | "action" | "assign";
    }) => {

        const data = await fetchLogDetails(callManagementId);
        if (!data) return;

        setIsEditMode(true);
        setEditLogId(logId);
        setEditCallManagementId(callManagementId);
        setActiveForm(formType); // opens popup

        if (formType === "call") {
            const log = data.call_logs.find(x => x.id === logId);
            if (!log) return;

            setCallTypeId(String(log.call_type_id));
            setCallStatusId(String(log.call_status_id));
            setParticularsId(String(log.particulars_id));
            setCommentCallText(log.comments);
            setNextCallDate(toHtmlDate(log.next_call_date));
            setCallDate(toHtmlDate(log.call_date));
        }

        if (formType === "action") {
            const log = data.action_logs.find(x => x.id === logId);
            if (!log) return;

            setActionTodayId(String(log.action_point_id));
            setNextActionCommentId(String(log.next_action_id));
            setCommentActionText(log.comments);
            setnextActionDate(toHtmlDate(log.next_action_date));
            setActionDate(toHtmlDate(log.action_date));
        }

        if (formType === "assign") {
            const log = data.assign_logs.find(x => x.id === logId);
            if (!log) return;

            setAssignTooId(String(log.assigned_to));
            setCommentAssignText(log.notes);
            setAssignDate(toHtmlDate(log.assigned_date));
        }
    };


    const handleCallEditClick = (log: ApiCallLog) => {
        handleEditOpen({
            callManagementId: log.call_management_id,
            logId: log.id,
            formType: "call"
        });
    };

    const handleActionEditClick = (log: ApiActionLog) => {
        handleEditOpen({
            callManagementId: log.call_management_id,
            logId: log.id,
            formType: "action"
        });
    };

    const handleAssignEditClick = (log: ApiAssignLog) => {
        handleEditOpen({
            callManagementId: log.call_management_id,
            logId: log.id,
            formType: "assign"
        });
    };

    // Add this utility function near your other utility functions
    const isToday = (dateString: string): boolean => {
        if (!dateString) return false;
        const today = new Date();
        const checkDate = new Date(dateString);
        return (
            checkDate.getDate() === today.getDate() &&
            checkDate.getMonth() === today.getMonth() &&
            checkDate.getFullYear() === today.getFullYear()
        );
    };

    // const getUsernameById = (userId: number): string => {
    //     const user = userList.find(u => u.id === userId);
    //     return user ? user.username : "Unknown";
    // };

    const LoadingSpinner = () => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8, // Increased vertical padding for visibility
                minHeight: '200px', // Ensure visibility if no data rows exist
                width: '100%',
            }}
        >
            <CircularProgress color="primary" size={30} />
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading data...
            </Typography>
        </Box>
    );

    const handleSelectChange = (
        // Explicitly use the generic form for the value type we expect (string)
        event: SelectChangeEvent<string>,
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => {
        // The value property from the event target is always a string in this Select context
        setState(event.target.value as string);
    };


    const handleCloseDialog = () => {
        setActiveForm("none");
        setIsEditMode(false);
        setEditLogId(null);
        setEditCallManagementId(null);

        // clear fields
        setCallTypeId("");
        setCallStatusId("");
        setParticularsId("");
        setCommentCallText("");
        setNextCallDate("");
        setCallDate("");

        setActionTodayId("");
        setNextActionCommentId("");
        setCommentActionText("");
        setnextActionDate("");
        setActionDate("");

        setAssignTooId("");
        setCommentAssignText("");
        setAssignDate("");
    };


    // Utility function to get today's date in YYYY-MM-DD format for API submission
    const getApiDate = () => new Date().toISOString().split('T')[0];

    // 🚀 UPDATED handleSubmit function 🚀
    const handleSubmit = async () => {
        let isError = false;

        // ⭐️ Validation Check: Check the appropriate comment field based on activeForm
        if (activeForm === 'call' && commentCallText.trim() === '') {
            setCommentCallError(true);
            isError = true;
        } else if (activeForm === 'action' && commentActionText.trim() === '') {
            setCommentActionError(true);
            isError = true;
        } else if (activeForm === 'assign' && commentAssignText.trim() === '') {
            setCommentAssignError(true);
            isError = true;
        }

        if (isError) {
            console.log(`Validation failed for ${activeForm}. Comments required.`);
            return; // Stop submission
        }

        console.log(`Submitting form for: ${activeForm}`);

        let payload: any = {};

        switch (activeForm) {
            case "call":
                payload = {
                    profile_id: profileId,
                    ...(isEditMode && { call_management_id: editCallManagementId }),
                    call_logs: [
                        {
                            ...(isEditMode && { id: editLogId }),
                            call_date: isEditMode ? callDate : getApiDate(),
                            next_call_date: nextCallDate,
                            call_type_id: Number(callTypeId),
                            particulars_id: Number(particularsId),
                            call_status_id: Number(callStatusId),
                            comments: commentCallText,
                            call_owner: callOwnerName,
                        }
                    ]
                };
                break;

            case "action":
                payload = {
                    profile_id: profileId,
                    ...(isEditMode && { call_management_id: editCallManagementId }),
                    action_logs: [
                        {
                            ...(isEditMode && { id: editLogId }),
                            action_date: isEditMode ? actionDate : getApiDate(),
                            action_point_id: Number(actionTodayId) || "",
                            next_action_id: nextActionCommentId || "",
                            next_action_date: nextActionDate,
                            comments: commentActionText,
                            action_owner: ActionOwnerName,
                        }
                    ]
                };
                break;

            case "assign":
                payload = {
                    profile_id: profileId,
                    ...(isEditMode && { call_management_id: editCallManagementId }),
                    assign_logs: [
                        {
                            ...(isEditMode && { id: editLogId }),
                            assigned_date: isEditMode ? assignDate : getApiDate(),
                            assigned_to: assignTooId || 0,
                            assigned_by: 2,
                            notes: commentAssignText,
                        }
                    ]
                };
                break;
        }

        try {
            await apiAxios.post("api/call/save/", payload);

            toast.success(isEditMode ? "Updated Successfully" : "Saved Successfully");

            // reload respective logs
            if (activeForm === "call") fetchCallLogs();
            if (activeForm === "action") fetchActionLogs();
            if (activeForm === "assign") fetchAssignLogs();

            handleCloseDialog();
        } catch (err) {
            console.error(err);
            toast.error("Error saving entry");
        }
    };

    const renderActiveFormContent = () => {
        const labelSx = { fontWeight: 600, mb: 0.75, display: "block" };

        // ⭐️ Input Props now set min date to tomorrow
        const baseInputProps = {
            size: "small" as const,
            InputLabelProps: { shrink: true },
            displayEmpty: true,
        };
        const dateInputProps = {
            ...baseInputProps,
            inputProps: {
                min: tomorrowMinDate,
            }
        };

        switch (activeForm) {
            case 'call':
                return (
                    <>
                        <SectionBadge
                            number={1}
                            title="Call"
                            subtitle="Track call date, type, status and comments for this profile"
                            color="linear-gradient(135deg,#6a11cb,#2575fc)"
                            icon={CallIcon}
                        />
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Date</Typography>
                                {/* <TextField fullWidth disabled value={currentDateString} {...baseInputProps} /> */}
                                <TextField
                                    fullWidth
                                    type={isEditMode ? "date" : "text"}
                                    disabled={isEditMode ? !isToday(callDate) : true}
                                    value={isEditMode ? callDate : currentDateString}
                                    onChange={(e) => setCallDate(e.target.value)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Next Call Date</Typography>
                                <TextField
                                    fullWidth
                                    type="date"
                                    value={nextCallDate}
                                    onChange={(e) => setNextCallDate(e.target.value)}
                                    {...dateInputProps}
                                    id="next_call_date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Type</Typography>
                                <Select
                                    fullWidth
                                    value={callTypeId} // Use ID state
                                    onChange={(e) => handleSelectChange(e, setCallTypeId)} // Use ID setter
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.call_types, 'call_type', 'Select Call Type')}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Status</Typography>
                                <Select
                                    fullWidth
                                    value={callStatusId} // Use ID state
                                    onChange={(e) => handleSelectChange(e, setCallStatusId)} // Use ID setter
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.call_status, 'status', 'Select Call Status')}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Particulars</Typography>
                                <Select
                                    fullWidth
                                    value={particularsId} // Use ID state
                                    onChange={(e) => handleSelectChange(e, setParticularsId)} // Use ID setter
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.particulars, 'particulars', 'Select Particulars')}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Owner</Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={callOwnerName}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={labelSx}>Comments <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    placeholder="Enter comments..."
                                    value={commentCallText}
                                    onChange={(e) => {
                                        setCommentCallText(e.target.value);
                                        if (e.target.value.trim() !== '') setCommentCallError(false);
                                    }}
                                    error={commentCallError}
                                    helperText={commentCallError ? "Comments is required." : ""}
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            case 'action':
                return (
                    <>
                        <SectionBadge
                            number={2}
                            title="Action"
                            subtitle="Record actions taken and next action details"
                            color="linear-gradient(135deg,#ff9966,#ff5e62)"
                            icon={FlashOnIcon}
                        />
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Date</Typography>
                                {/* <TextField fullWidth disabled value={currentDateString} {...baseInputProps} /> */}

                                <TextField
                                    fullWidth
                                    type={isEditMode ? "date" : "text"}
                                    disabled={isEditMode ? !isToday(actionDate) : true}
                                    value={isEditMode ? actionDate : currentDateString}
                                    onChange={(e) => setActionDate(e.target.value)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Action Today</Typography>
                                <Select
                                    fullWidth
                                    value={actionTodayId} // Use ID state
                                    onChange={(e) => handleSelectChange(e, setActionTodayId)} // Use ID setter
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.action_points, 'action_point', 'Select Action Today')}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Next Action Date</Typography>
                                <TextField
                                    fullWidth
                                    type="date"
                                    value={nextActionDate}
                                    onChange={(e) => setnextActionDate(e.target.value)}
                                    {...dateInputProps}
                                    id="next_call_date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Next Action Comments</Typography>
                                <Select
                                    fullWidth
                                    value={nextActionCommentId} // Use ID state
                                    onChange={(e) => handleSelectChange(e, setNextActionCommentId)} // Use ID setter
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.action_points, 'action_point', 'Select Next Action Comments')}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Action Owner</Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={ActionOwnerName}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={labelSx}>Comments (Rich Text) <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Enter detailed action comments..."
                                    value={commentActionText}
                                    onChange={(e) => {
                                        setCommentActionText(e.target.value);
                                        if (e.target.value.trim() !== '') setCommentActionError(false);
                                    }}
                                    error={commentActionError}
                                    helperText={commentActionError ? "Comments field is required." : ""}
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            case 'assign':
                return (
                    <>
                        <SectionBadge
                            number={3}
                            title="Assign"
                            subtitle="Assign ownership and record assignment notes"
                            color="linear-gradient(135deg,#00b09b,#96c93d)"
                            icon={AssignmentIndIcon}
                        />
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Date</Typography>
                                {/* <TextField fullWidth disabled value={currentDateString} {...baseInputProps} /> */}
                                <TextField
                                    fullWidth
                                    type={isEditMode ? "date" : "text"}
                                    disabled={isEditMode ? !isToday(assignDate) : true}
                                    value={isEditMode ? assignDate : currentDateString}
                                    onChange={(e) => setAssignDate(e.target.value)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={labelSx}>Assign Too</Typography>
                                <Select
                                    fullWidth
                                    value={assignTooId}
                                    onChange={(e) => handleSelectChange(e, setAssignTooId)}
                                    {...baseInputProps}
                                >
                                    {userLoading ? (
                                        // Case 1: Loading (returns a single element)
                                        <MenuItem value="" disabled>Loading users...</MenuItem>
                                    ) : (
                                        // Case 2: Data loaded (returns an array of elements)
                                        [ // <--- Start of the array
                                            <MenuItem key="placeholder" value="">Select Assignee</MenuItem>,
                                            ...userList.map((user) => (
                                                <MenuItem
                                                    key={user.id}
                                                    value={String(user.id)}
                                                >
                                                    {user.username}
                                                </MenuItem>
                                            )),
                                        ]
                                    )}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={labelSx}>Assign By</Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={AssignByName}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={labelSx}>Comments <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Assignment notes..."
                                    value={commentAssignText}
                                    onChange={(e) => {
                                        setCommentAssignText(e.target.value);
                                        if (e.target.value.trim() !== '') setCommentAssignError(false);
                                    }}
                                    error={commentAssignError}
                                    helperText={commentAssignError ? "Comments is required." : ""}
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

    // Update Dialog Title based on mode
    const dialogTitle = activeForm === 'call'
        ? (isEditMode ? 'Edit Call' : 'Add New Call')
        : activeForm === 'action'
            ? (isEditMode ? 'Edit Action' : 'Add New Action')
            : activeForm === 'assign'
                ? (isEditMode ? 'Edit Assign Profile Owner' : 'Add Assign Profile Owner')
                : 'New Entry';

    return (
        <div className="p-4">
            <h1 className="text-2xl text-black font-bold mb-4">
                Profile Call Management
            </h1>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                {/* Profile Info */}
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", color: "#333", p: 3, fontSize: "14px", borderBottom: '1px solid #eee' }}>
                    <Typography component="div"><strong>Profile ID:</strong> VM12345</Typography>
                    <Typography component="div"><strong>Profile Owner:</strong> Meena</Typography>
                    <Typography component="div"><strong>Last Call Date:</strong> 12-Feb-2025</Typography>
                    <Typography component="div"><strong>Comments:</strong> Asked documents</Typography>
                    <Typography component="div"><strong>Profile Status:</strong> Active</Typography>
                    <Typography component="div"><strong>Last Action Date:</strong> 12-Feb-2025</Typography>
                    <Typography component="div"><strong>Last Action:</strong> WhatsApp</Typography>
                </Box>

                {/* Action/Button Bar Section */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    p: 3,
                    pb: 2,
                    justifyContent: 'flex-end',
                }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setActiveForm('call');
                            setIsEditMode(false); // Ensure Add mode is set
                            setEditLogId(null);
                        }}
                        startIcon={<CallIcon />}
                        sx={{
                            textTransform: 'none',
                            background: 'linear-gradient(135deg,#6a11cb,#2575fc)',
                            '&:hover': { background: 'linear-gradient(135deg,#5a0fa8,#1c5eb9)' }
                        }}
                    >
                        Add Call
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setActiveForm('action');
                            setIsEditMode(false); // Ensure Add mode is set
                            setEditLogId(null);
                        }}
                        startIcon={<FlashOnIcon />}
                        sx={{
                            textTransform: 'none',
                            background: 'linear-gradient(135deg,#ff9966,#ff5e62)',
                            '&:hover': { background: 'linear-gradient(135deg,#e68a5c,#e65559)' }
                        }}
                    >
                        Add Action
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setActiveForm('assign');
                            setIsEditMode(false); // Ensure Add mode is set
                            setEditLogId(null);
                        }}
                        startIcon={<AssignmentIndIcon />}
                        sx={{
                            textTransform: 'none',
                            background: 'linear-gradient(135deg,#00b09b,#96c93d)',
                            '&:hover': { background: 'linear-gradient(135deg,#009c89,#87b036)' }
                        }}
                    >
                        Add Assign
                    </Button>
                </Box>

                {/* MATERIAL-UI DIALOG/POPUP COMPONENT */}
                <Dialog
                    open={activeForm !== 'none'}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                    disableEscapeKeyDown
                >
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        {dialogTitle}
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDialog}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers sx={{ p: 3 }}>
                        {renderActiveFormContent()}
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        {/* Single set of Save/Cancel buttons for the dialog */}
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#1b5e20" } }}
                        >
                            {isEditMode ? 'UPDATE ENTRY' : 'SAVE ENTRY'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleCloseDialog}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Past Call Logs */}
                <Box sx={{ p: 3, pt: 0 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: 600 }}>
                        Past Interaction Logs
                    </Typography>

                    {/* Tab Bar */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Button
                            variant={activeTab === "call" ? "contained" : "outlined"}
                            onClick={() => setActiveTab("call")}
                            startIcon={<CallIcon />}
                            sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                            Call
                        </Button>
                        <Button
                            variant={activeTab === "action" ? "contained" : "outlined"}
                            onClick={() => setActiveTab("action")}
                            startIcon={<FlashOnIcon />}
                            sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                            Action
                        </Button>
                        <Button
                            variant={activeTab === "assign" ? "contained" : "outlined"}
                            onClick={() => setActiveTab("assign")}
                            startIcon={<AssignmentIndIcon />}
                            sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                            Assign
                        </Button>
                    </Box>

                    {/* Tables (Styling retained from previous response) */}
                    {(activeTab === "call" || activeTab === "all") && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #4CAF50", pl: 1, mb: 1, color: "#4CAF50" }}>📞 <Typography component="span" sx={{ color: "black", fontWeight: 600 }}>
                                Call
                            </Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                                {callLoading ? <LoadingSpinner /> : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Comments</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Status</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Next Call Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Owner</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Profile Owner</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {callLogs.map((log) => (
                                                <TableRow key={log.id} hover sx={{ '& td': { padding: "12px 16px" } }}>
                                                    <TableCell>{formatAPIDate(log.call_date)}</TableCell>
                                                    <TableCell>{log.comments || "N/A"}</TableCell>
                                                    <TableCell>{log.call_status_name || "N/A"}</TableCell>
                                                    <TableCell>{log.next_call_date || "N/A"}</TableCell>
                                                    <TableCell>{log.call_owner || "N/A"}</TableCell>
                                                    <TableCell>{log.profile_owner || "N/A"}</TableCell>
                                                    {/* <TableCell>{formatAPIDate(log.created_at)}</TableCell> */}
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                            <Typography
                                                                component="span"
                                                                sx={{ color: "#1976d2", cursor: "pointer" }}
                                                                onClick={() => handleCallEditClick(log)}
                                                            >
                                                                <GrEdit />
                                                            </Typography>
                                                            <Typography component="span" sx={{ color: "#d32f2f", cursor: "pointer" }}><MdDeleteOutline /></Typography>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </Box>
                    )}
                    {(activeTab === "action" || activeTab === "all") && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #2196F3", pl: 1, mb: 1, color: "#2196F3" }}>⚡<Typography component="span" sx={{ color: "black", fontWeight: 600 }}> Action </Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                                {actionLoading ? <LoadingSpinner /> : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Comments</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Action Today</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Future Action</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Next Action Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {actionLogs.map((log) => (
                                                <TableRow key={log.id} hover sx={{ '& td': { padding: "12px 16px" } }}>
                                                    <TableCell>{formatAPIDate(log.created_at)}</TableCell>
                                                    <TableCell>{log.comments || "N/A"}</TableCell>
                                                    <TableCell>{log.action_point_name || "N/A"}</TableCell>
                                                    <TableCell>{log.next_action_name || "N/A"}</TableCell>
                                                    <TableCell>{formatAPIDate(log.next_action_date) || "N/A"}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                            <Typography
                                                                component="span"
                                                                sx={{ color: "#1976d2", cursor: "pointer" }}
                                                                onClick={() => handleActionEditClick(log)}
                                                            >
                                                                <GrEdit />
                                                            </Typography>
                                                            <Typography component="span" sx={{ color: "#d32f2f", cursor: "pointer" }}><MdDeleteOutline /></Typography>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </Box>
                    )}
                    {(activeTab === "assign" || activeTab === "all") && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #FF9800", pl: 1, mb: 1, color: "#FF9800" }}>👤 <Typography component="span" sx={{ color: "black", fontWeight: 600 }}>Assign</Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                                {assignLoading ? <LoadingSpinner /> : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Comments</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Assigning Owner</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {assignLogs.map((log) => {
                                                // Get usernames based on IDs
                                                // const assignedToUsername = getUsernameById(log.assigned_to);
                                                // const assignedByUsername = getUsernameById(log.assigned_by);

                                                return (
                                                    <TableRow key={log.id} hover sx={{ '& td': { padding: "12px 16px" } }}>
                                                        <TableCell>{formatAPIDate(log.assigned_date)}</TableCell>
                                                        <TableCell>{log.notes || "N/A"}</TableCell>
                                                        <TableCell>
                                                            {log.assigned_by_name  || "N/A"} → {log.assigned_to_name || "N/A"}
                                                        </TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>
                                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{ color: "#1976d2", cursor: "pointer" }}
                                                                    onClick={() => handleAssignEditClick(log)}
                                                                >
                                                                    <GrEdit />
                                                                </Typography>
                                                                <Typography component="span" sx={{ color: "#d32f2f", cursor: "pointer" }}><MdDeleteOutline /></Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </Box>
                    )}
                </Box>
            </Paper>
        </div>
    );
};

export default CallManagementPage;