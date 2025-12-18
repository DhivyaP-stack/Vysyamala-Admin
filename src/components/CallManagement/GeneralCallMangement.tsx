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
    Dialog as ConfirmationDialog,
    DialogTitle as ConfirmationDialogTitle,
    DialogContent as ConfirmationDialogContent,
    DialogActions as ConfirmationDialogActions,
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
    [x: string]: string;
    // id: number;
    // call_management_id: number;
    call_date: string;
    comments: string;
    created_at: string;
    // call_type_id: number;
    // particulars_id: number;
    // call_status_id: number;
    call_type_name: string;
    particulars_name: string;
    call_status_name: string;
    next_call_date: string;
    call_owner: string;
    // profile_owner: String;
    call_owner_name: string;
}

interface CallLogApiResponse {
    profile_id: string;
    call_logs: ApiCallLog[];
}

interface ApiActionLog {
    id: number;
    call_management_id: number;
    action_date: string;
    comments: string;
    created_at: string;
    action_point_id: number;
    next_action_id: string;
    action_point_name: string;
    next_action_name: string;
    action_owner: string;
    next_action_date: string;
    action_owner_name: string;
    call_management__profile_id: string;
    call_management__mobile_no: string;
}

interface ActionLogApiResponse {
    profile_id: string;
    action_logs: ApiActionLog[];
}

interface ApiAssignLog {
    id: number;
    call_management_id: number;
    assigned_date: string;
    assigned_to: number;
    assigned_by: number;
    notes: string;
    created_at: string;
    assigned_to_name: string;
    assigned_by_name: string;
    assign_owner: string;
    assign_too_previous: string;
    assign_too_current: string;
    profile_id: string;
    mobile_no: string;
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
    profile_id: string;
    mobile_no: string;
    call_logs: (ApiCallLog & { profile_owner: string })[];
    action_logs: ApiActionLog[];
    assign_logs: ApiAssignLog[];
}

// Profile Data Interface
interface ProfileData {
    //profile_id: string;
    profile_owner: string;
    last_call_date: string;
    last_call_comments: string;
    profile_status: string;
    last_action_date: string;
    last_action: string;
}

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

const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const isActionAllowed = (createdAt: string, logDate: string, formType: "call" | "action" | "assign"): boolean => {
    if (!createdAt || !logDate) return false;

    try {
        const logDateObj = new Date(logDate);
        const today = new Date();

        // Check if log date is TODAY (exactly today, not within 24 hours)
        const isLogDateToday =
            logDateObj.getDate() === today.getDate() &&
            logDateObj.getMonth() === today.getMonth() &&
            logDateObj.getFullYear() === today.getFullYear();

        return isLogDateToday;
    } catch (error) {
        console.error('Error checking action permission:', error);
        return false;
    }
};

const getTomorrowDateForInput = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

const getUserFromSession = () => {
    try {
        // Get individual properties from sessionStorage
        const userId = localStorage.getItem('id') || sessionStorage.getItem('id');
        const username = localStorage.getItem('username') || sessionStorage.getItem('username');
        const firstName = localStorage.getItem('first_name') || sessionStorage.getItem('first_name');
        const email = localStorage.getItem('email') || sessionStorage.getItem('email');
        const role = localStorage.getItem('role') || sessionStorage.getItem('role');

        if (userId) {
            const user = {
                id: parseInt(userId),
                username: username || '',
                name: firstName || username || '',
                user_name: username || '',
                first_name: firstName || '',
                email: email || '',
                role: role || '',
                user_id: parseInt(userId),
                userId: parseInt(userId)
            };
            console.log('User data from session storage:', user);
            return user;
        }

        console.log('No user ID found in session storage');
        return null;

    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

const GeneralCallManagementPage: React.FC = () => {
    const [activeForm, setActiveForm] = useState<'none' | 'call' | 'action' | 'assign'>('none');
    const [activeTab, setActiveTab] = useState<"call" | "action" | "assign">("call");

    const userData = getUserFromSession();

    // Form States
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
    const [isError, setIsError] = useState(false);

    const [callLogs, setCallLogs] = useState<ApiCallLog[]>([]);
    const [actionLogs, setActionLogs] = useState<ApiActionLog[]>([]);
    const [assignLogs, setAssignLogs] = useState<ApiAssignLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [masterData, setMasterData] = useState<MasterApiResponse | null>(null);
    const [masterLoading, setMasterLoading] = useState(false);

    // Profile Data State
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    // Form States for IDs
    const [callTypeId, setCallTypeId] = useState<string>('');
    const [callStatusId, setCallStatusId] = useState<string>('');
    const [particularsId, setParticularsId] = useState<string>('');
    const [actionTodayId, setActionTodayId] = useState<string>('');
    const [nextActionCommentId, setNextActionCommentId] = useState<string>('');
    const [userList, setUserList] = useState<UserOption[]>([]);
    const [userLoading, setUserLoading] = useState(false);
    const [assignTooId, setAssignTooId] = useState<string>('');

    // User data with better fallback handling
    const callOwnerName = userData?.username || userData?.name || userData?.user_name || userData?.first_name || "Unknown User";
    const ActionOwnerName = userData?.username || userData?.name || userData?.user_name || userData?.first_name || "Unknown User";
    const AssignByName = userData?.username || userData?.name || userData?.user_name || userData?.first_name || "Unknown User";
    const callOwnerId = userData?.id || userData?.user_id || userData?.userId || 0;
    const actionOwnerId = userData?.id || userData?.user_id || userData?.userId || 0;
    const assignById = userData?.id || userData?.user_id || userData?.userId || 0;

    const [nextActionDate, setnextActionDate] = useState<string>("");
    const [nextCallDate, setNextCallDate] = useState<string>("");
    const [editCallManagementId, setEditCallManagementId] = useState<number | null>(null);

    // Edit mode states
    const [isEditMode, setIsEditMode] = useState(false);
    const [editLogId, setEditLogId] = useState<number | null>(null);
    const [callDate, setCallDate] = useState<string>("");
    const [actionDate, setActionDate] = useState<string>("");
    const [assignDate, setAssignDate] = useState<string>("");

    // Delete states
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{
        id: number;
        module: 'call_logs' | 'action_logs' | 'assign_logs';
        callManagementId: number;
        description?: string;
    } | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const profileId = queryParams.get('profileId');
    const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');
    const [profileIdInForm, setProfileIdInForm] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [actionprofileIdInForm, setActionProfileIdInForm] = useState<string>('');
    const [actionphoneNumber, setActionPhoneNumber] = useState<string>('');
    const [assignprofileIdInForm, setAssignProfileIdInForm] = useState<string>('');
    const [assignphoneNumber, setAssignPhoneNumber] = useState<string>('');

    const getRailwayDateTime = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Returns "2025-12-18 14:58:25" (No 'Z' at the end)
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formatTo12Hr = (dateString: string | null) => {
        const date = dateString ? new Date(dateString) : new Date();
        if (isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date).toUpperCase();
    };

    const formatAPIDateAndTime = (dateString: string): string => {
        if (!dateString || dateString === 'N/A') return 'N/A';
        try {
            // Replace space with 'T' if necessary to help Safari/older browsers parse
            const normalizedDate = dateString.includes(' ') ? dateString.replace(' ', 'T') : dateString;
            const date = new Date(normalizedDate);

            if (isNaN(date.getTime())) return 'N/A';

            return new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).format(date); // Will show "18 DEC 2025 02:00 PM"
        } catch (error) {
            return 'N/A';
        }
    };
    
    // Date formatting functions
    const formatAPIDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        try {
            // Handle multiple date formats
            let date: Date;

            if (dateString.includes('T')) {
                // ISO format (2025-11-30T00:00:00)
                date = new Date(dateString);
            } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                // HTML date input format (2025-11-30)
                date = new Date(dateString);
            } else if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
                // DD-MM-YYYY format
                const [day, month, year] = dateString.split('-');
                date = new Date(`${year}-${month}-${day}`);
            } else if (/^\d{2}-[A-Za-z]{3}-\d{4}$/.test(dateString)) {
                // DD-MMM-YYYY format (27-Nov-2025)
                const [day, monthStr, year] = dateString.split('-');
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
                if (monthIndex !== -1) {
                    date = new Date(parseInt(year), monthIndex, parseInt(day));
                } else {
                    date = new Date(dateString);
                }
            } else {
                // Fallback
                date = new Date(dateString);
            }

            if (isNaN(date.getTime())) return 'N/A';

            const day = date.getDate().toString().padStart(2, '0');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'N/A';
        }
    };

    const toHtmlDate = (dateString: string): string => {
        if (!dateString) return '';

        // If it's already in YYYY-MM-DD format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
        }

        // Handle DD-MMM-YYYY format (27-Nov-2025)
        if (/^\d{2}-[A-Za-z]{3}-\d{4}$/.test(dateString)) {
            const [day, monthStr, year] = dateString.split('-');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());

            if (monthIndex !== -1) {
                const month = String(monthIndex + 1).padStart(2, '0');
                return `${year}-${month}-${day.padStart(2, '0')}`;
            }
        }

        // Handle other formats by creating a date object
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const isToday = (dateString: string): boolean => {
        if (!dateString) return false;

        try {
            const today = new Date();
            const checkDate = new Date(dateString);

            return (
                checkDate.getDate() === today.getDate() &&
                checkDate.getMonth() === today.getMonth() &&
                checkDate.getFullYear() === today.getFullYear()
            );
        } catch (error) {
            console.error('Error checking if date is today:', error);
            return false;
        }
    };

    // Debug user data
    useEffect(() => {
        console.log('=== DEBUG USER DATA ===');
        console.log('Full userData:', userData);
        console.log('User ID:', callOwnerId);
        console.log('Username:', callOwnerName);
        console.log('Session storage contents:');
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                console.log(`${key}:`, sessionStorage.getItem(key));
            }
        }
    }, []);

    // Fetch data based on active tab
    const fetchTabData = async () => {
        // if (!profileId) return;

        setLoading(true);
        try {
            let endpoint = '';
            let response;

            switch (activeTab) {
                case "call":
                    endpoint = `api/call-logs_new/`;
                    response = await apiAxios.get<CallLogApiResponse>(endpoint);
                    setCallLogs(response.data.call_logs || []);
                    break;
                case "action":
                    endpoint = `api/action-logs-new/`;
                    response = await apiAxios.get<ActionLogApiResponse>(endpoint);
                    setActionLogs(response.data.action_logs || []);
                    break;
                case "assign":
                    endpoint = `api/assign-logs-new/`;
                    response = await apiAxios.get<AssignLogApiResponse>(endpoint);
                    setAssignLogs(response.data.assign_logs || []);
                    break;
            }

            console.log(`Fetched ${activeTab} data:`, response?.data);

        } catch (error: any) {
            console.error(`Failed to fetch ${activeTab} data:`, error);
            if (error.response) {
                console.error("Response error:", error.response.data);
            }
            toast.error(`Failed to load ${activeTab} logs`);

            // Reset data on error
            switch (activeTab) {
                case "call":
                    setCallLogs([]);
                    break;
                case "action":
                    setActionLogs([]);
                    break;
                case "assign":
                    setAssignLogs([]);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchProfileData = async () => {
        if (!profileId) return;
        setLoading(true);
        try {
            const response = await apiAxios.get<any>(
                `api/logs/${profileId}`
            );

            // Extract all data from the API response
            const callLogs = response.data.call_logs || [];
            const actionLogs = response.data.action_logs || [];
            const assignLogs = response.data.assign_logs || [];

            // Get the FIRST record from each array (most recently added - index 0)
            const lastCall = callLogs.length > 0 ? callLogs[0] : null;
            const lastAction = actionLogs.length > 0 ? actionLogs[0] : null;
            const lastAssignment = assignLogs.length > 0 ? assignLogs[0] : null;

            // Debug logs to check what we're getting from FIRST records
            console.log('=== FIRST RECORDS DEBUG ===');
            console.log('All Call Logs:', callLogs.map((log: { id: any; call_date: any; }) => ({ id: log.id, date: log.call_date })));
            console.log('First Call (Last):', lastCall);
            console.log('All Action Logs:', actionLogs.map((log: { id: any; action_date: any; }) => ({ id: log.id, date: log.action_date })));
            console.log('First Action (Last):', lastAction);
            console.log('All Assign Logs:', assignLogs.map((log: { id: any; assigned_date: any; }) => ({ id: log.id, date: log.assigned_date })));
            console.log('First Assignment (Last):', lastAssignment);
            console.log('API Response owner_name:', response.data.owner_name);
            console.log('API Response status_name:', response.data.status_name);

            // Map the data according to your requirements - using FIRST records (most recent)
            const profileData: ProfileData = {
                //profile_id: response.data.profile_id || profileId || "N/A",
                profile_owner: response.data.owner_name || lastAssignment?.assigned_to_name || "N/A",
                last_call_date: lastCall?.call_date || "N/A",
                last_call_comments: lastCall?.comments || "N/A",
                profile_status: response.data.status_name || lastCall?.call_status_name || "N/A",
                last_action_date: lastAction?.action_date || "N/A",
                last_action: lastAction?.action_point_name || "N/A"
            };

            console.log('=== FINAL PROFILE DATA (Using First Records) ===');
            console.log('Profile Data:', profileData);

            setProfileData(profileData);

        } catch (error: any) {
            console.error("Failed to fetch profile data:", error);
            if (error.response) {
                console.error("Response error:", error.response.data);
            }
            toast.error("Failed to load profile information");
        } finally {
            // Set loading state OFF when fetch completes (success or failure)
            setLoading(false);
        }
    };

    const fetchMasterData = async () => {
        setMasterLoading(true);
        const apiUrl = "api/callmanage-masters/";
        try {
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
            const response = await apiAxios.get<UserOption[]>(apiUrl);
            setUserList(response.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setUserLoading(false);
        }
    };

    // Fetch data when tab changes
    useEffect(() => {
        fetchTabData();
    }, [activeTab, profileId]);

    // Fetch initial data
    useEffect(() => {
        fetchProfileData();
        fetchMasterData();
        fetchUsers();

        // Fetch initial call logs data
        if (profileId) {
            fetchTabData();
        }
    }, [profileId]);

    const handleTabChange = (tab: "call" | "action" | "assign") => {
        setActiveTab(tab);
        // Data will be fetched automatically by the useEffect above
    };

    const renderMenuItems = (
        data: MasterDataOption[] | undefined,
        keyName: 'call_type' | 'status' | 'particulars' | 'action_point',
        placeholder: string
    ) => {
        if (!data) return <MenuItem value="">Loading...</MenuItem>;

        return [
            <MenuItem key="placeholder" value="" disabled>{placeholder}</MenuItem>,
            ...data.map((item) => (
                <MenuItem key={item.id} value={String(item.id)}>
                    {item[keyName] as string}
                </MenuItem>
            )),
        ];
    };

    const fetchLogDetails = async (id: number) => {
        try {
            const response = await apiAxios.get<DetailedLogApiResponse>(
                `api/call-details-new/${id}/`
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
        setActiveForm(formType);

        if (formType === "call") {
            setProfileIdInForm(data.profile_id);
            setPhoneNumber(data.mobile_no);
        } else if (formType === "action") {
            setActionProfileIdInForm(data.profile_id);
            setActionPhoneNumber(data.mobile_no);
        } else if (formType === "assign") {
            setAssignProfileIdInForm(data.profile_id);
            setAssignPhoneNumber(data.mobile_no);
        }

        if (formType === "call") {
            const log = data.call_logs.find(x => Number(x.id) === logId);
            if (!log) return;

            console.log('Call log raw dates:', {
                call_date: log.call_date,
                next_call_date: log.next_call_date,
                converted_call_date: toHtmlDate(log.call_date),
                converted_next_call_date: toHtmlDate(log.next_call_date)
            });

            setCallTypeId(String(log.call_type_id));
            setCallStatusId(String(log.call_status_id));
            setParticularsId(String(log.particulars_id));
            setCommentCallText(log.comments);
            setNextCallDate(toHtmlDate(log.next_call_date));
            setCallDate(log.call_date);
        }

        if (formType === "action") {
            const log = data.action_logs.find(x => x.id === logId);
            if (!log) return;

            console.log('Action log raw dates:', {
                action_date: log.action_date,
                next_action_date: log.next_action_date,
                converted_action_date: toHtmlDate(log.action_date),
                converted_next_action_date: toHtmlDate(log.next_action_date)
            });

            setActionTodayId(String(log.action_point_id));
            setNextActionCommentId(String(log.next_action_id));
            setCommentActionText(log.comments);
            setnextActionDate(toHtmlDate(log.next_action_date));
            setActionDate(log.action_date);
        }

        if (formType === "assign") {
            const log = data.assign_logs.find(x => x.id === logId);
            if (!log) return;

            console.log('Assign log raw dates:', {
                assigned_date: log.assigned_date,
                converted_assigned_date: toHtmlDate(log.assigned_date),
            });

            setAssignTooId(String(log.assigned_to));
            setCommentAssignText(log.notes);
            setAssignDate(log.assigned_date);
        }
    };

    const handleCallEditClick = (log: ApiCallLog) => {
        if (!isActionAllowed(log.created_at, log.call_date, "call")) {
            toast.info("Edit option is only available for records created within the last 24 hours or with today's date");
            return;
        }
        handleEditOpen({
            callManagementId: Number(log.call_management_id),
            logId: Number(log.id),
            formType: "call"
        });
    };

    const handleActionEditClick = (log: ApiActionLog) => {
        if (!isActionAllowed(log.created_at, log.action_date, "action")) {
            toast.info("Edit option is only available for records created within the last 24 hours or with today's date");
            return;
        }
        handleEditOpen({
            callManagementId: log.call_management_id,
            logId: log.id,
            formType: "action"
        });
    };

    const handleAssignEditClick = (log: ApiAssignLog) => {
        if (!isActionAllowed(log.created_at, log.assigned_date, "assign")) {
            toast.info("Edit option is only available for records created within the last 24 hours or with today's date");
            return;
        }
        handleEditOpen({
            callManagementId: log.call_management_id,
            logId: log.id,
            formType: "assign"
        });
    };

    // Delete handler functions
    const handleDeleteClick = (
        id: number,
        callManagementId: number,
        module: 'call_logs' | 'action_logs' | 'assign_logs',
        description?: string
    ) => {
        const log = module === 'call_logs'
            ? callLogs.find(x => Number(x.id) === id)
            : module === 'action_logs'
                ? actionLogs.find(x => x.id === id)
                : assignLogs.find(x => x.id === id);

        if (log) {
            let logDate = '';
            if (module === 'call_logs') logDate = (log as ApiCallLog).call_date;
            if (module === 'action_logs') logDate = (log as ApiActionLog).action_date;
            if (module === 'assign_logs') logDate = (log as ApiAssignLog).assigned_date;

            if (!isActionAllowed(log.created_at, logDate, module.replace('_logs', '') as any)) {
                toast.info("Delete option is only available for records created within the last 24 hours or with today's date");
                return;
            }
        }

        setItemToDelete({ id, module, callManagementId, description });
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete || !userData) {
            toast.error("Unable to delete: Missing data");
            return;
        }

        setDeleteLoading(true);
        try {
            const payload = {
                delete_module: itemToDelete.module,
                call_id: itemToDelete.id,
                deleted_by: userData.id || userData.user_id || userData.userId,
                admin_user_id: adminUserID,
            };

            await apiAxios.post("api/call_manage_new-delete/", payload);

            toast.success("Record deleted successfully");

            // Refresh the current tab data
            fetchTabData();

            setDeleteDialogOpen(false);
            setItemToDelete(null);
        } catch (error: any) {
            console.error("Delete error:", error);
            toast.error(error.response?.data?.message || "Failed to delete record");
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const LoadingSpinner = () => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8,
                minHeight: '200px',
                width: '100%',
            }}
        >
            <CircularProgress color="primary" size={30} />
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading {activeTab} logs...
            </Typography>
        </Box>
    );

    // const handleSelectChange = (
    //     event: SelectChangeEvent<string>,
    //     setState: React.Dispatch<React.SetStateAction<string>>
    // ) => {
    //     setState(event.target.value as string);
    // };


    const handleSelectChange = (
        event: SelectChangeEvent<string>,
        setState: React.Dispatch<React.SetStateAction<string>>,
        // Added a specific handler name parameter
        fieldName?: 'callStatus'
    ) => {
        const newValue = event.target.value as string;
        setState(newValue);

        // 🔥 NEW LOGIC: Check if the state being updated is callStatusId
        if (fieldName === 'callStatus') {
            const newNextCallDate = calculateNextCallDate(newValue);
            setNextCallDate(newNextCallDate);
        }
    };

    const handleCloseDialog = () => {
        setActiveForm("none");
        setIsEditMode(false);
        setEditLogId(null);
        setEditCallManagementId(null);
        setIsError(false);

        // Clear fields
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
        setProfileIdInForm('');
        setPhoneNumber('');
        setActionProfileIdInForm('');
        setActionPhoneNumber('');
        setAssignProfileIdInForm('');
        setAssignPhoneNumber('');
    };

    const getApiDate = (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDateForAPI = (dateString: string): string => {
        if (!dateString) return '';

        try {
            // If it's already in YYYY-MM-DD format, return as is
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                return dateString;
            }

            // If it contains time (ISO format), extract only date part
            if (dateString.includes('T')) {
                return dateString.split('T')[0];
            }

            // For other formats, create date object and format
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        } catch (error) {
            console.error('Error formatting date for API:', error);
            return '';
        }
    };

    const calculateNextCallDate = (statusId: string): string => {
        if (!statusId) return '';

        let daysToAdd = 0;
        const numericStatusId = Number(statusId);

        // Logic based on the user's requirements:
        switch (numericStatusId) {
            case 1: // If call status ID 1 is selected, set the next call date after 3 days.
                daysToAdd = 3;
                break;
            case 2: // If call status ID 2 is selected, set the next call date after 7 days.
                daysToAdd = 7;
                break;
            case 3: // If call status ID 3 is selected, set the next call date after 30 days.
                daysToAdd = 30;
                break;
            default:
                daysToAdd = 0; // Default: no date set or next day, adjust as needed
                break;
        }

        if (daysToAdd > 0) {
            const today = new Date();
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + daysToAdd);

            // Format to YYYY-MM-DD for the HTML date input
            const year = nextDate.getFullYear();
            const month = String(nextDate.getMonth() + 1).padStart(2, '0');
            const day = String(nextDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        return '';
    };

    const handleSubmit = async () => {
        // Check if we have valid user data
        if (!userData || !userData.id) {
            toast.error("User authentication required. Please log in again.");
            return;
        }

        let isError = false;
        setIsError(false);

        // Required field validation for Call form
        if (activeForm === 'call') {
            if (!callTypeId) {
                toast.error("Call Type is required.");
                isError = true;
                setIsError(true);
            }
            if (!callStatusId) {
                toast.error("Call Status is required.");
                isError = true;
                setIsError(true);
            }
            if (commentCallText.trim() === '') {
                setCommentCallError(true);
                isError = true;
                setIsError(true);
                toast.error("Call comments is required.");
            }
            if (commentCallText.length > 256) {
                setCommentCallError(true);
                isError = true;
                setIsError(true);
                toast.error("Call comments cannot exceed 256 characters.");
            }
            if (!particularsId) {
                toast.error("Particulars is required.");
                isError = true;
                setIsError(true);
            }

        }

        // Validation for other forms
        if (activeForm === 'action' && commentActionText.length > 256) {
            setCommentActionError(true);
            isError = true;
            setIsError(true);
            toast.error("Action comments cannot exceed 256 characters.");
        }
        if (activeForm === 'assign' && commentAssignText.length > 256) {
            setCommentAssignError(true);
            isError = true;
            setIsError(true);
            toast.error("Assign comments cannot exceed 256 characters.");
        }

        if (activeForm === 'action' && commentActionText.trim() === '') {
            setCommentActionError(true);
            isError = true;
            setIsError(true);
            toast.error("Action comments are required.");
        } else if (activeForm === 'assign' && commentAssignText.trim() === '') {
            setCommentAssignError(true);
            isError = true;
            setIsError(true);
            toast.error("Assign comments are required.");
        }

        if (isError) {
            console.log(`Validation failed for ${activeForm}.`);
            return;
        }

        console.log(`Submitting form for: ${activeForm}`);
        console.log('User submitting:', {
            username: callOwnerName,
            userId: callOwnerId,
            userData: userData
        });

        let payload: any = { admin_user_id: adminUserID };

        // Date formatting functions
        const getApiDate = (): string => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const formatDateForAPI = (dateString: string): string => {
            if (!dateString) return '';

            try {
                // If it's already in YYYY-MM-DD format, return as is
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                    return dateString;
                }

                // If it contains time (ISO format), extract only date part
                if (dateString.includes('T')) {
                    return dateString.split('T')[0];
                }

                // For other formats, create date object and format
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return '';

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');

                return `${year}-${month}-${day}`;
            } catch (error) {
                console.error('Error formatting date for API:', error);
                return '';
            }
        };

        // Debug logging for dates
        console.log('=== DATE FORMAT VERIFICATION ===');
        console.log('Active form:', activeForm);
        console.log('Is edit mode:', isEditMode);
        const currentRailwayTime = getRailwayDateTime();

        switch (activeForm) {
            case "call":
                console.log('Call date:', {
                    original: isEditMode ? callDate : 'current date',
                    formatted: isEditMode ? formatDateForAPI(callDate) : getApiDate()
                });
                console.log('Next call date:', {
                    original: nextCallDate,
                    formatted: formatDateForAPI(nextCallDate)
                });

                payload = {
                    //  profile_id: profileId,
                    profile_id: profileIdInForm,
                    mobile_no: phoneNumber,
                    ...(isEditMode && { call_management_id: editCallManagementId }),
                    call_logs: [
                        {
                            ...(isEditMode && { id: editLogId }),
                            call_date: currentRailwayTime,
                            next_call_date: formatDateForAPI(nextCallDate),
                            call_type_id: Number(callTypeId) || "",
                            particulars_id: Number(particularsId) || "",
                            call_status_id: Number(callStatusId) || "",
                            comments: commentCallText,
                            call_owner: callOwnerId,
                            admin_user_id: adminUserID,
                        }
                    ]
                };
                break;

            case "action":
                console.log('Action date:', {
                    original: isEditMode ? actionDate : 'current date',
                    formatted: isEditMode ? formatDateForAPI(actionDate) : getApiDate()
                });
                console.log('Action IDs:', {
                    actionTodayId: actionTodayId,
                    nextActionCommentId: nextActionCommentId
                });

                payload = {
                    //profile_id: profileId,
                    profile_id: actionprofileIdInForm,
                    mobile_no: actionphoneNumber,
                    ...(isEditMode && { call_management_id: editCallManagementId }),
                    action_logs: [
                        {
                            ...(isEditMode && { id: editLogId }),
                            action_date: currentRailwayTime,
                            action_point_id: Number(actionTodayId) || "",

                            next_action_id: nextActionCommentId === "null" ? "" : nextActionCommentId || "",
                            next_action_date: formatDateForAPI(nextActionDate),
                            comments: commentActionText,
                            action_owner: actionOwnerId,
                            admin_user_id: adminUserID,
                        }
                    ]
                };
                break;
            case "assign":
                console.log('Assign date:', {
                    original: isEditMode ? assignDate : 'current date',
                    formatted: isEditMode ? formatDateForAPI(assignDate) : getApiDate()
                });

                payload = {
                    //profile_id: profileId,
                    profile_id: assignprofileIdInForm,
                    mobile_no: assignphoneNumber,
                    ...(isEditMode && { call_management_id: editCallManagementId }),
                    assign_logs: [
                        {
                            ...(isEditMode && { id: editLogId }),
                            assigned_date: currentRailwayTime,
                            assigned_to: assignTooId || 0,
                            assigned_by: assignById,
                            notes: commentAssignText,
                            admin_user_id: adminUserID,
                        }
                    ]
                };
                break;
        }

        console.log('Final payload:', JSON.stringify(payload, null, 2));
        console.log('Payload dates verification:', {
            call_date: payload.call_logs?.[0]?.call_date,
            action_date: payload.action_logs?.[0]?.action_date,
            assigned_date: payload.assign_logs?.[0]?.assigned_date
        });

        try {
            setLoading(true);

            const response = await apiAxios.post("api/call_new/save/", payload);

            // Check if the response contains the specific error message
            if (response.data && response.data.status === "failed") {
                toast.error(response.data.message || "Update failed. Edit time limit may have expired.");
                return;
            }

            toast.success(isEditMode ? "Updated Successfully" : "Saved Successfully");

            // Refresh the current tab data and profile data
            fetchTabData();
            fetchProfileData();

            handleCloseDialog();
        } catch (err: any) {
            console.error("Submission error:", err);

            if (err.response?.data?.status === "failed") {
                toast.error(err.response.data.message || "You cannot update this record. Edit time limit (24 hours) has expired.");
            } else {
                toast.error(err.response?.data?.message || "Error saving entry");
            }
        } finally {
            setLoading(false);
        }
    };

    const renderActiveFormContent = () => {
        const labelSx = { fontWeight: 600, mb: 0.75, display: "block" };

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
                                <Typography sx={labelSx}>Date & Time</Typography>
                                <TextField
                                    fullWidth
                                    type="text"
                                    disabled={true}
                                    // value={isEditMode ? formatAPIDate(callDate) : currentDateString}
                                    value={isEditMode ? formatTo12Hr(callDate) : formatTo12Hr(null)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Type <span className='text-red-500'>*</span></Typography>
                                <Select
                                    fullWidth
                                    value={callTypeId}
                                    onChange={(e) => handleSelectChange(e, setCallTypeId)}
                                    error={!callTypeId && isError}
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.call_types, 'call_type', 'Select Call Type')}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Status <span className='text-red-500'>*</span></Typography>
                                <Select
                                    fullWidth
                                    value={callStatusId}
                                    onChange={(e) => handleSelectChange(e, setCallStatusId, 'callStatus')}
                                    error={!callStatusId && isError}
                                    {...baseInputProps}
                                >
                                    {renderMenuItems(masterData?.call_status, 'status', 'Select Call Status')}
                                </Select>
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
                                <Typography sx={labelSx}>Particulars <span className='text-red-500'>*</span></Typography>
                                <Select
                                    fullWidth
                                    value={particularsId}
                                    onChange={(e) => handleSelectChange(e, setParticularsId)}
                                    error={!particularsId && isError}
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
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Profile ID</Typography>
                                <TextField
                                    fullWidth
                                    value={profileIdInForm}
                                    onChange={(e) => setProfileIdInForm(e.target.value)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Phone Number</Typography>
                                <TextField
                                    fullWidth
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/\D/g, '').slice(0, 15);
                                        setPhoneNumber(cleanedValue);
                                    }}
                                    // placeholder="Enter Phone Number"
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                                    <Typography sx={labelSx}>Comments <span className='text-red-500'>*</span></Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: commentCallText.length > 256 ? 'error.main' : 'text.secondary',
                                            fontWeight: commentCallText.length > 256 ? 600 : 400
                                        }}
                                    >
                                        {commentCallText.length}/256
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    placeholder="Enter comments..."
                                    value={commentCallText}
                                    onChange={(e) => {
                                        const newValue = e.target.value.slice(0, 256);
                                        setCommentCallText(newValue);
                                        if (newValue.trim() !== '') setCommentCallError(false);
                                    }}
                                    error={commentCallError || commentCallText.length > 256}
                                    helperText={
                                        commentCallError
                                            ? "Comments is required."
                                            : commentCallText.length > 256
                                                ? "Maximum 256 characters allowed."
                                                : ""
                                    }
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
                                <Typography sx={labelSx}>Date & Time</Typography>
                                <TextField
                                    fullWidth
                                    type="text"
                                    disabled={true}
                                    value={isEditMode ? formatTo12Hr(actionDate) : formatTo12Hr(null)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Action Today</Typography>
                                <Select
                                    fullWidth
                                    value={actionTodayId}
                                    onChange={(e) => handleSelectChange(e, setActionTodayId)}
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
                                    value={nextActionCommentId}
                                    onChange={(e) => handleSelectChange(e, setNextActionCommentId)}
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
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Profile ID</Typography>
                                <TextField
                                    fullWidth
                                    value={actionprofileIdInForm}
                                    onChange={(e) => setActionProfileIdInForm(e.target.value)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Phone Number</Typography>
                                <TextField
                                    fullWidth
                                    type="tel" // Use tel for appropriate mobile keyboard
                                    value={actionphoneNumber}
                                    onChange={(e) => {
                                        // Allow only digits
                                        const cleanedValue = e.target.value.replace(/\D/g, '').slice(0, 15);
                                        setActionPhoneNumber(cleanedValue);
                                    }}
                                    //placeholder="Enter Phone Number"
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                                    <Typography sx={labelSx}>Comments (Rich Text) <span className='text-red-500'>*</span></Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: commentActionText.length > 256 ? 'error.main' : 'text.secondary',
                                            fontWeight: commentActionText.length > 256 ? 600 : 400
                                        }}
                                    >
                                        {commentActionText.length}/256
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Enter detailed action comments..."
                                    value={commentActionText}
                                    onChange={(e) => {
                                        const newValue = e.target.value.slice(0, 256);
                                        setCommentActionText(newValue);
                                        if (newValue.trim() !== '') setCommentActionError(false);
                                    }}
                                    error={commentActionError || commentActionText.length > 256}
                                    helperText={
                                        commentActionError
                                            ? "Comments field is required."
                                            : commentActionText.length > 256
                                                ? "Maximum 256 characters allowed."
                                                : ""
                                    }
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
                                <Typography sx={labelSx}>Date & Time</Typography>
                                <TextField
                                    fullWidth
                                    type="text"
                                    disabled={true}
                                    value={isEditMode ? formatTo12Hr(assignDate) : formatTo12Hr(null)}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Assign To</Typography>
                                <Select
                                    fullWidth
                                    value={assignTooId}
                                    onChange={(e) => handleSelectChange(e, setAssignTooId)}
                                    {...baseInputProps}
                                >
                                    {userLoading ? (
                                        <MenuItem value="" disabled>Loading users...</MenuItem>
                                    ) : (
                                        [
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
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Assign By</Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={AssignByName}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Profile ID</Typography>
                                <TextField
                                    fullWidth
                                    onChange={(e) => setAssignProfileIdInForm(e.target.value)}
                                    value={assignprofileIdInForm}
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Phone Number</Typography>
                                <TextField
                                    fullWidth
                                    type="tel" // Use tel for appropriate mobile keyboard
                                    value={assignphoneNumber}
                                    onChange={(e) => {
                                        // Allow only digits
                                        const cleanedValue = e.target.value.replace(/\D/g, '').slice(0, 15);
                                        setAssignPhoneNumber(cleanedValue);
                                    }}
                                    //placeholder="Enter Phone Number"
                                    {...baseInputProps}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                                    <Typography sx={labelSx}>Comments <span className='text-red-500'>*</span></Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: commentAssignText.length > 256 ? 'error.main' : 'text.secondary',
                                            fontWeight: commentAssignText.length > 256 ? 600 : 400
                                        }}
                                    >
                                        {commentAssignText.length}/256
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Assignment notes..."
                                    value={commentAssignText}
                                    onChange={(e) => {
                                        const newValue = e.target.value.slice(0, 256);
                                        setCommentAssignText(newValue);
                                        if (newValue.trim() !== '') setCommentAssignError(false);
                                    }}
                                    error={commentAssignError || commentAssignText.length > 256}
                                    helperText={
                                        commentAssignError
                                            ? "Comments is required."
                                            : commentAssignText.length > 256
                                                ? "Maximum 256 characters allowed."
                                                : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                    </>
                );
            default:
                return null;
        }
    };

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
                General Call Management
            </h1>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                {/* Dynamic Profile Data Section */}
                {/* <Box sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    color: "#333",
                    p: 3,
                    fontSize: "14px",
                    borderBottom: '1px solid #eee',
                    minHeight: '60px',
                    alignItems: 'center'
                }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={20} />
                            <Typography>Loading profile data...</Typography>
                        </Box>
                    ) : profileData ? (
                        <>
                            <Typography component="div">
                                <strong>Profile ID:</strong> {profileData.profile_id || "N/A"}
                            </Typography>
                            <Typography component="div">
                                <strong>Profile Owner:</strong> {profileData.profile_owner || "N/A"}
                            </Typography>
                            <Typography component="div">
                                <strong>Last Call Date:</strong> {profileData.last_call_date ? formatAPIDate(profileData.last_call_date) : "N/A"}
                            </Typography>
                            <Typography component="div">
                                <strong>Comments:</strong> {profileData.last_call_comments || "N/A"}
                            </Typography>
                            <Typography component="div">
                                <strong>Profile Status:</strong> {profileData.profile_status || "N/A"}
                            </Typography>
                            <Typography component="div">
                                <strong>Last Action Date:</strong> {profileData.last_action_date ? formatAPIDate(profileData.last_action_date) : "N/A"}
                            </Typography>
                            <Typography component="div">
                                <strong>Last Action:</strong> {profileData.last_action || "N/A"}
                            </Typography>
                        </>
                    ) : null}
                </Box> */}


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
                            setIsEditMode(false);
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
                            setIsEditMode(false);
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
                            setIsEditMode(false);
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


                <Box sx={{ p: 3, pt: 0 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontSize: "1.25rem", fontWeight: 600 }}>
                        Past Interaction Logs
                    </Typography>


                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <Button
                            variant={activeTab === "call" ? "contained" : "outlined"}
                            onClick={() => handleTabChange("call")}
                            startIcon={<CallIcon />}
                            sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                            Call
                        </Button>
                        <Button
                            variant={activeTab === "action" ? "contained" : "outlined"}
                            onClick={() => handleTabChange("action")}
                            startIcon={<FlashOnIcon />}
                            sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                            Action
                        </Button>
                        <Button
                            variant={activeTab === "assign" ? "contained" : "outlined"}
                            onClick={() => handleTabChange("assign")}
                            startIcon={<AssignmentIndIcon />}
                            sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                            Assign
                        </Button>
                    </Box>


                    {activeTab === "call" && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #4CAF50", pl: 1, mb: 1, color: "#4CAF50" }}>📞 <Typography component="span" sx={{ color: "black", fontWeight: 600 }}>
                                Call
                            </Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                                {loading ? <LoadingSpinner /> : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Date & Time</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Comments</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Type</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Status</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Next Call Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Particulars</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Owner</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Profile ID</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Phone No</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {callLogs.map((log) => (
                                                <TableRow key={log.id} hover sx={{ '& td': { padding: "12px 16px" } }}>
                                                    <TableCell> {formatAPIDateAndTime(log.call_date)}</TableCell>
                                                    <TableCell>{log.comments || "N/A"}</TableCell>
                                                    <TableCell>{log.call_type_name || "N/A"}</TableCell>
                                                    <TableCell>{log.call_status_name || "N/A"}</TableCell>
                                                    <TableCell>{formatAPIDate(log.next_call_date) || "N/A"}</TableCell>
                                                    <TableCell>{log.particulars_name || "N/A"}</TableCell>
                                                    <TableCell>{log.call_owner_name || "N/A"}</TableCell>
                                                    <TableCell>{log.call_management__profile_id || "N/A"}</TableCell>
                                                    <TableCell>{log.call_management__mobile_no || "N/A"}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        {isActionAllowed(log.created_at, log.call_date, "call") && (
                                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{
                                                                        color: "#1976d2",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => handleCallEditClick(log)}
                                                                >
                                                                    <GrEdit />
                                                                </Typography>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{
                                                                        color: "#d32f2f",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => handleDeleteClick(Number(log.id), Number(log.call_management_id), 'call_logs', `Call from ${formatAPIDate(log.call_date)}`)}
                                                                >
                                                                    <MdDeleteOutline />
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </Box>
                    )}
                    {activeTab === "action" && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #2196F3", pl: 1, mb: 1, color: "#2196F3" }}>⚡<Typography component="span" sx={{ color: "black", fontWeight: 600 }}> Action </Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                                {loading ? <LoadingSpinner /> : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Date & Time</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Comments</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Call Action Today</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Future Action</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Next Action Date</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Action Owner</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Profile ID</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Phone No</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {actionLogs.map((log) => (
                                                <TableRow key={log.id} hover sx={{ '& td': { padding: "12px 16px" } }}>
                                                    <TableCell> {formatAPIDateAndTime(log.action_date)}</TableCell>
                                                    <TableCell>{log.comments || "N/A"}</TableCell>
                                                    <TableCell>{log.action_point_name || "N/A"}</TableCell>
                                                    <TableCell>{log.next_action_name || "N/A"}</TableCell>
                                                    <TableCell>{formatAPIDate(log.next_action_date) || "N/A"}</TableCell>
                                                    <TableCell>{log.action_owner_name || "N/A"}</TableCell>
                                                    <TableCell>{log.call_management__profile_id || "N/A"}</TableCell>
                                                    <TableCell>{log.call_management__mobile_no || "N/A"}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        {isActionAllowed(log.created_at, log.action_date, "action") && (
                                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{
                                                                        color: "#1976d2",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => handleActionEditClick(log)}
                                                                >
                                                                    <GrEdit />
                                                                </Typography>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{
                                                                        color: "#d32f2f",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => handleDeleteClick(log.id, log.call_management_id, 'action_logs', `Action from ${formatAPIDate(log.action_date)}`)}
                                                                >
                                                                    <MdDeleteOutline />
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </Box>
                    )}
                    {activeTab === "assign" && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #FF9800", pl: 1, mb: 1, color: "#FF9800" }}>👤 <Typography component="span" sx={{ color: "black", fontWeight: 600 }}>Assign</Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                                {loading ? <LoadingSpinner /> : (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Date & Time</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Comments</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Assigning Owner</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Profile ID</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626' }}>Phone No</TableCell>
                                                <TableCell sx={{ backgroundColor: '#FFF9C9', borderBottom: '1px solid #E0E0E0', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {assignLogs.map((log) => {
                                                return (
                                                    <TableRow key={log.id} hover sx={{ '& td': { padding: "12px 16px" } }}>
                                                        <TableCell> {formatAPIDateAndTime(log.assigned_date)}</TableCell>
                                                        <TableCell>{log.notes || "N/A"}</TableCell>
                                                        <TableCell>
                                                            {log.assigned_by_name || "N/A"} → {log.assigned_to_name || "N/A"}
                                                        </TableCell>
                                                        <TableCell>{log.profile_id || "N/A"}</TableCell>
                                                        <TableCell>{log.mobile_no || "N/A"}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center' }}>
                                                            {isActionAllowed(log.created_at, log.assigned_date, "assign") && (
                                                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{
                                                                            color: "#1976d2",
                                                                            cursor: "pointer"
                                                                        }}
                                                                        onClick={() => handleAssignEditClick(log)}
                                                                    >
                                                                        <GrEdit />
                                                                    </Typography>
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{
                                                                            color: "#d32f2f",
                                                                            cursor: "pointer"
                                                                        }}
                                                                        onClick={() => handleDeleteClick(log.id, log.call_management_id, 'assign_logs', `Assignment from ${formatAPIDate(log.assigned_date)}`)}
                                                                    >
                                                                        <MdDeleteOutline />
                                                                    </Typography>
                                                                </Box>
                                                            )}
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

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                maxWidth="sm"
                fullWidth
            >
                <ConfirmationDialogTitle>
                    Confirm Delete
                    <IconButton
                        aria-label="close"
                        onClick={handleDeleteCancel}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </ConfirmationDialogTitle>
                <ConfirmationDialogContent>
                    <Typography>
                        Are you sure you want to delete {itemToDelete?.description || "this record"}?
                        This action cannot be undone.
                    </Typography>
                </ConfirmationDialogContent>
                <ConfirmationDialogActions>
                    <Button
                        onClick={handleDeleteCancel}
                        disabled={deleteLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={deleteLoading}
                        startIcon={deleteLoading ? <CircularProgress size={16} /> : null}
                    >
                        {deleteLoading ? "Deleting..." : "Delete"}
                    </Button>
                </ConfirmationDialogActions>
            </ConfirmationDialog>
        </div>
    );
};

export default GeneralCallManagementPage;