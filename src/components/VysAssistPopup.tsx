// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import axios from 'axios';

// interface VysAssistPopupProps {
//   vysassistId: string;
//   onClose: () => void;
// }

// const VysAssistPopup: React.FC<VysAssistPopupProps> = ({ vysassistId, onClose }) => {
// const [followUpData,setFollowUpData]=useState<any[]>([])
// const Vysfollowups=async()=>{
// try {
//     const response = await axios.get(`https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/Vysfollowups/?assist_id=${1}`)
//     console.log(response.data)
//     setFollowUpData(response.data)
// } catch (error) {
//     console.log('Error fetching FollowupData:',error)
// }
// }

// useEffect(()=>{
//     Vysfollowups()
// },[])
//   return (
//     <Dialog open={!!vysassistId} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Vysassist Details</DialogTitle>
//       {/* <DialogContent>
//         <Typography variant="h6" >Vysassist ID: {vysassistId}</Typography>
//         <Typography variant="body1">More details can be shown here...</Typography>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary" variant="contained">
//           Close
//         </Button>
//       </DialogActions> */}
//       <TableContainer>
// <TableHead>
//   <TableRow>
//   <TableCell>Follow-up ID</TableCell>
//   <TableCell>Assist Id</TableCell>
//   <TableCell>Owner Id</TableCell>
//   <TableCell>Commants</TableCell>
//   <TableCell>Update at</TableCell>

//   </TableRow>
// </TableHead>
// {/* <TableBody>
// {
//    followUpData.map((row, index) => (
//     console.log(row)
//     <TableRow key={index}>
      
//       <TableCell>{row.followup_id}</TableCell>
//       <TableCell>{row.followup_date}</TableCell>
//       <TableCell>{row.status}</TableCell>
//       <TableCell>{row.remarks}</TableCell>
//     </TableRow>
//   ))
// }
// </TableBody> */}
// <TableBody>
//   {followUpData.map((row, index) => {
//     console.log(row); // Log each row properly
//     return (
//       <TableRow key={index}>
//         <TableCell>{row.id}</TableCell>
//         <TableCell>{row.assist_id}</TableCell>
//         <TableCell>{row.owner_id}</TableCell>
//   <TableCell>{row.comments}</TableCell>
//   <TableCell>{row.update_at}</TableCell>

       
//       </TableRow>
//     );
//   })}
// </TableBody>

//       </TableContainer>
//     </Dialog>
//   );
// };

// export default VysAssistPopup;



// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, Paper, TableContainer, TableRow, TableCell, TableBody, TableHead, Table, Button, DialogActions } from '@mui/material';
// import axios from 'axios';

// interface VysAssistPopupProps {
//   vysassistId: string | null;
//   onClose: () => void;
// }

// const VysAssistPopup: React.FC<VysAssistPopupProps> = ({ vysassistId, onClose }) => {
//   const [followUpData, setFollowUpData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchFollowups = async () => {
//     if (!vysassistId) return; // Prevent API call if ID is invalid

//     setLoading(true);
//     try {
//       const response = await axios.get(`https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/Vysfollowups/?assist_id=${vysassistId}`);
//       console.log("API Response:", response.data); // Log response

//       if (response.data && Array.isArray(response.data)) {
//         setFollowUpData(response.data);
//       } else if (response.data.followups && Array.isArray(response.data.followups)) {
//         setFollowUpData(response.data.followups); // Handle nested response
//       } else {
//         console.error("Unexpected data format:", response.data);
//         setFollowUpData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching FollowupData:", error);
//       setFollowUpData([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     console.log("vysassistId:", vysassistId); // Check if ID is received
//     fetchFollowups();
//   }, [vysassistId]);

//   return (
//     <Dialog open={!!vysassistId} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>Vysassist Details</DialogTitle>
//       <DialogContent>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//               <TableCell>Follow-up ID</TableCell>
//   <TableCell>Assist Id</TableCell>
//   <TableCell>Owner Id</TableCell>
//   <TableCell>Commants</TableCell>
//   <TableCell>Update at</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">Loading...</TableCell>
//                 </TableRow>
//               ) : followUpData.length > 0 ? (
//                 followUpData.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{row.id}</TableCell>
//         <TableCell>{row.assist_id}</TableCell>
//         <TableCell>{row.owner_id}</TableCell>
//   <TableCell>{row.comments}</TableCell>
//   <TableCell>{row.update_at}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">No follow-ups available.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary" variant="contained">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default VysAssistPopup;



// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Paper,
//   TableContainer,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableHead,
//   Table,
//   Button,
//   DialogActions,
//   TextField,
//   Box,
//   Typography,
// } from "@mui/material";
// import axios from "axios";

// interface VysAssistPopupProps {
//   vysassistId: string | null;
//   onClose: () => void;
// }

// const VysAssistPopup: React.FC<VysAssistPopupProps> = ({ vysassistId, onClose }) => {
//   const [followUpData, setFollowUpData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [formData, setFormData] = useState({
//     assist_id: vysassistId || "",
//     owner_id: "",
//     comments: "",
//   });
//   const [message, setMessage] = useState("");

//   const fetchFollowups = async () => {
//     if (!vysassistId) return;
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/Vysfollowups/?assist_id=${vysassistId}`
//       );
//       console.log("API Response:", response.data);
//       setFollowUpData(response.data.followups || response.data || []);
//     } catch (error) {
//       console.error("Error fetching FollowupData:", error);
//       setFollowUpData([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (vysassistId) {
//       setFormData((prev) => ({ ...prev, assist_id: vysassistId }));
//       fetchFollowups();
//     }
//   }, [vysassistId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/Vysfollowups/",
//         formData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       console.log("Response:", response.data);
//       setMessage("Follow-up submitted successfully!");
//       setFormData({ assist_id: vysassistId || "", owner_id: "", comments: "" });
//       fetchFollowups(); // Refresh table data
//     } catch (error) {
//       console.error("Error submitting follow-up:", error);
//       setMessage("Failed to submit follow-up.");
//     }
//   };

//   return (
//     <Dialog open={!!vysassistId} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>Vysassist Details</DialogTitle>
//       <DialogContent>
//         {/* 🔹 Follow-up Submission Form */}
//         <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p: 2, boxShadow: 2, borderRadius: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Submit Follow-Up
//           </Typography>

//           <TextField
//             fullWidth
//             label="Assist ID"
//             name="assist_id"
//             value={formData.assist_id}
//             disabled
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Owner ID"
//             name="owner_id"
//             value={formData.owner_id}
//             onChange={handleChange}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Comments"
//             name="comments"
//             value={formData.comments}
//             onChange={handleChange}
//             margin="normal"
//             multiline
//             rows={3}
//             required
//           />

//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//             Submit
//           </Button>

//           {message && (
//             <Typography color={message.includes("successfully") ? "green" : "red"} sx={{ mt: 2 }}>
//               {message}
//             </Typography>
//           )}
//         </Box>

//         {/* 🔹 Follow-up Data Table */}
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Follow-up ID</TableCell>
//                 <TableCell>Assist Id</TableCell>
//                 <TableCell>Owner Id</TableCell>
//                 <TableCell>Comments</TableCell>
//                 <TableCell>Updated At</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : followUpData.length > 0 ? (
//                 followUpData.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{row.id}</TableCell>
//                     <TableCell>{row.assist_id}</TableCell>
//                     <TableCell>{row.owner_id}</TableCell>
//                     <TableCell>{row.comments}</TableCell>
//                     <TableCell>{row.update_at}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No follow-ups available.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary" variant="contained">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default VysAssistPopup;



import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Button,
  DialogActions,
  TextField,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";

interface VysAssistPopupProps {
  vysassistId: string | null;
  onClose: () => void;
}

interface AdminComment{
  id:number;
  comment_text:string
}
const VysAssistPopup: React.FC<VysAssistPopupProps> = ({ vysassistId, onClose }) => {

const{control,watch,setValue}=useForm({
  defaultValues: {
    admin_command: "",
  },

})

  const ownerId = sessionStorage.getItem('id')
  const first_name= sessionStorage.getItem("first_name")
  console.log(first_name)
  const [followUpData, setFollowUpData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [adminComments,setAdminComments]=useState<AdminComment[]>([])
  const [formData, setFormData] = useState({
    assist_id: vysassistId || "",
    owner_id: ownerId || "",
    owner_name:first_name||"",
    admin_comments:"", 
    comments: "",
  });
  console.log(formData)
  const [message, setMessage] = useState("");

  const selectedCommand = watch("admin_command");

  const fetchFollowups = async () => {
    if (!vysassistId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/Vysfollowups/?assist_id=${vysassistId}`
      );
      console.log("API Response:", response.data);
      setFollowUpData(response.data.followups || response.data || []);
    } catch (error) {
      console.error("Error fetching FollowupData:", error);
      setFollowUpData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (vysassistId) {
      setFormData((prev) => ({ ...prev, assist_id: vysassistId }));
      fetchFollowups();
    }
  }, [vysassistId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/Vysfollowups/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response.data);
      setMessage("Follow-up submitted successfully!");
      setFormData({ assist_id: vysassistId || "", owner_id: ownerId||"", owner_name:first_name||"",admin_comments: "" ,comments: "" });
      setShowForm(false); // Hide form after submission
      fetchFollowups(); // Refresh table data
    } catch (error) {
      console.error("Error submitting follow-up:", error);
      setMessage("Failed to submit follow-up.");
    }
  };

  // const formatDate = (isoString: string) => {
  //   const date = new Date(isoString);
  //   return date.toLocaleString("en-US", {
  //     year: "numeric",
  //     month: "short", 
  //     day: "2-digit",  
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //     hour12: true,
  //   });
  // };
  const handleCommandChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("admin_command", value);
    
    setFormData((prev) => ({
      ...prev,
      admin_comments: value !== "Others" ? value : "",
    }));
  };

  const formDate=(isoString: string)=>{
    const date =new Date(isoString);
    return date.toLocaleString('en-US',{
      year: "numeric",
      month: "short", 
      day: "2-digit",
      hour:'numeric',
      minute:'numeric',
      second:"numeric",
      hour12:true,
    })
  }
  // const isoTime = "2025-02-24T18:31:37.759440+05:30";
  // console.log(formData(isoTime));


const adminCommandDropdown = async()=>{
  try {
    const response = await axios.get('https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/vysyassist_comments/')
    console.log(response.data)
    setAdminComments(response.data)
  } catch (error) {
    console.log('Error in AdminComment:',error)
  }
}

useEffect(()=>{
  adminCommandDropdown()
},[])
  return (
    <Dialog open={!!vysassistId} onClose={onClose} fullWidth maxWidth="md">
      {/* <DialogTitle>Vysassist Details</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions> */}
      <DialogTitle>
  Vysassist Follow-Up Comment
  <IconButton
    onClick={onClose}
    sx={{
      position: "absolute",
      right:40,
      top: 8,
      fontSize:44,
      color: "red",
    }}
  >
    ×
  </IconButton>
</DialogTitle>
      <DialogContent>
        {/* 🔹 Button to Show the Form */}
        {!showForm && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            sx={{ mb: 2 }}
          >
            Add Follow-Up Comment
          </Button>
        )}

        {/* 🔹 Follow-up Submission Form (Visible Only When Add Button is Clicked) */}
        {showForm && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p:2, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Submit Follow-Up Comment
            </Typography>

          {/* <div className="flex flex-row gap-4"> */}
          <Box display={"flex"} flexDirection={"row"} gap={2} >
          {/* <TextField
              fullWidth
              label="Assist ID"
              name="assist_id"
              value={formData.assist_id}
              disabled
              margin="normal"
              // sx={{
              //   backgroundColor: "#f5f5f5",  // Light grey background
              //   borderRadius: "8px",
              //   "& .MuiOutlinedInput-root": {
              //     "& fieldset": { borderColor: "#1976d2" }, // Default border color
              //     "&:hover fieldset": { borderColor: "#1565c0" }, // Hover effect
              //     "&.Mui-focused fieldset": { borderColor: "#0d47a1" }, // Focus effect
              //   },
              // }}
            />
            <TextField
              fullWidth
              label="Owner ID"
              name="owner_id"
              value={formData.owner_id}
              onChange={handleChange}
              disabled
              margin="normal"
              required
            /> */}
            {/* <FormControl
             fullWidth 
             margin="normal"
            
             onChange={handleChange}
             >
              <InputLabel>Vysyassiat comments</InputLabel>
              <Select
              label="Vysyassiat comments"
              >
                {
                  adminComments.map((admin:AdminComment)=>(
                    <MenuItem key={admin.id}>{admin.comment_text}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <TextField
            fullWidth
            label="Vysyassiat comments"
            value={formData.admin_comments}
            onChange={handleChange}
            margin="normal"
            required
            />  */}
  <FormControl fullWidth margin="normal">
        <InputLabel>Admin Command</InputLabel>
        <Controller
          name="admin_command"

          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleCommandChange(e);
              }}
              label='Admin Command'
            >
              {
  adminComments.map((admin: AdminComment) => (
    <MenuItem key={admin.id} value={admin.comment_text}>
      {admin.comment_text}
    </MenuItem>
  ))
}
            </Select>
          )}
        />
      </FormControl>

      {selectedCommand === "Others" && (
        <TextField
          fullWidth
          label="Enter Admin Comments"
          margin="normal"
          value={formData.admin_comments}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              admin_comments: e.target.value,
            }))
          }
        />
      )}
            <TextField
              fullWidth
              label="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              margin="normal"
              multiline
              
              required
            />
            </Box>
          {/* </div> */}

            <Box display="flex" justifyContent="flex-end" gap={2} >
              <Button type="submit" variant="contained"   color="primary">
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
                Clear
              </Button>
            </Box>

            {message && (
              <Typography color={message.includes("successfully") ? "green" : "red"} sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        )}

        {/* 🔹 Follow-up Data Table */}
        <TableContainer component={Paper}>
          <Table>
            {/* <TableHead>
              <TableRow sx={{ background:"#FFF9C9",color:"#DC2635"}}>
                <TableCell>Follow-up ID</TableCell>
                <TableCell>Assist Id</TableCell>
                <TableCell>Owner Id</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead> */}
            <TableHead>
  <TableRow sx={{ background: "#FFF9C9" }}>
  <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>S.No</TableCell>
    <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Assist ID</TableCell>
    <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Owner Name</TableCell>
    <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Comments</TableCell>
    <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Admin Comments</TableCell>
    <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Updated At</TableCell>
  </TableRow>
</TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : followUpData.length > 0 ? (
                followUpData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{row.assist_id}</TableCell>
                    <TableCell>{row.owner_name}</TableCell>
                    <TableCell>{row.comments}</TableCell>
                     <TableCell>{row.admin_comments}</TableCell> 
                    <TableCell>{formDate(row.update_at)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No follow-ups available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
     
    </Dialog>
  );
};

export default VysAssistPopup;
