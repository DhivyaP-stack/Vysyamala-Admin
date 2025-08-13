
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   TextField,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import { useState } from 'react';

// type TablePropTypes = {
//   setShowPopup: (show: boolean) => void;
//   showPopup: boolean;
//   clearValues: () => void;
//   handleAddOrUpdate: () => Promise<void>; // Assuming handleAddOrUpdate is async
//   EditId: number | null;
//   setValueOne: (value: string) => void;
//   valueOne?: string | null;
//   setValueTwo: (value: string) => void;
//   valueTwo?: string | null;
//   setValueThree: (value: string) => void;
//   valueThree?: string | null;
//   setValueFour: (value: string) => void;
//   valueFour: string | null;
//   labelOne: string;
//   labelTwo: string;
//   LabelThree: string;
//   LabelFour: string;
//   addMsg: string;
//   editMsg: string;
//   deleteConfirmation: boolean;
//   setDeleteConfirmation: (show: boolean) => void;
//   deletFun: () => void;
//   deletLabel: string;
// };

// const TablePopUp: React.FC<TablePropTypes> = ({
//   setShowPopup,
//   showPopup,
//   clearValues,
//   handleAddOrUpdate,
//   EditId,
//   setValueOne,
//   valueOne,
//   setValueTwo,
//   valueTwo,
//   setValueThree,
//   valueThree,
//   setValueFour,
//   valueFour,
//   labelOne,
//   labelTwo,
//   LabelThree,
//   LabelFour,
//   addMsg,
//   editMsg,
//   deleteConfirmation,
//   setDeleteConfirmation,
//   deletFun,
//   deletLabel,
// }) => {
//   const [loading, setLoading] = useState(false); // Loading state

//   // Determine if only one field is visible
//   const singleFieldVisible = !labelTwo && !LabelThree && !LabelFour;

//   // Function to handle the submit or update action
//   const handleSubmitOrUpdate = async () => {
//     setLoading(true);
//     try {
//       await handleAddOrUpdate(); // Call the passed in async function
//     } catch (error) {
//       console.error("Error submitting the form", error);
//     } finally {
//       setLoading(false); // Reset loading state once action is complete
//     }
//   };

//   return (
//     <>
//       <div>
//         {showPopup && (
//           <Dialog
//             open={showPopup}
//             onClose={() => setShowPopup(false)}
//             maxWidth="sm"
//             sx={{ background: '#f5f0ef ' }}
//           >
//             <Box>
//               <DialogTitle
//                 style={{
//                   color: 'red',
//                   textAlign: 'center',
//                   fontWeight: 'bold',
//                   marginTop: '20px',
//                   fontSize: '30px',
//                 }}
//               >
//                 {EditId ? editMsg : addMsg}
//               </DialogTitle>
//             </Box>
//             <DialogContent style={{ padding: '50px 50px' }}>
//               <Grid
//                 container
//                 spacing={singleFieldVisible ? 0 : 3} // No spacing if single field
//                 justifyContent={singleFieldVisible ? 'center' : 'flex-start'} // Center single field
//               >
//                 <Grid item xs={12} sm={singleFieldVisible ? 12 : 6}>
//                   <TextField
//                     label={labelOne}
//                     value={valueOne}
//                     onChange={(e) => setValueOne(e.target.value)}
//                     fullWidth
//                     style={{
//                       marginBottom: singleFieldVisible ? '20px' : '0px',
//                       textAlign: singleFieldVisible ? 'center' : 'left', // Center field text if only one field
//                     }}
//                   />
//                 </Grid>

//                 {!singleFieldVisible && labelTwo && (
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       value={valueTwo}
//                       onChange={(e) => setValueTwo(e.target.value)}
//                       label={labelTwo}
//                       fullWidth
//                     />
//                   </Grid>
//                 )}

//                 {!singleFieldVisible && LabelThree && (
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       value={valueThree}
//                       onChange={(e) => setValueThree(e.target.value)}
//                       label={LabelThree}
//                       fullWidth
//                     />
//                   </Grid>
//                 )}

//                 {!singleFieldVisible && LabelFour && (
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       value={valueFour}
//                       onChange={(e) => setValueFour(e.target.value)}
//                       label={LabelFour}
//                       fullWidth
//                     />
//                   </Grid>
//                 )}
//               </Grid>
//             </DialogContent>
//             <DialogActions style={{ marginRight: '43px' }}>
//               <Button
//                 style={{
//                   background: '#FFFDFF',
//                   color: 'red',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 }}
//                 onClick={clearValues}
//                 disabled={loading} // Disable button while loading
//               >
//                 Cancel
//               </Button>
//               <Button
//                 style={{
//                   background: 'red',
//                   color: 'white',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//                 }}
//                 onClick={handleSubmitOrUpdate}
//                 disabled={loading} // Disable button while loading
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : EditId ? 'Update' : 'Submit'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </div>

//       <div>
//         {deleteConfirmation && (
//           <Dialog
//             open={deleteConfirmation}
//             onClose={() => setDeleteConfirmation(false)}
//           >
//             <DialogTitle>Confirm Delete</DialogTitle>
//             <DialogContent>
//               <Typography>{deletLabel}</Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
//               <Button onClick={deletFun} color="secondary">
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
//       </div>
//     </>
//   );
// };

// export default TablePopUp;




// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   TextField,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import { useState } from 'react';

// type TablePropTypes = {
//   setShowPopup: (show: boolean) => void;
//   showPopup: boolean;
//   clearValues: () => void;
//   handleAddOrUpdate: () => Promise<void>; // Assuming handleAddOrUpdate is async
//   EditId: number | null;
//   setValueOne: (value: string) => void;
//   valueOne?: string | null;
//   setValueTwo: (value: string) => void;
//   valueTwo?: string | null;
//   setValueThree: (value: string) => void;
//   valueThree?: string | null;
//   setValueFour: (value: string) => void;
//   valueFour: string | null;
//   labelOne: string;
//   labelTwo: string;
//   LabelThree: string;
//   LabelFour: string;
//   addMsg: string;
//   editMsg: string;
//   deleteConfirmation: boolean;
//   setDeleteConfirmation: (show: boolean) => void;
//   deletFun: () => void;
//   deletLabel: string;
// };

// const TablePopUp: React.FC<TablePropTypes> = ({
//   setShowPopup,
//   showPopup,
//   clearValues,
//   handleAddOrUpdate,
//   EditId,
//   setValueOne,
//   valueOne,
//   setValueTwo,
//   valueTwo,
//   setValueThree,
//   valueThree,
//   setValueFour,
//   valueFour,
//   labelOne,
//   labelTwo,
//   LabelThree,
//   LabelFour,
//   addMsg,
//   editMsg,
//   deleteConfirmation,
//   setDeleteConfirmation,
//   deletFun,
//   deletLabel,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<{
//     valueOne: string;
//     valueTwo: string;
//     valueThree: string;
//     valueFour: string;
//   }>({
//     valueOne: '',
//     valueTwo: '',
//     valueThree: '',
//     valueFour: '',
//   });

//   const singleFieldVisible = !labelTwo && !LabelThree && !LabelFour;

//   const handleSubmitOrUpdate = async () => {
//     setLoading(true);
//     setErrors({ valueOne: '', valueTwo: '', valueThree: '', valueFour: '' }); // Reset errors

//     // Validation logic
//     let hasError = false;
//     if (!valueOne) {
//       setErrors((prev) => ({ ...prev, valueOne: `${labelOne} is required` }));
//       hasError = true;
//     }
//     if (labelTwo && !valueTwo) {
//       setErrors((prev) => ({ ...prev, valueTwo: `${labelTwo} is required` }));
//       hasError = true;
//     }
//     if (LabelThree && !valueThree) {
//       setErrors((prev) => ({ ...prev, valueThree: `${LabelThree} is required` }));
//       hasError = true;
//     }
//     if (LabelFour && !valueFour) {
//       setErrors((prev) => ({ ...prev, valueFour: `${LabelFour} is required` }));
//       hasError = true;
//     }

//     if (hasError) {
//       setLoading(false);
//       return; // Exit if there are validation errors
//     }

//     try {
//       await handleAddOrUpdate(); // Call the passed in async function
//     } catch (error) {
//       console.error("Error submitting the form", error);
//     } finally {
//       setLoading(false); // Reset loading state once action is complete
//     }
//   };

//   const handleInputChange = (setter: (value: string) => void, field: keyof typeof errors) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setter(e.target.value);
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error message for the field
//     }
//   };

//   return (
//     <>
//       {showPopup && (
//         <Dialog
//           open={showPopup}
//           onClose={() => setShowPopup(false)}
//           maxWidth="sm"
//           sx={{ background: '#f5f0ef ' }}
//         >
//           <Box>
//             <DialogTitle
//               style={{
//                 color: 'red',
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 marginTop: '20px',
//                 fontSize: '30px',
//               }}
//             >
//               {EditId ? editMsg : addMsg}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid
//               container
//               spacing={singleFieldVisible ? 0 : 3}
//               justifyContent={singleFieldVisible ? 'center' : 'flex-start'}
//             >
//               <Grid item xs={12} sm={singleFieldVisible ? 12 : 6}>
//                 <TextField
//                   label={labelOne}
//                   value={valueOne}
//                   onChange={handleInputChange(setValueOne, 'valueOne')}
//                   fullWidth
//                   error={!!errors.valueOne}
//                   helperText={errors.valueOne}
//                   style={{
//                     marginBottom: singleFieldVisible ? '20px' : '0px',
//                     textAlign: singleFieldVisible ? 'center' : 'left',
//                   }}
//                 />
//               </Grid>

//               {!singleFieldVisible && labelTwo && (
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     value={valueTwo}
//                     onChange={handleInputChange(setValueTwo, 'valueTwo')}
//                     label={labelTwo}
//                     fullWidth
//                     error={!!errors.valueTwo}
//                     helperText={errors.valueTwo}
//                   />
//                 </Grid>
//               )}

//               {!singleFieldVisible && LabelThree && (
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     value={valueThree}
//                     onChange={handleInputChange(setValueThree, 'valueThree')}
//                     label={LabelThree}
//                     fullWidth
//                     error={!!errors.valueThree}
//                     helperText={errors.valueThree}
//                   />
//                 </Grid>
//               )}

//               {!singleFieldVisible && LabelFour && (
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     value={valueFour}
//                     onChange={handleInputChange(setValueFour, 'valueFour')}
//                     label={LabelFour}
//                     fullWidth
//                     error={!!errors.valueFour}
//                     helperText={errors.valueFour}
//                   />
//                 </Grid>
//               )}
//             </Grid>
//           </DialogContent>
//           <DialogActions style={{ marginRight: '43px' }}>
//             <Button
//               style={{
//                 background: '#FFFDFF',
//                 color: 'red',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//               }}
//               onClick={clearValues}
//               disabled={loading}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={handleSubmitOrUpdate}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : EditId ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {deleteConfirmation && (
//         <Dialog
//           open={deleteConfirmation}
//           onClose={() => setDeleteConfirmation(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>{deletLabel}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
//             <Button onClick={deletFun} color="secondary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </>
//   );
// };

// export default TablePopUp;




import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';

type TablePropTypes = {
  setShowPopup: (show: boolean) => void;
  showPopup: boolean;
  clearValues: () => void;
  handleAddOrUpdate: () => Promise<void>; // Assuming handleAddOrUpdate is async
  EditId: number | null;
  setValueOne: (value: string) => void;
  valueOne?: string | null;
  setValueTwo: (value: string) => void;
  valueTwo?: string | null;
  setValueThree: (value: string) => void;
  valueThree?: string | null;
  setValueFour: (value: string) => void;
  valueFour: string | null;
  labelOne: string;
  labelTwo: string;
  LabelThree: string;
  LabelFour: string;
  addMsg: string;
  editMsg: string;
  deleteConfirmation: boolean;
  setDeleteConfirmation: (show: boolean) => void;
  deletFun: () => void;
  deletLabel: string;
};

const TablePopUp: React.FC<TablePropTypes> = ({
  setShowPopup,
  showPopup,
  clearValues,
  handleAddOrUpdate,
  EditId,
  setValueOne,
  valueOne,
  setValueTwo,
  valueTwo,
  setValueThree,
  valueThree,
  setValueFour,
  valueFour,
  labelOne,
  labelTwo,
  LabelThree,
  LabelFour,
  addMsg,
  editMsg,
  deleteConfirmation,
  setDeleteConfirmation,
  deletFun,
  deletLabel,
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    valueOne: string;
    valueTwo: string;
    valueThree: string;
    valueFour: string;
  }>({
    valueOne: '',
    valueTwo: '',
    valueThree: '',
    valueFour: '',
  });

  const singleFieldVisible = !labelTwo && !LabelThree && !LabelFour;

  const handleSubmitOrUpdate = async () => {
    setLoading(true);
    setErrors({ valueOne: '', valueTwo: '', valueThree: '', valueFour: '' }); // Reset errors

    // Validation logic
    let hasError = false;
    if (!valueOne) {
      setErrors((prev) => ({ ...prev, valueOne: `${labelOne} is required` }));
      hasError = true;
    }
    if (labelTwo && !valueTwo) {
      setErrors((prev) => ({ ...prev, valueTwo: `${labelTwo} is required` }));
      hasError = true;
    }
    if (LabelThree && !valueThree) {
      setErrors((prev) => ({ ...prev, valueThree: `${LabelThree} is required` }));
      hasError = true;
    }
    if (LabelFour && !valueFour) {
      setErrors((prev) => ({ ...prev, valueFour: `${LabelFour} is required` }));
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return; // Exit if there are validation errors
    }

    try {
      await handleAddOrUpdate(); // Call the passed in async function
    } catch (error) {
      console.error("Error submitting the form", error);
    } finally {
      setLoading(false); // Reset loading state once action is complete
    }
  };

  const handleInputChange = (setter: (value: string) => void, field: keyof typeof errors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error message for the field
    }
  };

  const clearValuesAndErrors = () => {
    clearValues();
    setErrors({ valueOne: '', valueTwo: '', valueThree: '', valueFour: '' }); // Reset errors
    setShowPopup(false); // Close the dialog
  };

  return (
    <>
      {showPopup && (
        <Dialog
          open={showPopup}
          onClose={() => {
            setShowPopup(false);
            setErrors({ valueOne: '', valueTwo: '', valueThree: '', valueFour: '' }); // Reset errors on close
          }}
          maxWidth="sm"
          sx={{ background: '#f5f0ef ' }}
        >
          <Box>
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
          </Box>
          <DialogContent style={{ padding: '50px 50px' }}>
            <Grid
              container
              spacing={singleFieldVisible ? 0 : 3}
              justifyContent={singleFieldVisible ? 'center' : 'flex-start'}
            >
              <Grid item xs={12} sm={singleFieldVisible ? 12 : 6}>
                <TextField
                  label={labelOne}
                  value={valueOne}
                  onChange={handleInputChange(setValueOne, 'valueOne')}
                  fullWidth
                  error={!!errors.valueOne}
                  helperText={errors.valueOne}
                  style={{
                    marginBottom: singleFieldVisible ? '20px' : '0px',
                    textAlign: singleFieldVisible ? 'center' : 'left',
                  }}
                />
              </Grid>

              {!singleFieldVisible && labelTwo && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={valueTwo}
                    onChange={handleInputChange(setValueTwo, 'valueTwo')}
                    label={labelTwo}
                    fullWidth
                    error={!!errors.valueTwo}
                    helperText={errors.valueTwo}
                  />
                </Grid>
              )}

              {!singleFieldVisible && LabelThree && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={valueThree}
                    onChange={handleInputChange(setValueThree, 'valueThree')}
                    label={LabelThree}
                    fullWidth
                    error={!!errors.valueThree}
                    helperText={errors.valueThree}
                  />
                </Grid>
              )}

              {!singleFieldVisible && LabelFour && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={valueFour}
                    onChange={handleInputChange(setValueFour, 'valueFour')}
                    label={LabelFour}
                    fullWidth
                    error={!!errors.valueFour}
                    helperText={errors.valueFour}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: '43px' }}>
            <Button
              style={{
                background: '#FFFDFF',
                color: 'red',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              }}
              onClick={clearValuesAndErrors}  // clearValuesAndErrors now resets errors as well
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: 'red',
                color: 'white',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
              }}
              onClick={handleSubmitOrUpdate}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : EditId ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {deleteConfirmation && (
        <Dialog
          open={deleteConfirmation}
          onClose={() => setDeleteConfirmation(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>{deletLabel}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
            <Button onClick={deletFun} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default TablePopUp;
