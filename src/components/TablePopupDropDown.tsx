
// import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// interface State {
//   id: number;
//   name: string;
// }

// interface TablePopUpDropDownDropDownProps {
//   showPopup: boolean;
//   setShowPopup: (value: boolean) => void;
//   clearValues: () => void;
//   handleAddOrUpdate: () => void;
//   EditId: number | null;
//   valueOne: string;
//   setValueOne: (value: string) => void;
//   labelOne: string;
//   valueTwo: string;
//   setValueTwo: (value: string) => void;
//   labelTwo: string;
//   states: State[]; // Add states prop for dropdown
//   addMsg: string;
//   editMsg: string;
// }

// const TablePopUpDropDownDropDown: React.FC<TablePopUpDropDownDropDownProps> = ({
//   showPopup,
//   setShowPopup,
//   clearValues,
//   handleAddOrUpdate,
//   EditId,
//   valueOne,
//   setValueOne,
//   labelOne,
//   valueTwo,
//   setValueTwo,
//   labelTwo,
//   states, // Pass the states prop
//   addMsg,
//   editMsg,
// }) => {
//   const handleClose = () => {
//     setShowPopup(false);
//     clearValues();
//   };

//   return (
//     <Dialog open={showPopup} onClose={handleClose}>
//       <DialogTitle>{EditId ? editMsg : addMsg}</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           label={labelOne}
//           fullWidth
//           value={valueOne}
//           onChange={(e) => setValueOne(e.target.value)}
//         />
        
//         {/* State Dropdown */}
//         <FormControl fullWidth style={{ marginTop: '20px' }}>
//           <InputLabel id="state-select-label">{labelTwo}</InputLabel>
//           <Select
//             labelId="state-select-label"
//             value={valueTwo || ''}
//             onChange={(e) => setValueTwo(e.target.value)}
//           >
//             {states.map((state) => (
//               <MenuItem key={state.id} value={state.id.toString()}>
//                 {state.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleAddOrUpdate} color="primary">
//           {EditId ? 'Update' : 'Add'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default TablePopUpDropDownDropDown;



// import React from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';

// interface State {
//   id: number;
//   name: string;
// }

// interface TablePopUpDropDownProps {
//   showPopup: boolean;
//   setShowPopup: (value: boolean) => void;
//   clearValues: () => void;
//   handleAddOrUpdate: () => void;
//   handleDelete?: () => void;  // Optional delete function
//   EditId: number | null;
//   valueOne: string;
//   setValueOne: (value: string) => void;
//   labelOne: string;
//   valueTwo: string;
//   setValueTwo: (value: string) => void;
//   labelTwo: string;
//   states: State[];
//   addMsg: string;
//   editMsg: string;
// }

// const TablePopUpDropDown: React.FC<TablePopUpDropDownProps> = ({
//   showPopup,
//   setShowPopup,
//   clearValues,
//   handleAddOrUpdate,
//   handleDelete, // handleDelete prop
//   EditId,
//   valueOne,
//   setValueOne,
//   labelOne,
//   valueTwo,
//   setValueTwo,
//   labelTwo,
//   states,
//   addMsg,
//   editMsg,
// }) => {
//   const handleClose = () => {
//     setShowPopup(false);
//     clearValues();
//   };

//   const handleSubmit = () => {
//     if (!valueOne || !valueTwo) {
//       alert("All fields are required.");
//       return;
//     }
//     handleAddOrUpdate();
//   };

//   return (
//     <Dialog open={showPopup} onClose={handleClose}>
//       <DialogTitle>{EditId ? editMsg : addMsg}</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           label={labelOne}
//           fullWidth
//           value={valueOne}
//           onChange={(e) => setValueOne(e.target.value)}
//         />

//         {/* State Dropdown */}
//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel id="state-select-label">{labelTwo}</InputLabel>
//           <Select
//             labelId="state-select-label"
//             value={valueTwo || ''}
//             onChange={(e) => setValueTwo(e.target.value)}
//           >
//             {states.map((state) => (
//               <MenuItem key={state.id} value={state.id.toString()}>
//                 {state.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="secondary">
//           Cancel
//         </Button>

//         {/* Conditionally render Delete button when editing (EditId is not null) */}
//         {EditId && handleDelete && (
//           <Button
//             onClick={handleDelete}
//             color="error"
//             style={{ marginRight: 'auto' }}
//           >
//             Delete
//           </Button>
//         )}

//         <Button onClick={handleSubmit} color="primary">
//           {EditId ? 'Update' : 'Add'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default TablePopUpDropDown;


// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';

// interface State {
//   id: number;
//   name: string;
// }

// interface TablePopUpDropDownProps {
//   showPopup: boolean;
//   setShowPopup: (value: boolean) => void;
//   clearValues: () => void;
//   handleAddOrUpdate: () => void;
//   handleDelete?: () => void; // Optional delete function
//   EditId: number | null;
//   valueOne: string;
//   setValueOne: (value: string) => void;
//   labelOne: string;
//   valueTwo: string;
//   setValueTwo: (value: string) => void;
//   labelTwo: string;
//   states: State[];
//   addMsg: string;
//   editMsg: string;
// }

// const TablePopUpDropDown: React.FC<TablePopUpDropDownProps> = ({
//   showPopup,
//   setShowPopup,
//   clearValues,
//   handleAddOrUpdate,
//   handleDelete, // handleDelete prop
//   EditId,
//   valueOne,
//   setValueOne,
//   labelOne,
//   valueTwo,
//   setValueTwo,
//   labelTwo,
//   states,
//   addMsg,
//   editMsg,
// }) => {
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State to handle delete confirmation dialog

//   const handleClose = () => {
//     setShowPopup(false);
//     clearValues();
//   };

//   const handleSubmit = () => {
//     if (!valueOne || !valueTwo) {
//       alert("All fields are required.");
//       return;
//     }
//     handleAddOrUpdate();
//   };

//   const handleDeleteClick = () => {
//     setConfirmDeleteOpen(true); // Open confirmation dialog
//   };

//   const handleConfirmDelete = () => {
//     setConfirmDeleteOpen(false);
//     if (handleDelete) {
//       handleDelete(); // Proceed with delete action
//     }
//     setShowPopup(false);
//   };

//   const handleCancelDelete = () => {
//     setConfirmDeleteOpen(false); // Close confirmation dialog without deleting
//   };

//   return (
//     <>
//       <Dialog open={showPopup} onClose={handleClose}>
//         <DialogTitle>{EditId ? editMsg : addMsg}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label={labelOne}
//             fullWidth
//             value={valueOne}
//             onChange={(e) => setValueOne(e.target.value)}
//           />

//           {/* State Dropdown */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="state-select-label">{labelTwo}</InputLabel>
//             <Select
//               labelId="state-select-label"
//               value={valueTwo || ''}
//               onChange={(e) => setValueTwo(e.target.value)}
//             >
//               {states.map((state) => (
//                 <MenuItem key={state.id} value={state.id.toString()}>
//                   {state.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>

//           {/* Conditionally render Delete button when editing (EditId is not null) */}
//           {EditId && handleDelete && (
//             <Button
//               onClick={handleDeleteClick} // Trigger delete confirmation dialog
//               color="error"
//               style={{ marginRight: 'auto' }}
//             >
//               Delete
//             </Button>
//           )}

//           <Button onClick={handleSubmit} color="primary">
//             {EditId ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete confirmation dialog */}
//       <Dialog open={confirmDeleteOpen} onClose={handleCancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
        
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default TablePopUpDropDown;


// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';

// interface State {
//   id: number;
//   name: string;
// }

// interface TablePopUpDropDownProps {
//   showPopup: boolean;
//   setShowPopup: (value: boolean) => void;
//   clearValues: () => void;
//   handleAddOrUpdate: () => void;
//   handleDelete?: () => void; // Optional delete function
//   EditId: number | null;
//   valueOne: string;
//   setValueOne: (value: string) => void;
//   labelOne: string;
//   valueTwo: string;
//   setValueTwo: (value: string) => void;
//   labelTwo: string;
//   states: State[];
//   addMsg: string;
//   editMsg: string;
// }

// const TablePopUpDropDown: React.FC<TablePopUpDropDownProps> = ({
//   showPopup,
//   setShowPopup,
//   clearValues,
//   handleAddOrUpdate,
//   handleDelete, // handleDelete prop
//   EditId,
//   valueOne,
//   setValueOne,
//   labelOne,
//   valueTwo,
//   setValueTwo,
//   labelTwo,
//   states,
//   addMsg,
//   editMsg,
// }) => {
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State to handle delete confirmation dialog

//   // Close popup dialog and clear values
//   const handleClose = () => {
//     setShowPopup(false);
//     clearValues();
//   };

//   // Handle form submit (Add/Update)
//   const handleSubmit = () => {
//     if (!valueOne || !valueTwo) {
//       alert("All fields are required.");
//       return;
//     }
//     handleAddOrUpdate();
//   };

//   // Open delete confirmation dialog
//   const handleDeleteClick = () => {
//     setConfirmDeleteOpen(true); // Open confirmation dialog
//   };

//   // Confirm delete action
//   const handleConfirmDelete = () => {
//     if (handleDelete) {
//       handleDelete(); // Call the delete function passed via props
//     }
//     setConfirmDeleteOpen(false); // Close confirmation dialog after delete
//     setShowPopup(false); // Close the main popup
//   };

//   // Cancel delete action
//   const handleCancelDelete = () => {
//     setConfirmDeleteOpen(false); // Close delete confirmation dialog
//   };

//   return (
//     <>
//       {/* Main Add/Edit Dialog */}
//       <Dialog open={showPopup} onClose={handleClose}>
//         <DialogTitle>{EditId ? editMsg : addMsg}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label={labelOne}
//             fullWidth
//             value={valueOne}
//             onChange={(e) => setValueOne(e.target.value)}
//           />

//           {/* State Dropdown */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="state-select-label">{labelTwo}</InputLabel>
//             <Select
//               labelId="state-select-label"
//               value={valueTwo || ''}
//               onChange={(e) => setValueTwo(e.target.value)}
//             >
//               {states.map((state) => (
//                 <MenuItem key={state.id} value={state.id.toString()}>
//                   {state.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>

//           {/* Conditionally render Delete button when editing (EditId is not null) */}
//           {EditId && handleDelete && (
//             <Button
//               onClick={handleDeleteClick} // Trigger delete confirmation dialog
//               color="error"
//               style={{ marginRight: 'auto' }}
//             >
//               Delete
//             </Button>
//           )}

//           <Button onClick={handleSubmit} color="primary">
//             {EditId ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={confirmDeleteOpen} onClose={handleCancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this district? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default TablePopUpDropDown;


// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';

// interface State {
//   id: number;
//   name: string;
// }

// interface TablePopUpDropDownProps {
//   showPopup: boolean;
//   setShowPopup: (value: boolean) => void;
//   clearValues: () => void;
//   handleAddOrUpdate: () => void;
//   handleDelete?: () => void; // Optional delete function
//   EditId: number | null;
//   valueOne: string;
//   setValueOne: (value: string) => void;
//   labelOne: string;
//   valueTwo: string;
//   setValueTwo: (value: string) => void;
//   labelTwo: string;
//   states: State[];
//   addMsg: string;
//   editMsg: string;
//   deletLabel: string;
//   deleteConfirmation: boolean;
//   setDeleteConfirmation: (show: boolean) => void;
//   deletFun: () => void;
// }

// const TablePopUpDropDown: React.FC<TablePopUpDropDownProps> = ({
//   showPopup,
//   setShowPopup,
//   clearValues,
//   handleAddOrUpdate,
//   handleDelete,
//   EditId,
//   valueOne,
//   setValueOne,
//   labelOne,
//   valueTwo,
//   setValueTwo,
//   labelTwo,
//   states,
//   addMsg,
//   editMsg,
//   deleteConfirmation,
//   setDeleteConfirmation,
// }) => {
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State to handle delete confirmation dialog
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<{ valueOne: string; valueTwo: string }>({
//     valueOne: '',
//     valueTwo: '',
//   });

//   // Close popup dialog and clear values
//   const handleClose = () => {
//     setShowPopup(false);
//     clearValues();
//     setErrors({ valueOne: '', valueTwo: '' }); // Reset errors on close
//   };

//   // Handle form submit (Add/Update)
//   const handleSubmit = () => {
//     setLoading(true);
//     let hasError = false;
//     setErrors({ valueOne: '', valueTwo: '' }); // Reset errors before validation

//     if (!valueOne) {
//       setErrors((prev) => ({ ...prev, valueOne: `${labelOne} is required` }));
//       hasError = true;
//     }
//     if (!valueTwo) {
//       setErrors((prev) => ({ ...prev, valueTwo: `${labelTwo} is required` }));
//       hasError = true;
//     }
//     if (hasError) {
//         setLoading(false);
//         return; // Exit if there are validation errors
//       }
    

//     handleAddOrUpdate();
//   };

//   // Open delete confirmation dialog
//   const handleDeleteClick = () => {
//     setConfirmDeleteOpen(true); // Open confirmation dialog
//   };

//   // Confirm delete action
//   const handleConfirmDelete = () => {
//     if (handleDelete) {
//       handleDelete(); // Call the delete function passed via props
//     }
//     setConfirmDeleteOpen(false); // Close confirmation dialog after delete
//     setShowPopup(false); // Close the main popup
//   };

//   // Cancel delete action
//   const handleCancelDelete = () => {
//     setConfirmDeleteOpen(false); // Close delete confirmation dialog
//   };

//   return (
//     <>
//       {/* Main Add/Edit Dialog */}
//       <Dialog open={showPopup} onClose={handleClose}
    
//           maxWidth="sm"
//           sx={{ background: '#f5f0ef ' }}>
//         <DialogTitle style={{
//                 color: 'red',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 marginTop: '20px',
//                 fontSize: '30px',
//               }}>{EditId ? editMsg : addMsg}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label={labelOne}
//             fullWidth
//             value={valueOne}
//             onChange={(e) => {
//               setValueOne(e.target.value);
//               if (errors.valueOne) setErrors((prev) => ({ ...prev, valueOne: '' })); // Clear error message for valueOne
//             }}
//             error={!!errors.valueOne} // Show error if exists
//             helperText={errors.valueOne} // Show helper text for error
//           />

//           {/* State Dropdown */}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="state-select-label">{labelTwo}</InputLabel>
//             <Select
//               labelId="state-select-label"
//               value={valueTwo || ''}
//               onChange={(e) => {
//                 setValueTwo(e.target.value);
//                 if (errors.valueTwo) setErrors((prev) => ({ ...prev, valueTwo: '' })); // Clear error message for valueTwo
//               }}
//               error={!!errors.valueTwo} // Show error if exists
//             >
//               {states.map((state) => (
//                 <MenuItem key={state.id} value={state.id.toString()}>
//                   {state.name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.valueTwo && <p style={{ color: 'red' }}>{errors.valueTwo}</p>} {/* Show error message for valueTwo */}
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary"   style={{
//                 background: '#FFFDFF',
//                 color: 'red',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//               }}
//               disabled={loading}>
//             Cancel
//           </Button>

//           {/* Conditionally render Delete button when editing (EditId is not null) */}
//           {EditId && handleDelete && (
//             <Button
//               onClick={handleDeleteClick} // Trigger delete confirmation dialog
//               color="error"
//             //   style={{ marginRight: 'auto' }}
//             style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               disabled={loading}
//             >
//               Delete
//             </Button>
//           )}

//           <Button onClick={handleSubmit} color="primary"
//            style={{
//             background: 'red',
//             color: 'white',
//             boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//           }}
//            disabled={loading}
//           >
//             {EditId ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//           open={deleteConfirmation}
//           onClose={() => setDeleteConfirmation(false)}
//         ></Dialog>
//       <Dialog open={confirmDeleteOpen} onClose={handleCancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this district? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelDelete} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default TablePopUpDropDown;

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

interface State {
  id: number;
  name: string;
}

interface TablePopUpDropDownProps {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
  clearValues: () => void;
  handleAddOrUpdate: () => void;
  handleDelete?: () => void; // Optional delete function
  EditId: number | null;
  valueOne: string;
  setValueOne: (value: string) => void;
  labelOne: string;
  valueTwo: string;
  setValueTwo: (value: string) => void;
  labelTwo: string;
  states: State[];
  addMsg: string;
  editMsg: string;
  deletLabel: string;
  deleteConfirmation: boolean;
  setDeleteConfirmation: (show: boolean) => void;
  deletFun: () => void;
}

const TablePopUpDropDown: React.FC<TablePopUpDropDownProps> = ({
  showPopup,
  setShowPopup,
  clearValues,
  handleAddOrUpdate,
  handleDelete,
  EditId,
  valueOne,
  setValueOne,
  labelOne,
  valueTwo,
  setValueTwo,
  labelTwo,
  states,
  addMsg,
  editMsg,
  deleteConfirmation,
  setDeleteConfirmation,
}) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State to handle delete confirmation dialog
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ valueOne: string; valueTwo: string }>({
    valueOne: '',
    valueTwo: '',
  });

  // Close popup dialog and clear values
  const handleClose = () => {
    setShowPopup(false);
    clearValues();
    setErrors({ valueOne: '', valueTwo: '' }); // Reset errors on close
  };

  // Handle form submit (Add/Update)
  const handleSubmit = async () => {
    setLoading(true);  // Set loading to true when submitting
    let hasError = false;
    setErrors({ valueOne: '', valueTwo: '' });  // Reset errors before validation

    // Validate input fields
    if (!valueOne) {
      setErrors((prev) => ({ ...prev, valueOne: `${labelOne} is required` }));
      hasError = true;
    }
    if (!valueTwo) {
      setErrors((prev) => ({ ...prev, valueTwo: `${labelTwo} is required` }));
      hasError = true;
    }
    
    // If there are validation errors, stop the submission
    if (hasError) {
      setLoading(false);  // Stop loading if there's an error
      return;
    }

    // Call the function to add or update (assuming it's asynchronous)
    await handleAddOrUpdate();

    // After successful add or update, clear form and close popup
    handleClose();
    setLoading(false);  // Stop loading when done
  };

  // Open delete confirmation dialog
  const handleDeleteClick = () => {
    setConfirmDeleteOpen(true); // Open confirmation dialog
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (handleDelete) {
      handleDelete(); // Call the delete function passed via props
    }
    setConfirmDeleteOpen(false); // Close confirmation dialog after delete
    setShowPopup(false); // Close the main popup
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false); // Close delete confirmation dialog
  };

  return (
    <>
      {/* Main Add/Edit Dialog */}
      <Dialog open={showPopup} onClose={handleClose} maxWidth="sm" sx={{ background: '#f5f0ef ' }}>
        <DialogTitle
          style={{
            color: 'red',
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '20px',
            fontSize: '30px',
          }}
        >
          {EditId ? editMsg : addMsg}
        </DialogTitle>
        <DialogContent>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <TextField
            margin="dense"
            label={labelOne}
            fullWidth
            value={valueOne}
            onChange={(e) => {
              setValueOne(e.target.value);
              if (errors.valueOne) setErrors((prev) => ({ ...prev, valueOne: '' })); // Clear error message for valueOne
            }}
            error={!!errors.valueOne} // Show error if exists
            helperText={errors.valueOne} // Show helper text for error
          />

          {/* State Dropdown */}
          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="state-select-label">{labelTwo}</InputLabel>
            <Select
              labelId="state-select-label"
              value={valueTwo || ''}
              onChange={(e) => {
                setValueTwo(e.target.value);
                if (errors.valueTwo) setErrors((prev) => ({ ...prev, valueTwo: '' })); // Clear error message for valueTwo
              }}
              error={!!errors.valueTwo} // Show error if exists
            >
              {states.map((state) => (
                <MenuItem key={state.id} value={state.id.toString()}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
            {errors.valueTwo && <p style={{ color: 'red' }}>{errors.valueTwo}</p>} {/* Show error message for valueTwo */}
          {/* </FormControl> */} 
          {/* <FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="state-select-label">{labelTwo}</InputLabel>
  <Select
    labelId="state-select-label"
    value={valueTwo || ''}
    onChange={(e) => {
      setValueTwo(e.target.value);
      if (errors.valueTwo) setErrors((prev) => ({ ...prev, valueTwo: '' })); // Clear error message for valueTwo
    }}
    error={!!errors.valueTwo}
    sx={{
      // Customize Select component styles
      backgroundColor: '#f5f5f5', // Dropdown background color
      borderRadius: '8px', // Rounded corners
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: errors.valueTwo ? 'red' : '#ccc', // Conditional border color
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3f51b5', // Focus border color
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3f51b5', // Hover border color
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          // Customize the dropdown (options) box
          maxHeight: 200, // Maximum height of dropdown
          backgroundColor: '#fff', // Background color of the dropdown
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)', // Shadow for dropdown
        },
      },
    }}
  >
    {states.map((state) => (
      <MenuItem
        key={state.id}
        value={state.id.toString()}
        sx={{
          // Customize MenuItem styles
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#e0f7fa', // Background on hover
          },
          '&.Mui-selected': {
            backgroundColor: '#b2ebf2', // Background when selected
            '&:hover': {
              backgroundColor: '#80deea', // Hover effect when selected
            },
          },
        }}
      >
        {state.name}
      </MenuItem>
    ))}
  </Select>
  {errors.valueTwo && <p style={{ color: 'red' }}>{errors.valueTwo}</p>}
</FormControl> */}

           <TextField
  id="outlined-select-state"
  select
  fullWidth
  label={labelTwo}
  value={valueTwo || ''}
  onChange={(e) => {
    setValueTwo(e.target.value);
    if (errors.valueTwo) setErrors((prev) => ({ ...prev, valueTwo: '' })); // Clear error message for valueTwo
  }}
  helperText={errors.valueTwo ? errors.valueTwo : ""}
  error={!!errors.valueTwo}
  sx={{
    mt: 1,
    // Customize TextField styles
    backgroundColor: '#f5f5f5', // Input background color
    borderRadius: '8px', // Rounded corners
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: errors.valueTwo ? 'red' : '#ccc', // Conditional border color
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3f51b5', // Focus border color
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3f51b5', // Hover border color
    },
  }}
>
  {states.map((state) => (
    <MenuItem
      key={state.id}
      value={state.id.toString()}
      sx={{
        fontWeight: 500,
        '&:hover': {
          backgroundColor: '#e0f7fa', // Background on hover
        },
        '&.Mui-selected': {
          backgroundColor: '#b2ebf2', // Background when selected
          '&:hover': {
            backgroundColor: '#80deea', // Hover effect when selected
          },
        },
      }}
    >
      {state.name}
    </MenuItem>
  ))}
</TextField> 
</Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            style={{
              background: '#FFFDFF',
              color: 'red',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            }}
            disabled={loading} // Disable button when loading
          >
            Cancel
          </Button>

          {/* Conditionally render Delete button when editing (EditId is not null) */}
          {EditId && handleDelete && (
            <Button
              onClick={handleDeleteClick} // Trigger delete confirmation dialog
              color="error"
              style={{
                background: 'red',
                color: 'white',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
              }}
              disabled={loading} // Disable button when loading
            >
              Delete
            </Button>
          )}

          <Button
            onClick={handleSubmit}
            color="primary"
            style={{
              background: 'red',
              color: 'white',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
            }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Processing..." : EditId ? "Update" : "Add"} {/* Show loading text */}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
      ></Dialog>
      <Dialog open={confirmDeleteOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this district? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablePopUpDropDown;
