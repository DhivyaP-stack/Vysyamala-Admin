import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

interface ViewCallManagement {
    open: boolean;
    onClose: () => void;
  }

export const ViewCallManagement:React.FC<ViewCallManagement> = ({ open, onClose }) => {

    const [courseNumber, setCourseNumber] = useState("");
    const [wardChecked, setWardChecked] = useState(false);
    const [ourWardChecked, setOurWardChecked] = useState(false);
  
    const handleCancel = () => {
      setCourseNumber("");
      setWardChecked(false);
      setOurWardChecked(false);
    };

const TableBodyy=[
    {id:1, Edit:"",
        Particular:"Out-Bound Call",
        CallType:"New Customer",
        Comments:"Detail Verified Approved Profiles,plan Tell",
        CallStatus:"Warm-8 Days",
        Date:"24 March 2025",
        NextCall:"24 May 2025",
        CallActionToday:"",
        FutureActionTaken:"",
        NextDataActioPoint:"01 April 2025",
        ProfileId:"VY240210",
        profileStatus:"Prospect",
        Owner:"VY240210 Owner",
        WorkAssign:"",
        MatchIds:""
    },
    {id:2, 
        Edit:"",
        Particular:"Action Point",
        CallType:"Horoscope Updation",
        Comments:"Completed",
        CallStatus:"Completed",
        Date:"24 March 2025",
        NextCall:"24 May 2025",
        CallActionToday:"",
        FutureActionTaken:"",
        NextDataActioPoint:"24 May 2025",
        ProfileId:"VY240210",
        profileStatus:"Prospect",
        Owner:"VY240210 Owner",
        WorkAssign:"",
        MatchIds:""
    },
    {id:3, 
        Edit:"",
        Particular:"Action Point",
        CallType:"Photo Updation",
        Comments:"Completed",
        CallStatus:"Completed",
        Date:"24 March 2025",
        NextCall:"24 May 2025",
        CallActionToday:"",
        FutureActionTaken:"",
        NextDataActioPoint:"24 May 2025",
        ProfileId:"VY240210",
        profileStatus:"Prospect",
        Owner:"VY240210 Owner",
        WorkAssign:"",
        MatchIds:""
    }
    // {id:1, Edit:"",Particular:"",
    //     CallType:"",
    //     Comments:"",
    //     CallStatus:"",
    //     Date:"",
    //     NextCall:"",
    //     CallActionToday:"",
    //     FutureActionTaken:"",
    //     NextDataActioPoint:"",
    //     ProfileId:"",
    //     profileStatus:"",
    //     Owner:"",
    //     WorkAssign:"",
    //     MatchIds:""
    // }
]


const tableHeaders = [
    "Edit",
    "Particular",
    "Call Type",
    "Comments",
    "Call Status",
    "Date",
    "Next Call",
    "Call Action Today",
    "Future Action Taken",
    "Next Data - Action Point",
    "Profile ID",
    "Profile Status",
    "Owner",
    "Work Assign",
    "Match IDs",
  ];
  

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  const options = ["Option 1", "Option 2", "Option 3"];
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>

{/* <DialogTitle   sx={{
    justifyContent:"start",
    alignItems:"start"
}}>Call Management</DialogTitle> */}
<DialogTitle>
<Box sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
    Call Management
  </Box>
  <IconButton
  onClick={onClose}
  sx={{
    position:"absolute",
    top:5,
    right:5,
    background:"white",
    color:"#d50000"
  }}
  >
  <CloseIcon />
  </IconButton>
</DialogTitle>
{/* <Box
      className="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg"
      sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}
    >
    
      <TextField
        label="Course No"
        variant="outlined"3
        placeholder="REG-XXXXXXXX / ST-XXXXXXX / PRO-XXXXXXXX"
        value={courseNumber}
        onChange={(e) => setCourseNumber(e.target.value)}
        sx={{ minWidth: 250, flexGrow: 1 }}
      />

    
      <FormControlLabel
        control={
          <Checkbox
            checked={wardChecked}
            onChange={(e) => setWardChecked(e.target.checked)}
          />
        }
        label="Ward"
      />


      <FormControlLabel
        control={
          <Checkbox
            checked={ourWardChecked}
            onChange={(e) => setOurWardChecked(e.target.checked)}
          />
        }
        label="Our Ward"
      />


      <Button variant="contained" color="error" onClick={handleCancel}>
        Cancel
      </Button>
    </Box> */}

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
    <TableContainer component={Paper}>
        <Table>
<TableHead style={{background: '#FFF9C9',whiteSpace:"nowrap", padding: '17px'}}>
<TableRow >

  {tableHeaders.map((header, index) => (
    <TableCell key={index}  className="!text-red-600 !text-base !text-md text-nowrap font-bold" >{header}</TableCell>
  ))}
    {/* <TableCell >Edit</TableCell>
    <TableCell>Particular</TableCell>
    <TableCell>Call Type</TableCell>
    <TableCell>Comments</TableCell>
    <TableCell>Call Status</TableCell>
    <TableCell>Date</TableCell>
    <TableCell>Next Call</TableCell>
    <TableCell>Call Action Today</TableCell>
    <TableCell>Future Action Taken</TableCell>
    <TableCell>Next Data - Action Point</TableCell>
    <TableCell>Profile ID</TableCell>
    <TableCell>Profile Status</TableCell>
    <TableCell>Owner</TableCell>
    <TableCell>Work Assign </TableCell>
    <TableCell>Match IDs</TableCell> */}
</TableRow>
</TableHead>
<TableBody>
   {
    TableBodyy.map((row)=>(
        <TableRow key={row.id} sx={{whiteSpace:"nowrap",fontWeight:"bold"}}>
       <TableCell>{row.Edit}</TableCell>
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
       <TableCell>{row.MatchIds}</TableCell>
    </TableRow>
    
    ))
   }
   <TableRow >
   <TableCell><a href="#" style={{color:'#1976d2',textDecoration:"underline",cursor:"pointer",fontWeight:"bold"}}>Add New</a></TableCell>
    {/* <TableCell>Particular</TableCell> */}
    <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
                label="" 
                variant="outlined" />
    </TableCell>
    <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
    <TableCell>
        <TextField/>
    </TableCell>
    <TableCell>
        <TextField 
                 fullWidth 
                 label="" 
                 variant="outlined" />
    </TableCell>
    <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
    <TableCell> <TextField 
          fullWidth 
          label="" 
          variant="outlined" />
          
          </TableCell>
    <TableCell>
    <TextField 
          fullWidth 
          multiline
          variant="outlined" />
    </TableCell>
    <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>
              <Select value={selectedValue} onChange={()=>handleChange} fullWidth>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
</DialogContent>
    </Dialog>
  )
}
