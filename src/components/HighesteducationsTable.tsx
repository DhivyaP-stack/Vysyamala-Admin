// // components/HighestEducationTable.tsx

// import React, { useEffect, useState } from 'react';
// import {
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getHighestEducations, addHighestEducation, updateHighestEducation, deleteHighestEducation } from '../services/api';

// // Define a TypeScript interface for Highest Education data
// interface HighestEducation {
//     id?: string;
//     degree: string;
// }

// const HighestEducationTable: React.FC = () => {
//     const [highestEducations, setHighestEducations] = useState<HighestEducation[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentHighestEducation, setCurrentHighestEducation] = useState<HighestEducation | null>(null);

//     useEffect(() => {
//         fetchHighestEducations();
//     }, []);

//     const fetchHighestEducations = async () => {
//         try {
//             const response = await getHighestEducations();
//             console.log("Fetched highest educations data:", response.data); // Log fetched data
//             setHighestEducations(response.data);
//         } catch (error) {
//             console.error("Error fetching highest educations:", error);
//         }
//     };

//     const handleOpen = (highestEducation: HighestEducation | null = null) => {
//         setCurrentHighestEducation(highestEducation);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentHighestEducation(null);
//     };

//     const handleSave = async () => {
//         if (!currentHighestEducation) return;

//         try {
//             if (currentHighestEducation.id) {
//                 await updateHighestEducation(currentHighestEducation.id, currentHighestEducation);
//             } else {
//                 await addHighestEducation(currentHighestEducation);
//             }
//             fetchHighestEducations();
//             handleClose();
//         } catch (error) {
//             console.error("Error saving highest education:", error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteHighestEducation(id);
//             fetchHighestEducations();
//         } catch (error) {
//             console.error("Error deleting highest education:", error);
//         }
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add Highest Education</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Degree</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {highestEducations.map((highestEducation) => (
//                             <TableRow key={highestEducation.id}>
//                                 <TableCell>{highestEducation.id}</TableCell>
//                                 <TableCell>{highestEducation.degree}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(highestEducation)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(highestEducation.id!)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentHighestEducation?.id ? 'Edit Highest Education' : 'Add Highest Education'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Degree"
//                         value={currentHighestEducation?.degree || ''}
//                         onChange={(e) => setCurrentHighestEducation({ ...currentHighestEducation, degree: e.target.value })}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Paper>
//     );
// };

// export default HighestEducationTable;


// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid } from '@mui/material';
// import Reuse from './Basic/Reuse';
// import { getHighestEducations, addHighestEducation, updateHighestEducation, deleteHighestEducation } from '../services/api';

// // Define a TypeScript interface for Highest Education data
// interface HighestEducation {
//     id?: string;
//     degree: string;
// }
// interface ColumnConfig<T> {
//     field: keyof T;
//     headerName: string;
//     sortable: boolean;
//   }

// const HighestEducationTable: React.FC = () => {
//     const [highestEducations, setHighestEducations] = useState<HighestEducation[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentHighestEducation, setCurrentHighestEducation] = useState<HighestEducation | null>(null);
//     const [showPopup, setShowPopup] = useState(false);
//     useEffect(() => {
//         fetchHighestEducations();
//     }, []);

//     const fetchHighestEducations = async () => {
//         try {
//             const response = await getHighestEducations();
//             console.log("Fetched highest educations data:", response.data);
//             setHighestEducations(response.data);
//         } catch (error) {
//             console.error("Error fetching highest educations:", error);
//         }
//     };

//     const handleSearchChange = (query: string) => {
//         // Implement search logic if needed, otherwise it's handled in Reuse component
//     };

//     const handleEdit = (item: HighestEducation) => {
//         setCurrentHighestEducation(item);
//         setOpen(true);
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteHighestEducation(id);
//             fetchHighestEducations();
//         } catch (error) {
//             console.error("Error deleting highest education:", error);
//         }
//     };

//     const handleSave = async () => {
//         if (!currentHighestEducation) return;

//         try {
//             if (currentHighestEducation.id) {
//                 await updateHighestEducation(currentHighestEducation.id, currentHighestEducation);
//             } else {
//                 await addHighestEducation(currentHighestEducation);
//             }
//             fetchHighestEducations();
//             handleClose();
//         } catch (error) {
//             console.error("Error saving highest education:", error);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentHighestEducation(null);
//     };

//     const columnConfig: ColumnConfig<HighestEducation>[]= [
//         { field: 'id', headerName: 'ID', sortable: true },
//         { field: 'degree', headerName: 'Degree', sortable: true },
//     ];

//     return (
//         <>
//             <Reuse
//                 data={highestEducations}
//                 columns={columnConfig}
//                 handleSearchChange={handleSearchChange}
//                 handleEdit={handleEdit}
//                 handleDelete={handleDelete}
//                 setShowPopup={setOpen}
//                 idField="id"
//                 title="Highest Education"
//             />
//             {/* <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentHighestEducation?.id ? 'Edit Highest Education' : 'Add Highest Education'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Degree"
//                         value={currentHighestEducation?.degree || ''}
//                         onChange={(e) => setCurrentHighestEducation({ ...currentHighestEducation, degree: e.target.value })}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSave}>Save</Button>
//                 </DialogActions>
//             </Dialog> */}


// {open && (
//           <Dialog
//             open={open}
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
//                   fontSize: '50px',
//                 }}
//               >
//                 {currentHighestEducation?.id ? 'Edit Highest Education' : 'Add Highest Education'}
//               </DialogTitle>
//             </Box>
//             <DialogContent  sx={{ px: 6, py: 4 }}>
//               <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//                 <Grid item xs={12}>
//                 <TextField
//                         label="Degree"
//                         value={currentHighestEducation?.degree || ''}
//                         onChange={(e) => setCurrentHighestEducation({ ...currentHighestEducation, degree: e.target.value })}
//                         fullWidth
//                     />
//                 </Grid>

//               </Grid>
//             </DialogContent>
//             <DialogActions  sx={{ mr: 5 }}>
//               <Button
//                 style={{
//                   background: '#FFFDFF',
//                   color: 'red',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 }}
//                 onClick={() => setShowPopup(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 style={{
//                   background: 'red',
//                   color: 'white',
//                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//                 }}
//                 onChange={(e) => setCurrentHighestEducation({ ...currentHighestEducation, degree: e.target.value })}
//                         fullWidth
//               >
//                 {currentHighestEducation ? 'Update' : 'Submit'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}



//         </>
//     );
// };

// // export default HighestEducationTable;
// import React, { useEffect, useState } from 'react';
// import {
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Button,
//     Box,
//     Grid,
//     Typography,
// } from '@mui/material';
// import Reuse from './Basic/Reuse';
// import { addHighestEducation, deleteHighestEducation, getHighestEducations, updateHighestEducation } from '../services/api';

// import Notification, { notify, notifyDelete } from './TostNotification';

// interface HighestEducation {
//     id?: string;
//     degree: string;
// }

// interface ColumnConfig<T> {
//     field: keyof T;
//     headerName: string;
//     sortable: boolean;
// }

// const HighestEducationTable: React.FC = () => {
//     const [highestEducations, setHighestEducations] = useState<HighestEducation[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentHighestEducation, setCurrentHighestEducation] = useState<HighestEducation | null>(null);
//     const [deleteConfirmation, setDeleteConfirmation] = useState(false);

//     useEffect(() => {
//         fetchHighestEducations();
//     }, []);

//     const fetchHighestEducations = async () => {
//         try {
//             const response =  await getHighestEducations();
//             console.log('Fetched highest educations data:', response.data);
//             setHighestEducations(response.data);
//         } catch (error) {
//             console.error('Error fetching highest educations:', error);
//         }
//     };

//     const handleSearchChange = (query: string) => {
//         // Implement search logic if needed, otherwise it's handled in Reuse component
//     };

//     const handleEdit = (item: HighestEducation) => {
//         setCurrentHighestEducation(item);
//         setOpen(true);
//     };

//     const handleDelete = async (id: string) => {
//         try {
//           let response = await deleteHighestEducation(id);
//             if (response.status >= 200 || response.status <= 201) {
//                 notifyDelete('Successfully Deleted');  
//               }
//             fetchHighestEducations();
//         } catch (error) {
//             console.error('Error deleting highest education:', error);
//         }
//     };

//     const handleSave = async () => {
//         if (!currentHighestEducation) return;

//         try {
//             let response;
//             if (currentHighestEducation.id) {
//                 console.log("Updating highest education:", currentHighestEducation);
//                 response= await updateHighestEducation(currentHighestEducation.id, currentHighestEducation);
//                 if (response.status >= 200 || response.status <= 201) {
//                     notify('Successfully updated');
//                   }
//             } else {
//                 console.log("Adding new highest education:", currentHighestEducation);
//                response = await addHighestEducation(currentHighestEducation);
//                 if (response.status >= 200 || response.status <= 201) {
//                     notify('Successfully updated');
//                   }
//             }
//             fetchHighestEducations();
//             handleClose();
//         } catch (error) {
//             console.error("Error saving highest education:", error);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentHighestEducation(null);
//     };

//     const confirmDelete = async () => {
//         if (currentHighestEducation && currentHighestEducation.id) {
//             await handleDelete(currentHighestEducation.id);
//             setDeleteConfirmation(false);
//             setCurrentHighestEducation(null);
//         }
//     };

//     const columnConfig: ColumnConfig<HighestEducation>[] = [
//         { field: 'id', headerName: 'ID', sortable: true },
//         { field: 'degree', headerName: 'Degree', sortable: true },
//     ];

//     return (
//         <>
//             <Reuse
//                 data={highestEducations}
//                 columns={columnConfig}
//                 handleSearchChange={handleSearchChange}
//                 handleEdit={handleEdit}
//                 handleDelete={(id: string) => {
//                     setCurrentHighestEducation(highestEducations.find((item) => item.id === id) || null);
//                     setDeleteConfirmation(true);
//                 }}
//                 setShowPopup={setOpen}
//                 idField="id"
//                 title="Highest Education"
//             />
//             {open && (
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}
//                     maxWidth="sm"
//                     sx={{ background: '#f5f0ef ' }}
//                 >
//                     <Box>
//                         <DialogTitle
//                             sx={{
//                                 color: 'red',
//                                 textAlign: 'center',
//                                 fontWeight: 'bold',
//                                 mt: 2,
//                                 fontSize: '30px',
//                             }}
//                         >
//                             {currentHighestEducation?.id ? 'Edit Highest Education' : 'Add Highest Education'}
//                         </DialogTitle>
//                     </Box>
//                     <DialogContent sx={{ px: 6, py: 4 }}>
//                         <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     label="Degree"
//                                     value={currentHighestEducation?.degree || ''}
//                                     onChange={(e) =>
//                                         setCurrentHighestEducation({
//                                             ...currentHighestEducation,
//                                             degree: e.target.value,
//                                         })
//                                     }
//                                     fullWidth
//                                 />
//                             </Grid>
//                         </Grid>
//                     </DialogContent>
//                     <DialogActions sx={{ mr: 5 }}>
//                         <Button
//                             sx={{
//                                 background: '#FFFDFF',
//                                 color: 'red',
//                                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                             }}
//                             onClick={handleClose}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             sx={{
//                                 background: 'red',
//                                 color: 'white',
//                                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//                             }}
//                             onClick={handleSave}
//                         >
//                             {currentHighestEducation?.id ? 'Update' : 'Submit'}
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             )}
//             {deleteConfirmation && (
//                 <Dialog
//                     open={deleteConfirmation}
//                     onClose={() => setDeleteConfirmation(false)}
//                 >
//                     <DialogTitle>Confirm Delete</DialogTitle>
//                     <DialogContent>
//                         <Typography>Are you sure you want to delete this record?</Typography>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
//                         <Button onClick={confirmDelete} color="secondary">
//                             Delete
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             )}
//              <Notification/>
//         </>
//     );
// };

// export default HighestEducationTable;




import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getEducationLevels, updateEducationLevel, deleteEducationLevel, addEducationLevel } from '../services/api';

interface EducationLevel {
  row_id: number;
  EducationLevel: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const HighestEducationTable: React.FC = () => {
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [newEducationLevel, setNewEducationLevel] = useState<string | null>('');
  const [editEducationLevelId, setEditEducationLevelId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [educationLevelToDelete, setEducationLevelToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');


  useEffect(() => {
    fetchEducationLevels();
  }, []);

  const fetchEducationLevels = async () => {
    try {
      const response = await getEducationLevels();
      setEducationLevels(
        response.data.map((item: { row_id: number; EducationLevel: string }) => ({
          row_id: item.row_id,
          EducationLevel: item.EducationLevel,
        }))
      );
    } catch (error) {
      console.error('Error fetching education levels:', error);
    }
  };

  const handleAddOrUpdateEducationLevel = async () => {
    try {
      if (editEducationLevelId) {
        await updateEducationLevel(editEducationLevelId.toString(), { EducationLevel: newEducationLevel!, admin_user_id: adminUserID });
        notify('Successfully updated');
      } else {
        if (newEducationLevel) {
          await addEducationLevel({ EducationLevel: newEducationLevel, admin_user_id: adminUserID });
          notify('Education Level Added Successfully');
        } else {
          notifyDelete('Please submit the required field');
        }
      }
      setNewEducationLevel('');
      setEditEducationLevelId(null);
      setShowPopup(false);
      fetchEducationLevels(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating education level:', error);
    }
  };

  const handleDeleteEducationLevel = async (id: number) => {
    try {
      await deleteEducationLevel(id.toString());
      notifyDelete('Successfully Deleted');
      fetchEducationLevels(); // Refresh the list
    } catch (error) {
      console.error('Error deleting education level:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setEducationLevelToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (educationLevelToDelete !== null) {
      await handleDeleteEducationLevel(educationLevelToDelete);
      setEducationLevelToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: EducationLevel) => {
    setEditEducationLevelId(value.row_id);
    setNewEducationLevel(value.EducationLevel);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditEducationLevelId(null);
    setNewEducationLevel('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<EducationLevel>[] = [
    { field: 'row_id', headerName: 'ID', sortable: true },
    { field: 'EducationLevel', headerName: 'Education Level', sortable: true },
  ];

  return (
    <Container
      style={{
        backgroundColor: 'white',
        padding: '20px',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <Reuse
          data={educationLevels}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="row_id"
          title="Highest Education"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateEducationLevel}
          EditId={editEducationLevelId}
          valueOne={newEducationLevel}
          setValueOne={setNewEducationLevel}
          valueTwo={null} // Not needed in this context
          setValueTwo={() => { }} // Not needed in this context
          labelOne="Education Level"
          labelTwo="" // Not needed in this context
          addMsg="Add Education Level"
          editMsg="Edit Education Level"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this education level?"
          setValueThree={() => { }} // Not needed
          valueThree={null} // Not needed
          setValueFour={() => { }} // Not needed
          valueFour={null} // Not needed
          LabelThree=""
          LabelFour=""
        />
      </div>

    </Container>
  );
};

export default HighestEducationTable;
