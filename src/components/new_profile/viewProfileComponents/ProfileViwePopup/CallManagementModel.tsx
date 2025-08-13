import { Box, Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { creatCallManagement, fetchAdminUsers, fetchCallAction, fetchCallStatus, fetchCallTypes, fetchProfileCallManagement, fetchProfilestatus } from "../../../../api/apiConfig";
import { NotifyError, NotifySuccess } from "../../../../common/Toast/ToastMessage";
import { useLocation } from "react-router-dom";

interface CallManagementModelProps {
  open: boolean;
  onClose: () => void;
}
//Type CallType
interface CallType {
  id: number;
  name: string;
  status: string;
}
//Type CallStatus
interface CallStatus {
  id: number;
  name: string;
  status: string;
}
//Type CallStatus
interface CallAction {
  id: number;
  name: string;
  status: string;
}
// Type for API response
interface CallManagementData {
  id: number;
  profile_id: string;
  profile_status_id: number;
  owner_id: number;
  owner_value:string;
  inoutbound_id: number | null;
  call_type_id: number | null;
  call_type_value: string;
  comments: string | null;
  call_status_id: number | null;
  call_status_value: string;
  next_calldate: string | null;
  callaction_today_id: number | null;
  callaction_today_value: string;
  future_actiontaken_id: number | null;
  future_actiontaken_value: string;
  next_dateaction_point: string | null;
  work_asignid: number | null;
  work_asigned_value:string;
  updated_by: number | null;
  updated_on: string;
}

interface AdminUser {
  id: number;
  username: string;
}


export interface SubStatus {
  id: number;
  status_code: number;
  sub_status_name: string;
}

export const CallManagementModel: React.FC<CallManagementModelProps> = ({ open, onClose }) => {
  const [statuses, setStatuses] = useState<SubStatus[]>([]);
   

  const [courseNumber, setCourseNumber] = useState("");
  const [wardChecked, setWardChecked] = useState(false);
  const [ourWardChecked, setOurWardChecked] = useState(false);
  const [callTypes, setCallTypes] = useState<CallType[]>([]);
  const [callStatus, setCallStatus] = useState<CallStatus[]>([]);
  const [callActions, setCallActions] = useState<CallAction[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [callManagementData, setCallManagementData] = useState<CallManagementData[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');
  const roleId = localStorage.getItem('role_id');
  // Add this state to track form data
  const [formData, setFormData] = useState({
    profile_id: "",
    profile_status_id: "",
    owner_id: "",
    comments: "",
    call_type_id: "",
    call_status_id: "",
    callaction_today_id: "",
    next_calldate: "",
    future_actiontaken_id: "",
    next_dateaction_point: "",
    work_asignid: ""
    });

  // Fetch call types when component mounts
  useEffect(() => {
    const fetchCallManagement = async () => {
      setLoading(true);
      try {

        const calltypes = await fetchCallTypes();
        const callstatus = await fetchCallStatus();
        const callActions = await fetchCallAction();
        const Adminusers = await fetchAdminUsers();
        const ProfileStatus = await fetchProfilestatus();
        if (!profileId) {
          throw new Error("Missing profileId");
        }

        const callManagement = await fetchProfileCallManagement(profileId);
        setCallTypes(calltypes);
        setCallStatus(callstatus);
        setCallActions(callActions);
        setAdminUsers(Adminusers);
        setCallManagementData(callManagement);
        setStatuses(ProfileStatus);
      } catch (err) {
        NotifyError("Failed to load call types");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCallManagement();
  }, []);

  // Handler for Add New button click
  const handleAddNew = async () => {
    try {
      setLoading(true);

      if (!formData.profile_id) {
        throw new Error("Profile ID is required");
      }
      const ProfileID = formData.profile_id || "";
      const staticProfileStatusId = "129";
      const Comments = formData.comments || "";
      const response = await creatCallManagement(
        ProfileID,
        staticProfileStatusId,
        // String(roleId),
        formData.owner_id,
        Comments,
        formData.call_type_id, // Include the call type ID
        formData.call_status_id,
        formData.callaction_today_id,
        formData.next_calldate,
        formData.future_actiontaken_id,
        formData.next_dateaction_point,
        formData.work_asignid,
      );
      console.log("call management response", response)
      // Handle successful response
      NotifySuccess("Call management record created successfully");
      // Refresh the data
      if (profileId) {
        const callManagement = await fetchProfileCallManagement(profileId);
        setCallManagementData(callManagement);
      }
      // Clear the comments field after successful submission
      setFormData(prev => ({
        ...prev,
        comments: "", // This clears the comments field
        call_type_id: "",
        call_status_id: "",
        callaction_today_id: "",
        next_calldate: "",
        profile_id: "",
        future_actiontaken_id: "",
        next_dateaction_point: ""
      }));
      // Also reset the selected value state
      setSelectedCallType("");
      setSelectedCallTypeId(null);
      setSelectedCallStatus("");
      setSelectedCallStatusId(null);
      setSelectedCallActions("");
      setSelectedCallActionsId(null);
      setSelectedWorkAssign("");
      setSelectedWorkAssignId(null);
      setSelectedOwner("");
      setSelectedOwnerId(null);
      setSelectedProfileStatus("");
      setStatusesId(null)
    } catch (error: any) {
      NotifyError(error.message || "Failed to create call management record");
    } finally {
      setLoading(false);
    }
  };

  // Handler for form field changes (including textarea)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setCourseNumber("");
    setWardChecked(false);
    setOurWardChecked(false);
  };

  const tableHeaders = [
    // "Edit",
    "Particular",
    "Call Type",
    "Comments",
    "Call Status",
    "Date",
    "Next Call",
    "Call Action Today",
    "Future Action Taken",
    "Next Date - Action Point",
    "Profile ID",
    "Profile Status",
    "Owner",
    "Work Assign",
    "Match IDs",
  ];
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  //handleCallType
  const [selectedCallType, setSelectedCallType] = useState<string>("");
  const [selectedCallTypeId, setSelectedCallTypeId] = useState<number | null>(null);
  console.log("selectedCallTypeId", selectedCallTypeId)
  const handleCallType = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedType = callTypes.find(type => type.name === selectedName);
    setSelectedCallType(selectedName);
    setSelectedCallTypeId(selectedType?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      call_type_id: selectedType?.id.toString() || ""
    }));
  };

  //handleCallstatus
  const [selectedCallStatus, setSelectedCallStatus] = useState<string>("");
  const [selectedCallStatusId, setSelectedCallStatusId] = useState<number | null>(null);
  console.log("selectedCallStatusId", selectedCallStatusId)
  const handleCallStatus = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedStatus = callStatus.find(type => type.name === selectedName);
    setSelectedCallStatus(selectedName);
    setSelectedCallStatusId(selectedStatus?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      call_status_id: selectedStatus?.id.toString() || ""
    }));
  };

  //handleCallActionss
  const [selectedCallActions, setSelectedCallActions] = useState<string>("");
  const [selectedCallActionsId, setSelectedCallActionsId] = useState<number | null>(null);
  console.log("selectedCallActionsId", selectedCallActionsId)
  const handleCallActions = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedStatus = callActions.find(type => type.name === selectedName);
    setSelectedCallActions(selectedName);
    setSelectedCallActionsId(selectedStatus?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      callaction_today_id: selectedStatus?.id.toString() || ""
    }));
  };

  //handleFutureActionss
  const [selectedFutureActions, setSelectedFutureActions] = useState<string>("");
  const [selectedFutureActionsId, setSelectedFutureActionsId] = useState<number | null>(null);
  console.log("selectedFutureActionsId", selectedFutureActionsId)
  const handleFutureActions = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedFutureAction = callActions.find(type => type.name === selectedName);
    setSelectedFutureActions(selectedName);
    setSelectedFutureActionsId(selectedFutureAction?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      future_actiontaken_id: selectedFutureAction?.id.toString() || ""
    }));
  };

  //Admin users
  const [selectedWorkAssign, setSelectedWorkAssign] = useState<string>("");
  const [selectedWorkAssignId, setSelectedWorkAssignId] = useState<number | null>(null);
  console.log("setSelectedAdminUsersId", selectedWorkAssignId)
  const handleAdminUsers = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedWorkAssign = adminUsers.find(type => type.username === selectedName);
    setSelectedWorkAssign(selectedName);
    setSelectedWorkAssignId(selectedWorkAssign?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      work_asignid: selectedWorkAssign?.id.toString() || ""
    }));
  };

  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
  console.log("setSelectedOwnerId", selectedOwnerId)
  const handleOwner = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedOwner = adminUsers.find(type => type.username === selectedName);
    setSelectedOwner(selectedName);
    setSelectedOwnerId(selectedOwner?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      owner_id: selectedOwner?.id.toString() || ""
    }));
  };

const [selectedProfileStatus, setSelectedProfileStatus] = useState<string>("");
  const [statusesId, setStatusesId]  = useState<number | null>(null);
  console.log("statusesId" ,statusesId)
  const handleProfileStatus = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    const selectedProfileStatus = statuses.find(type => type.sub_status_name === selectedName);
    setSelectedProfileStatus(selectedName);
    setStatusesId(selectedProfileStatus?.id || null);
    // Also update formData
    setFormData(prev => ({
      ...prev,
      owner_id: selectedProfileStatus?.id.toString() || ""
    }));
  };

  const options = ["Option 1", "Option 2", "Option 3"];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
          Call Management
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            background: "white",
            color: "#d50000"
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box
        className="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg"
        sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}
      >
        {/* Text Field for Course Number */}
        <TextField
          label="Course No"
          variant="outlined"
          placeholder="REG-XXXXXXXX / ST-XXXXXXX / PRO-XXXXXXXX"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
          // sx={{ Width: '100%', flexGrow: 1 }}
          sx={{ width: '100%', maxWidth: '400px' }}
        />

        {/* Checkbox for Ward */}
        <FormControlLabel
          control={
            <Checkbox
              checked={wardChecked}
              onChange={(e) => setWardChecked(e.target.checked)}
            />
          }
          label="in Ward / Our Ward"
        />

        {/* Cancel Button */}
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Typography variant="body2" sx={{ width: "100%", color: "gray" }}>
          <strong>Note:</strong> Eg:cource
      //  <br />
          <code>REG-XXXXXXXX / ST-XXXXXXX / PRO-XXXXXXXX / POST</code>
        </Typography>
      </Box>

      <DialogContent>
        {loading ? (
          // <div className="text-center">Loading...</div>
          // **Enhanced Loading UI**
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <CircularProgress size={50} thickness={4.5} />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ background: '#FFF9C9', whiteSpace: "nowrap", padding: '17px' }}>
                <TableRow >
                  {tableHeaders.map((header, index) => (
                    <TableCell key={index} className="!text-red-600 !text-base !text-md text-nowrap font-bold" >{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  callManagementData.map((row) => (
                    <TableRow key={row.id} sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      {/* <TableCell>{row.Edit}</TableCell>
                      <TableCell>{row.Particular}</TableCell>
                      <TableCell>{row.CallType}</TableCell>
                      <TableCell>{row.Comments}</TableCell>
                      <TableCell>{row.CallStatus}</TableCell>
                      <TableCell>{row.Date}</TableCell>
                      <TableCell>{row.NextCall}</TableCell>
                      <TableCell>{row.CallActionToday}</TableCell>
                      <TableCell>{row.FutureActionTaken}</TableCell>
                      <TableCell>{row.NextDataActioPoint}</TableCell>
                      <TableCell>{row.ProfileId}</TableCell>
                      <TableCell>{row.profileStatus}</TableCell>
                      <TableCell>{row.Owner}</TableCell>
                      <TableCell>{row.WorkAssign}</TableCell>
                      <TableCell>{row.MatchIds}</TableCell> */}
                      {/* <TableCell>Edit</TableCell> */}
                      <TableCell>Particular</TableCell>
                      <TableCell>{row.call_type_value || 'N/A'}</TableCell>
                      <TableCell>{row.comments || 'N/A'}</TableCell>
                      <TableCell>{row.call_status_value || 'N/A'}</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>{row.next_calldate || 'N/A'}</TableCell>
                      <TableCell>{row.callaction_today_value || 'N/A'}</TableCell>
                      <TableCell>{row.future_actiontaken_value || 'N/A'}</TableCell>
                      <TableCell>{row.next_dateaction_point || 'N/A'}</TableCell>
                      <TableCell>{row.profile_id || 'N/A'}</TableCell>
                      <TableCell>{row.profile_status_id || 'N/A'}</TableCell>
                      <TableCell>{row.owner_value || 'N/A'}</TableCell>
                      <TableCell>{row.work_asigned_value || 'N/A'}</TableCell>
                      <TableCell>MatchIds</TableCell>
                    </TableRow>
                  ))
                }
                <TableRow >
                  <Button
                    onClick={handleAddNew}
                  ><a href="#" style={{ color: '#1976d2', textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}>Add New</a></Button>
                  {/* <TableCell>Particular</TableCell> */}
                  {/* <TableCell>
                    <Select value={selectedValue} onChange={() => handleChange} fullWidth>
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>s
                      ))}
                    </Select>
                  </TableCell> */}
                  <TableCell>
                    <Select value={selectedCallType} onChange={handleCallType}
                      fullWidth
                      displayEmpty
                      variant="outlined">
                      <MenuItem value="" disabled>
                        Select Call Type
                      </MenuItem>
                      {callTypes.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      minRows={1}
                      maxRows={10}
                      label="Comments"
                      variant="outlined"
                      name="comments"  // Important: must match the state key
                      value={formData.comments || ""}
                      onChange={handleInputChange} />
                  </TableCell>
                  <TableCell>
                    <Select value={selectedCallStatus} onChange={handleCallStatus} fullWidth
                      displayEmpty
                      variant="outlined">
                      <MenuItem value="" disabled>
                        Select Call Status
                      </MenuItem>
                      {callStatus.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      type="date"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      label=""
                      type="date"
                      name="next_calldate"
                      value={formData.next_calldate || ""}
                      onChange={handleInputChange}
                      variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Select value={selectedCallActions} onChange={handleCallActions} fullWidth
                      displayEmpty
                      variant="outlined">
                      <MenuItem value="" disabled>
                        Select Call Actions
                      </MenuItem>
                      {callActions.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select value={selectedFutureActions} onChange={handleFutureActions} fullWidth
                      displayEmpty
                      variant="outlined">
                      {/* {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))} */}
                      <MenuItem value="" disabled>
                        Select Future Action
                      </MenuItem>
                      {callActions.map((type) => (
                        <MenuItem key={type.id} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>  <TextField
                    fullWidth
                    label=""
                    type="date"
                    name="next_dateaction_point"
                    value={formData.next_dateaction_point || ""}
                    onChange={handleInputChange}
                    variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {/* PROFILE_ID */}
                    {/* <TextField
                      fullWidth
                      multiline
                      variant="outlined" /> */}
                    <TextField
                      fullWidth
                      multiline
                      minRows={1}
                      maxRows={10}
                      label="Profile_id"
                      variant="outlined"
                      name="profile_id"  // Important: must match the state key
                      value={formData.profile_id || ""}
                      onChange={handleInputChange} />
                  </TableCell>
                  {/* <TableCell>
                    <Select value={selectedValue} onChange={() => handleChange} fullWidth>
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell> */}

                   <TableCell>
                    <Select value={selectedProfileStatus} onChange={handleProfileStatus} fullWidth
                      displayEmpty
                      variant="outlined">
                      <MenuItem value="" disabled>
                        Profile Status
                      </MenuItem>
                      {statuses.map((type) => (
                        <MenuItem key={type.id} value={type.sub_status_name}>
                          {type.sub_status_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Select value={selectedOwner} onChange={handleOwner} fullWidth
                      displayEmpty
                      variant="outlined">
                      <MenuItem value="" disabled>
                        Select Owner
                      </MenuItem>
                      {adminUsers.map((type) => (
                        <MenuItem key={type.id} value={type.username}>
                          {type.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select value={selectedWorkAssign} onChange={handleAdminUsers} fullWidth
                      displayEmpty
                      variant="outlined">
                      <MenuItem value="" disabled>
                        Select Work Assign
                      </MenuItem>
                      {adminUsers.map((type) => (
                        <MenuItem key={type.id} value={type.username}>
                          {type.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      minRows={1}
                      maxRows={10}
                      label="Engagement Photo Details"
                      variant="outlined" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  )
}
 