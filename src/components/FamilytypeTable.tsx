// // import React, { useEffect, useState } from 'react';
// // import { 
// //     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField 
// // } from '@mui/material';
// // import { getFamilyTypes, addFamilyType, updateFamilyType, deleteFamilyType } from '../services/api';

// // const FamilyTypeTable: React.FC = () => {
// //     const [familyTypes, setFamilyTypes] = useState<any[]>([]);
// //     const [open, setOpen] = useState(false);
// //     const [currentFamilyType, setCurrentFamilyType] = useState<any>(null);

// //     useEffect(() => {
// //         fetchFamilyTypes();
// //     }, []);

// //     const fetchFamilyTypes = async () => {
// //         const response = await getFamilyTypes();
// //         setFamilyTypes(response.data);
// //     };

// //     const handleOpen = (familyType: any = null) => {
// //         setCurrentFamilyType(familyType);
// //         setOpen(true);
// //     };

// //     const handleClose = () => {
// //         setOpen(false);
// //         setCurrentFamilyType(null);
// //     };

// //     const handleSave = async () => {
// //         if (currentFamilyType.id) {
// //             await updateFamilyType(currentFamilyType.id, currentFamilyType);
// //         } else {
// //             await addFamilyType(currentFamilyType);
// //         }
// //         fetchFamilyTypes();
// //         handleClose();
// //     };

// //     const handleDelete = async (id: string) => {
// //         await deleteFamilyType(id);
// //         fetchFamilyTypes();
// //     };

// //     return (
// //         <Paper>
// //             <Button onClick={() => handleOpen()}>Add Family Type</Button>
// //             <TableContainer>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>ID</TableCell>
// //                             <TableCell>Name</TableCell>
// //                             <TableCell>Actions</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {familyTypes.map((type) => (
// //                             <TableRow key={type.id}>
// //                                 <TableCell>{type.id}</TableCell>
// //                                 <TableCell>{type.name}</TableCell>
// //                                 <TableCell>
// //                                     <Button onClick={() => handleOpen(type)}>Edit</Button>
// //                                     <Button onClick={() => handleDelete(type.id)}>Delete</Button>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //             <Dialog open={open} onClose={handleClose}>
// //                 <DialogTitle>{currentFamilyType?.id ? 'Edit Family Type' : 'Add Family Type'}</DialogTitle>
// //                 <DialogContent>
// //                     <TextField
// //                         label="Name"
// //                         value={currentFamilyType?.name || ''}
// //                         onChange={(e) => setCurrentFamilyType({ ...currentFamilyType, name: e.target.value })}
// //                         fullWidth
// //                     />
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={handleClose}>Cancel</Button>
// //                     <Button onClick={handleSave}>Save</Button>
// //                 </DialogActions>
// //             </Dialog>
// //         </Paper>
// //     );
// // };

// // export default FamilyTypeTable;






// // import React, { useState, useEffect, useMemo } from 'react';
// // import {
// //   Button,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   Container,
// //   Typography,
// //   IconButton,
// //   Pagination,
// //   Box,
// //   Grid,
// // } from '@mui/material';
// // import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
// // import axios from 'axios';
// // import Reuse from './Basic/Reuse';
// // import Notification, { notify, notifyDelete } from './TostNotification';
// // import { addFamilyType, deleteFamilyType, getFamilyTypes, updateFamilyType } from '../services/api';


// // interface FamilyType {
// //   id: number;
// //   name: string;
// // }


// // interface ColumnConfig<T> {
// //   field: keyof T;
// //   headerName: string;
// //   sortable: boolean;
// // }

// // const FamilyTypeTable: React.FC = () => {
// //   const [familyType,setFamilyType] = useState<FamilyType[]>([]);
// //   const [newLagnam, setNewLagnam] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [editLagnamId, setEditLagnamId] = useState<number | null>(null);
// //   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
// //   const [lagnamToDelete, setLagnamToDelete] = useState<number | null>(null);
// //   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

// //   useEffect(() => {
// //     fetchFamilyType();
// //   }, []);

// //   const fetchFamilyType = async () => {
// //     const response = await getFamilyTypes();
// //     setFamilyType(response.data);
// //   };

// //   const addOrUpdateFamilyType = async () => {
// //     const lagnamData = { name: newLagnam };
// //     if (currentFamilyType.id) {
// //      let response =  await updateFamilyType(currentFamilyType.id, currentFamilyType);
// //       if (response.status >= 200 || response.status <= 201) {
// //         notify('Successfully updated');
// //       }
// //     } else {
// //      let response = await addFamilyType(currentFamilyType);
// //      if (response.status >= 200 && response.status <= 201) {
// //       notify('Successfully updated');
// //     }
// //     }
// //     setNewLagnam('');
// //     setShowPopup(false);
// //     setEditLagnamId(null);
// //     fetchLagnams();
// //     setShowSuccessPopup(true);
// //   };

// //   const handleEditLagnam = (lagnam: Lagnam) => {
// //     setEditLagnamId(lagnam.id);
// //     setNewLagnam(lagnam.name);
// //     setShowPopup(true);
// //   };

// //   const handleDeleteLagnam = (id:number) => {
// //     setLagnamToDelete(id);
// //     setDeleteConfirmation(true);
// //   };

// //   const confirmDeleteFamilyType = async () => {
// //     if (lagnamToDelete !== null) {
// //      let response=await deleteFamilyType(id);
// //       if (response.status >= 200 || response.status <= 201) {
// //         notifyDelete('Successfully Deleted');
// //       }
// //       setLagnamToDelete(null);
// //       setDeleteConfirmation(false);
// //       fetchFamilyType()
// //     }
// //   };

// //   // const cancelDeleteLagnam = () => {
// //   //   setLagnamToDelete(null);
// //   //   setDeleteConfirmation(false);
// //   // };

// //   const columns : ColumnConfig<FamilyType>[] = useMemo(() => [
// //     {
// //       field: 'id',
// //       headerName: 'ID',
// //       sortable: true,
// //     },
// //     {
// //       field: 'name',
// //       headerName: 'Family Type',
// //       sortable: true,
// //     },
// //   ], []);

// //   return (
// //     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
// //       <Reuse
// //         data={familyType}
// //         columns={columns}
// //         handleSearchChange={setSearchQuery}
// //         handleEdit={handleEditLagnam}
// //         handleDelete={(id) => handleDeleteLagnam(Number(id))} 
// //         setShowPopup={setShowPopup}
// //         idField="id"
// //         title="Lagnam List"
// //       />


// // {showPopup && (
// //           <Dialog
// //             open={showPopup}
// //             onClose={() => setShowPopup(false)}
// //             maxWidth="sm"
// //             sx={{ background: '#f5f0ef ' }}
// //           >
// //             <Box>
// //               <DialogTitle
// //                 style={{
// //                   color: 'red',
// //                   textAlign: 'center',
// //                   fontWeight: 'bold',
// //                   marginTop: '20px',
// //                   fontSize: '50px',
// //                 }}
// //               >
// //                 {editLagnamId ? 'Edit Lagnam' : 'Add Lagnam'}
// //               </DialogTitle>
// //             </Box>
// //             <DialogContent style={{ padding: '50px 50px' }}>
// //               <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
// //                 <Grid item xs={12} sm={12}>
// //                   <TextField
// //                     label="Lagnam Name"
// //                     value={newLagnam}
// //                     onChange={(e) => setNewLagnam(e.target.value)}
// //                     fullWidth
// //                   />
// //                 </Grid>

// //               </Grid>
// //             </DialogContent>
// //             <DialogActions style={{ marginRight: '43px' }}>
// //               <Button
// //                 style={{
// //                   background: '#FFFDFF',
// //                   color: 'red',
// //                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
// //                 }}
// //                 onClick={() => setShowPopup(false)}
// //               >
// //                 Cancel
// //               </Button>
// //               <Button
// //                 style={{
// //                   background: 'red',
// //                   color: 'white',
// //                   boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
// //                 }}
// //                 onClick={addOrUpdateFamilyType} disabled={!newLagnam.trim()}
// //               >
// //                 {editLagnamId ? 'Update' : 'Submit'}
// //               </Button>
// //             </DialogActions>
// //           </Dialog>
// //         )}


// // {deleteConfirmation && (
// //           <Dialog
// //             open={deleteConfirmation}
// //             onClose={() => setDeleteConfirmation(false)}
// //           >
// //             <DialogTitle>Confirm Delete</DialogTitle>
// //             <DialogContent>
// //               <Typography>
// //               Are you sure you want to delete this Rasi?
// //               </Typography>
// //             </DialogContent>
// //             <DialogActions>
// //               <Button onClick={() => setDeleteConfirmation(false)}>
// //                 Cancel
// //               </Button>
// //               <Button onClick={confirmDeleteFamilyType} color="secondary">
// //                 Delete
// //               </Button>
// //             </DialogActions>
// //           </Dialog>
// //         )}

// // <Notification />

// //     </Container>
// //   );

// // };

// // export default FamilyTypeTable;


// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Container,
//   Typography,
//   Box,
//   Grid,
// } from '@mui/material';
// import { getFamilyTypes, addFamilyType, updateFamilyType, deleteFamilyType } from '../services/api';
// import Reuse from './Basic/Reuse';
// import Notification, { notify, notifyDelete } from './TostNotification';

// interface FamilyType {
//   id: number;
//   name: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const FamilyTypeTable: React.FC = () => {
//   const [familyTypes, setFamilyTypes] = useState<FamilyType[]>([]);
//   const [newFamilyTypeName, setNewFamilyTypeName] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [editFamilyTypeId, setEditFamilyTypeId] = useState<number | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [familyTypeToDelete, setFamilyTypeToDelete] = useState<number | null>(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   useEffect(() => {
//     fetchFamilyTypes();
//   }, []);

//   const fetchFamilyTypes = async () => {
//     const response = await getFamilyTypes();
//     setFamilyTypes(response.data);
//   };

//   const addOrUpdateFamilyType = async () => {
//     const familyTypeData = { name: newFamilyTypeName };
//     if (editFamilyTypeId) {
//       const response = await updateFamilyType(editFamilyTypeId.toString(), familyTypeData);
//       if (response.status >= 200 || response.status <= 201) {
//         notify('Successfully updated');
//       }
//     } else {
//       const response = await addFamilyType(familyTypeData);
//       if (response.status >= 200 || response.status <= 201) {
//         notify('Successfully added');
//       }
//     }
//     setNewFamilyTypeName('');
//     setShowPopup(false);
//     setEditFamilyTypeId(null);
//     fetchFamilyTypes();
//     setShowSuccessPopup(true);
//   };

//   const handleEditFamilyType = (familyType: FamilyType) => {
//     setEditFamilyTypeId(familyType.id);
//     setNewFamilyTypeName(familyType.name);
//     setShowPopup(true);
//   };



// const confirmDeleteFamilyType = async () => {
//     if (familyTypeToDelete !== null) {
//       const response = await deleteFamilyType(familyTypeToDelete.toString());
//       if (response.status >= 200 || response.status <= 201) {
//         notifyDelete('Successfully deleted');
//       }
//       setFamilyTypeToDelete(null);
//       setDeleteConfirmation(false);
//       fetchFamilyTypes();
//     }
//   };

//   const columns: ColumnConfig<FamilyType>[] = useMemo(() => [
//     {
//       field: 'id',
//       headerName: 'ID',
//       sortable: true,
//     },
//     {
//       field: 'name',
//       headerName: 'Family Type',
//       sortable: true,
//     },
//   ], []);

//   // const handleDeleteFamilyType = (key: keyof FamilyType) => {
//   //   if (key === "id" && typeof familyTypeToDelete === "number") {
//   //     setFamilyTypeToDelete(familyTypeToDelete);
//   //     setDeleteConfirmation(true);
//   //   }
//   // };
//   const handleDeleteFamilyType = (id: number) => {
//     setFamilyTypeToDelete(id);
//     setDeleteConfirmation(true);
//   };


//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
//       <Reuse
//         data={familyTypes}
//         columns={columns}
//         handleSearchChange={setSearchQuery}
//         handleEdit={handleEditFamilyType}
//         handleDelete={handleDeleteFamilyType}
//         setShowPopup={setShowPopup}
//         idField="id"
//         title="Family Type Listtt"
//       />

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
//                 fontSize: '50px',
//               }}
//             >
//               {editFamilyTypeId ? 'Edit Family Type' : 'Add Family Type'}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   label="Family Type Name"
//                   value={newFamilyTypeName}
//                   onChange={(e) => setNewFamilyTypeName(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions style={{ marginRight: '43px' }}>
//             <Button
//               style={{
//                 background: '#FFFDFF',
//                 color: 'red',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//               }}
//               onClick={() => setShowPopup(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={addOrUpdateFamilyType}
//               disabled={!newFamilyTypeName.trim()}
//             >
//               {editFamilyTypeId ? 'Update' : 'Submit'}
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
//             <Typography>
//               Are you sure you want to delete this Family Type?
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmation(false)}>
//               Cancel
//             </Button>
//             <Button onClick={confirmDeleteFamilyType} color="secondary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       <Notification />
//     </Container>
//   );
// };

// export default FamilyTypeTable;



import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getFamilyTypes, addFamilyType, updateFamilyType, deleteFamilyType } from '../services/api';

interface FamilyType {
  id: number;
  name: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const FamilyTypeTable: React.FC = () => {
  const [familyTypes, setFamilyTypes] = useState<FamilyType[]>([]);
  const [newFamilyType, setNewFamilyType] = useState<string | null>('');
  const [editFamilyTypeId, setEditFamilyTypeId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [familyTypeToDelete, setFamilyTypeToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchFamilyTypes();
  }, []);

  const fetchFamilyTypes = async () => {
    try {
      const response = await getFamilyTypes();
      setFamilyTypes(response.data);
    } catch (error) {
      console.error('Error fetching family types:', error);
    }
  };

  const handleDeleteFamilyType = async (id: number) => {
    try {
      await deleteFamilyType(id.toString());
      notifyDelete('Successfully Deleted');
      fetchFamilyTypes();
    } catch (error) {
      console.error('Error deleting family type:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setFamilyTypeToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (familyTypeToDelete !== null) {
      await handleDeleteFamilyType(familyTypeToDelete);
      setFamilyTypeToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleAddOrUpdateFamilyType = async () => {
    try {
      if (editFamilyTypeId) {
        await updateFamilyType(editFamilyTypeId.toString(), { name: newFamilyType, admin_user_id: adminUserID });
        notify('Successfully updated');
      } else {
        if (newFamilyType) {
          await addFamilyType({ name: newFamilyType, admin_user_id: adminUserID });
          notify('Family Type Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewFamilyType('');
      setEditFamilyTypeId(null);
      setShowPopup(false);
      fetchFamilyTypes();
    } catch (error) {
      console.error('Error adding/updating family type:', error);
    }
  };

  const handleEditType = (type: FamilyType) => {
    setEditFamilyTypeId(type.id);
    setNewFamilyType(type.name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditFamilyTypeId(null);
    setNewFamilyType('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<FamilyType>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Family Type', sortable: true },
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
          data={familyTypes}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Family Type List"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateFamilyType}
          EditId={editFamilyTypeId}
          valueOne={newFamilyType}
          setValueOne={setNewFamilyType}
          labelOne={'Family Type'}
          addMsg="Add Family Type"
          editMsg="Edit Family Type"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this family type?" setValueTwo={function (_value: string): void {
            throw new Error('Function not implemented.');
          }} valueTwo={null} setValueThree={function (_value: string): void {
            throw new Error('Function not implemented.');
          }} valueThree={null} setValueFour={function (_value: string): void {
            throw new Error('Function not implemented.');
          }} valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''} />
      </div>

    </Container>
  );
};

export default FamilyTypeTable;
