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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { MdDeleteOutline } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

// --- Mock Data Interfaces (omitted for brevity) ---
interface CallLog { date: string; comments: string; callStatus: string; nextCallDate: string; callOwner: string; profileOwner: string; }
interface ActionLog { date: string; comments: string; callActionToday: string; futureAction: string; nextActionDate: string; }
interface AssignLog { date: string; comments: string; assigningOwner: string; }

const mockCallLogs: CallLog[] = [{ date: "12-Feb-2025", comments: "Asked documents", callStatus: "Hot", nextCallDate: "15-Feb-2025", callOwner: "Meena", profileOwner: "Meena", },];
const mockActionLogs: ActionLog[] = [{ date: "12-Feb-2025", comments: "Asked documents", callActionToday: "WhatsApp", futureAction: "Follow-up", nextActionDate: "16-Feb-2025", },];
const mockAssignLogs: AssignLog[] = [{ date: "12-Feb-2025", comments: "Reassigned", assigningOwner: "Meena → Admin", },];
// --- End Mock Data Interfaces ---

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

    // ⭐️ Separate Comment States
    const [commentCallText, setCommentCallText] = useState('');
    const [commentActionText, setCommentActionText] = useState('');
    const [commentAssignText, setCommentAssignText] = useState('');

    // ⭐️ Separate Error States
    const [commentCallError, setCommentCallError] = useState(false);
    const [commentActionError, setCommentActionError] = useState(false);
    const [commentAssignError, setCommentAssignError] = useState(false);

    // Date retrieval
    const [currentDateString] = useState(getFormattedDate());
    const tomorrowMinDate = getTomorrowDateForInput();

    const handleSelectChange = (event: SelectChangeEvent, setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState(event.target.value);
    };

    const handleCloseDialog = () => {
        setActiveForm('none');
        // Reset comment states and errors on close
        setCommentCallText('');
        setCommentActionText('');
        setCommentAssignText('');
        setCommentCallError(false);
        setCommentActionError(false);
        setCommentAssignError(false);
    };

    const handleSubmit = () => {
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
        // Add actual API submission logic here

        handleCloseDialog();
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
                                <TextField fullWidth disabled value={currentDateString} {...baseInputProps} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Next Call Date</Typography>
                                <TextField fullWidth type="date" {...dateInputProps} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Type</Typography>
                                <Select fullWidth value={callType} onChange={(e) => handleSelectChange(e, setCallType)} {...baseInputProps}>
                                    <MenuItem value="">Select Call Type</MenuItem>
                                    <MenuItem value="Inbound call">Inbound call</MenuItem>
                                    <MenuItem value="Outbound call">Outbound call</MenuItem>
                                    <MenuItem value="In missed call">In missed call</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Status</Typography>
                                <Select fullWidth value={callStatus} onChange={(e) => handleSelectChange(e, setCallStatus)} {...baseInputProps}>
                                    <MenuItem value="">Select Call Status</MenuItem>
                                    <MenuItem value="Hot - 3 days">Hot - 3 days</MenuItem>
                                    <MenuItem value="Warm - 7 days">Warm - 7 days</MenuItem>
                                    <MenuItem value="Cold - 30 days">Cold - 30 days</MenuItem>
                                    <MenuItem value="Not interested">Not interested</MenuItem>
                                    <MenuItem value="Inprogress">Inprogress</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Particulars</Typography>
                                {/* NOTE: This Select uses callStatus state, which seems like a bug in the original code, but I'll leave it attached to a state for control. */}
                                <Select fullWidth value={callStatus} onChange={(e) => handleSelectChange(e, setCallStatus)} {...baseInputProps}>
                                    <MenuItem value="">Select Particulars</MenuItem>
                                    <MenuItem value="Validation">Validation</MenuItem>
                                    <MenuItem value="Prospect">Prospect</MenuItem>
                                    <MenuItem value="Offer">Offer</MenuItem>
                                    <MenuItem value="SOSP - Next call date">SOSP - Next call date</MenuItem>
                                    <MenuItem value="Vys - Assist">Vys - Assist</MenuItem>
                                    <MenuItem value="Horo Updation">Horo Updation</MenuItem>
                                    <MenuItem value="Photo Updation">Photo Updation</MenuItem>
                                    <MenuItem value="Id Proof Updation">Id Proof Updation</MenuItem>
                                    <MenuItem value="Feedback">Feedback</MenuItem>
                                    <MenuItem value="Followup">Followup</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Call Owner</Typography>
                                <TextField fullWidth disabled value="Owner 1" {...baseInputProps} />
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
                                <TextField fullWidth disabled value={currentDateString} {...baseInputProps} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Action Today</Typography>
                                <Select fullWidth value={actionToday} onChange={(e) => handleSelectChange(e, setActionToday)} {...baseInputProps}>
                                    <MenuItem value="">Select Action Today</MenuItem>
                                    <MenuItem value="Invoice">Invoice</MenuItem>
                                    <MenuItem value="PSP">PSP</MenuItem>
                                    <MenuItem value="Weekly profile update">Weekly profile update</MenuItem>
                                    <MenuItem value="Priority Circulation">Priority Circulation</MenuItem>
                                    <MenuItem value="Compatability Report">Compatability Report</MenuItem>
                                    <MenuItem value="Express interest">Express interest</MenuItem>
                                    <MenuItem value="Horo updation">Horo updation</MenuItem>
                                    <MenuItem value="Photo updation">Photo updation</MenuItem>
                                    <MenuItem value="Id proof updation">Id proof updation</MenuItem>
                                    <MenuItem value="Matching profile">Matching profile</MenuItem>
                                    <MenuItem value="Intimation">Intimation</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Next Action Date</Typography>
                                <TextField fullWidth type="date" {...dateInputProps} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Next Action Comments</Typography>
                                <Select fullWidth value={nextActionComment} onChange={(e) => handleSelectChange(e, setNextActionComment)} {...baseInputProps}>
                                    <MenuItem value="">Select Next Action Comments</MenuItem>
                                    <MenuItem value="Invoice">Invoice</MenuItem>
                                    <MenuItem value="PSP">PSP</MenuItem>
                                    <MenuItem value="Weekly profile update">Weekly profile update</MenuItem>
                                    <MenuItem value="Priority Circulation">Priority Circulation</MenuItem>
                                    <MenuItem value="Compatability Report">Compatability Report</MenuItem>
                                    <MenuItem value="Express interest">Express interest</MenuItem>
                                    <MenuItem value="Horo updation">Horo updation</MenuItem>
                                    <MenuItem value="Photo updation">Photo updation</MenuItem>
                                    <MenuItem value="Id proof updation">Id proof updation</MenuItem>
                                    <MenuItem value="Matching profile">Matching profile</MenuItem>
                                    <MenuItem value="Intimation">Intimation</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography sx={labelSx}>Action Owner</Typography>
                                <TextField fullWidth disabled value="Owner 1" {...baseInputProps} />
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
                                <TextField fullWidth disabled value={currentDateString} {...baseInputProps} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={labelSx}>Assign Too</Typography>
                                <Select fullWidth value={assignOwner} onChange={(e) => handleSelectChange(e, setAssignOwner)} {...baseInputProps}>
                                    <MenuItem value="">Select Assignee</MenuItem>
                                    <MenuItem value="Meena">Meena</MenuItem>
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Yathin">Yathin</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={labelSx}>Assign By</Typography>
                                <TextField fullWidth disabled value="Owner 1" {...baseInputProps} />
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

    const dialogTitle = activeForm === 'call' ? 'Add New Call' :
        activeForm === 'action' ? 'Add New Action' :
            activeForm === 'assign' ? 'Add Assign Profile Owner' : 'New Entry';

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
                        onClick={() => setActiveForm('call')}
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
                        onClick={() => setActiveForm('action')}
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
                        onClick={() => setActiveForm('assign')}
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
                            SAVE ENTRY
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
                                        {mockCallLogs.map((log, index) => (<TableRow key={index} hover sx={{ '& td': { padding: "12px 16px" } }}><TableCell>{log.date}</TableCell><TableCell>{log.comments}</TableCell><TableCell>{log.callStatus}</TableCell><TableCell>{log.nextCallDate}</TableCell><TableCell>{log.callOwner}</TableCell><TableCell>{log.profileOwner}</TableCell><TableCell sx={{ textAlign: 'center' }}>
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                <Typography component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
                                                    <GrEdit />
                                                </Typography>
                                                <Typography component="span" sx={{ color: "#d32f2f", cursor: "pointer" }}>
                                                    <MdDeleteOutline />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        </TableRow>))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                    {(activeTab === "action" || activeTab === "all") && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #2196F3", pl: 1, mb: 1, color: "#2196F3" }}>⚡<Typography component="span" sx={{ color: "black", fontWeight: 600 }}> Action </Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
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
                                        {mockActionLogs.map((log, index) => (<TableRow key={index} hover sx={{ '& td': { padding: "12px 16px" } }}><TableCell>{log.date}</TableCell><TableCell>{log.comments}</TableCell><TableCell>{log.callActionToday}</TableCell><TableCell>{log.futureAction}</TableCell><TableCell>{log.nextActionDate}</TableCell><TableCell sx={{ textAlign: 'center' }}>
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                <Typography component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
                                                    <GrEdit />
                                                </Typography>
                                                <Typography component="span" sx={{ color: "#d32f2f", cursor: "pointer" }}>
                                                    <MdDeleteOutline />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        </TableRow>))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                    {(activeTab === "assign" || activeTab === "all") && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ borderLeft: "5px solid #FF9800", pl: 1, mb: 1, color: "#FF9800" }}>👤 <Typography component="span" sx={{ color: "black", fontWeight: 600 }}>Assign</Typography></Typography>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E0E0E0' }}>
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
                                        {mockAssignLogs.map((log, index) => (<TableRow key={index} hover sx={{ '& td': { padding: "12px 16px" } }}><TableCell>{log.date}</TableCell><TableCell>{log.comments}</TableCell><TableCell>{log.assigningOwner}</TableCell><TableCell sx={{ textAlign: 'center' }}>
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                <Typography component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
                                                    <GrEdit />
                                                </Typography>
                                                <Typography component="span" sx={{ color: "#d32f2f", cursor: "pointer" }}>
                                                    <MdDeleteOutline />
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        </TableRow>))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                </Box>
            </Paper>
        </div>
    );
};

export default CallManagementPage;