// // import React, { useEffect, useState } from 'react';
// // import { 
// //     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField 
// // } from '@mui/material';
// // import { getFamilyStatuses, addFamilyStatus, updateFamilyStatus, deleteFamilyStatus } from '../../src/services/api';

// // const FamilyStatusTable: React.FC = () => {
// //     const [familyStatuses, setFamilyStatuses] = useState<any[]>([]);
// //     const [open, setOpen] = useState(false);
// //     const [currentFamilyStatus, setCurrentFamilyStatus] = useState<any>(null);

// //     useEffect(() => {
// //         fetchFamilyStatuses();
// //     }, []);

// //     const fetchFamilyStatuses = async () => {
// //         const response = await getFamilyStatuses();
// //         setFamilyStatuses(response.data);
// //     };

// //     const handleOpen = (familyStatus: any = null) => {
// //         setCurrentFamilyStatus(familyStatus);
// //         setOpen(true);
// //     };

// //     const handleClose = () => {
// //         setOpen(false);
// //         setCurrentFamilyStatus(null);
// //     };

// //     const handleSave = async () => {
// //         if (currentFamilyStatus.id) {
// //             await updateFamilyStatus(currentFamilyStatus.id, currentFamilyStatus);
// //         } else {
// //             await addFamilyStatus(currentFamilyStatus);
// //         }
// //         fetchFamilyStatuses();
// //         handleClose();
// //     };

// //     const handleDelete = async (id: string) => {
// //         await deleteFamilyStatus(id);
// //         fetchFamilyStatuses();
// //     };

// //     return (
// //         <Paper>
// //             <Button onClick={() => handleOpen()}>Add Family Status</Button>
// //             <TableContainer>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>ID</TableCell>
// //                             <TableCell>Status</TableCell>
// //                             <TableCell>Actions</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {familyStatuses.map((status) => (
// //                             <TableRow key={status.id}>
// //                                 <TableCell>{status.id}</TableCell>
// //                                 <TableCell>{status.status}</TableCell>
// //                                 <TableCell>
// //                                     <Button onClick={() => handleOpen(status)}>Edit</Button>
// //                                     <Button onClick={() => handleDelete(status.id)}>Delete</Button>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //             <Dialog open={open} onClose={handleClose}>
// //                 <DialogTitle>{currentFamilyStatus?.id ? 'Edit Family Status' : 'Add Family Status'}</DialogTitle>
// //                 <DialogContent>
// //                     <TextField
// //                         label="Status"
// //                         value={currentFamilyStatus?.status || ''}
// //                         onChange={(e) => setCurrentFamilyStatus({ ...currentFamilyStatus, status: e.target.value })}
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

// // export default FamilyStatusTable;


// // import React, { useEffect, useState } from 'react';
// // import { 
// //     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField 
// // } from '@mui/material';
// // import { getFamilyStatuses, addFamilyStatus, updateFamilyStatus, deleteFamilyStatus } from '../../src/services/api';

// // interface FamilyStatus {
// //     id?: string;
// //     status: string;
// // }

// // const FamilyStatusTable: React.FC = () => {
// //     const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
// //     const [open, setOpen] = useState(false);
// //     const [currentFamilyStatus, setCurrentFamilyStatus] = useState<FamilyStatus | null>(null);

// //     useEffect(() => {
// //         fetchFamilyStatuses();
// //     }, []);

// //     const fetchFamilyStatuses = async () => {
// //         try {
// //             const response = await getFamilyStatuses();
// //             setFamilyStatuses(response.data);
// //         } catch (error) {
// //             console.error("Failed to fetch family statuses:", error);
// //         }
// //     };

// //     const handleOpen = (familyStatus: FamilyStatus | null = null) => {
// //         setCurrentFamilyStatus(familyStatus);
// //         setOpen(true);
// //     };

// //     const handleClose = () => {
// //         setOpen(false);
// //         setCurrentFamilyStatus(null);
// //     };

// //     const handleSave = async () => {
// //         if (currentFamilyStatus) {
// //             try {
// //                 if (currentFamilyStatus.id) {
// //                     await updateFamilyStatus(currentFamilyStatus.id, currentFamilyStatus);
// //                 } else {
// //                     await addFamilyStatus(currentFamilyStatus);
// //                 }
// //                 fetchFamilyStatuses();
// //                 handleClose();
// //             } catch (error) {
// //                 console.error("Failed to save family status:", error);
// //             }
// //         }
// //     };

// //     const handleDelete = async (id: string) => {
// //         try {
// //             await deleteFamilyStatus(id);
// //             fetchFamilyStatuses();
// //         } catch (error) {
// //             console.error("Failed to delete family status:", error);
// //         }
// //     };

// //     return (
// //         <Paper>
// //             <Button onClick={() => handleOpen()}>Add Family Status</Button>
// //             <TableContainer>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>ID</TableCell>
// //                             <TableCell>Status</TableCell>
// //                             <TableCell>Actions</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {familyStatuses.map((status) => (
// //                             <TableRow key={status.id}>
// //                                 <TableCell>{status.id}</TableCell>
// //                                 <TableCell>{status.status}</TableCell>
// //                                 <TableCell>
// //                                     <Button onClick={() => handleOpen(status)}>Edit</Button>
// //                                     <Button
// //                     onClick={() => {
// //                         if (status.id) {
// //                             handleDelete(status.id);
// //                         } else {
// //                             console.error("Status ID is undefined");
// //                         }
// //                     }}
// //                 >
// //                     Delete
// //                 </Button>

// //                                 </TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //             <Dialog open={open} onClose={handleClose}>
// //                 <DialogTitle>{currentFamilyStatus?.id ? 'Edit Family Status' : 'Add Family Status'}</DialogTitle>
// //                 <DialogContent>
// //                     <TextField
// //                         label="Status"
// //                         value={currentFamilyStatus?.status || ''}
// //                         onChange={(e) => setCurrentFamilyStatus({ ...currentFamilyStatus, status: e.target.value })}
// //                         fullWidth
// //                     />
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={handleClose}>Cancel</Button>
// //                     <Button onClick={handleSave} disabled={!currentFamilyStatus?.status}>Save</Button>
// //                 </DialogActions>
// //             </Dialog>
// //         </Paper>
// //     );
// // };

// // export default FamilyStatusTable;


// import React, { useEffect, useState } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Grid, Typography, Container
// } from '@mui/material';
// import { getFamilyStatuses, addFamilyStatus, updateFamilyStatus, deleteFamilyStatus } from '../../src/services/api';
// import Reuse from './Basic/Reuse';
// import Notification, { notify, notifyDelete } from './TostNotification';

// interface FamilyStatus {
//   id: string;
//   status: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const columns: ColumnConfig<FamilyStatus>[] = [
//   { field: 'id', headerName: 'ID', sortable: true },
//   { field: 'status', headerName: 'Status', sortable: true },
// ];

// const FamilyStatusTable: React.FC = () => {
//   const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
//   const [open, setOpen] = useState(false);
//   const [currentFamilyStatus, setCurrentFamilyStatus] = useState<FamilyStatus | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [selectedIdForDelete, setSelectedIdForDelete] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchFamilyStatuses();
//   }, []);

//   const fetchFamilyStatuses = async () => {
//     try {
//       const response = await getFamilyStatuses();
//       setFamilyStatuses(response.data);
//     } catch (error) {
//       console.error('Error fetching family statuses:', error);
//     }
//   };

//   const handleAdd = () => {
//     setCurrentFamilyStatus({ id: '', status: '' });
//     setOpen(true);
//   };

//   const handleEdit = (item: FamilyStatus) => {
//     setCurrentFamilyStatus(item);
//     setOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setSelectedIdForDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteStatus = async (id: string) => {
//     if (!selectedIdForDelete) return;

//     try {
//       const response = await deleteFamilyStatus(id);
//       if (response.status >= 200 && response.status <= 299) {
//         setFamilyStatuses(prev => prev.filter(status => status.id !== selectedIdForDelete));
//         notifyDelete('Successfully Deleted');
//       }
//       setDeleteConfirmation(false);
//       setSelectedIdForDelete(null);
//     } catch (error) {
//       console.error('Error deleting family status:', error);
//     }
//   };

//   const handleSave = async () => {
//     if (!currentFamilyStatus) return;

//     try {
//       if (currentFamilyStatus.id) {
//         const response = await updateFamilyStatus(currentFamilyStatus.id, currentFamilyStatus);
//         if (response.status >= 200 && response.status <= 299) {
//           setFamilyStatuses(prev =>
//             prev.map(status => status.id === currentFamilyStatus.id ? response.data : status)
//           );
//           notify('Successfully updated');
//         }
//       } else {
//         const response = await addFamilyStatus(currentFamilyStatus);
//         if (response.status >= 200 && response.status <= 299) {
//           setFamilyStatuses(prev => [...prev, response.data]);
//           notify('Successfully added');
//         }
//       }
//       handleClose();
//     } catch (error) {
//       console.error('Error saving family status:', error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentFamilyStatus(null);
//   };

//   const handleSearchChange = (query: string) => {
//     setSearchQuery(query);
//   };

//   const filteredStatuses = familyStatuses.filter((status) =>
//     status.status.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Container style={{ backgroundColor: 'white', padding: '20px' }}>
//       <Reuse
//         data={filteredStatuses}
//         columns={columns}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//         setShowPopup={handleAdd}
//         idField="id"
//         title="Family Statusesss"
//         handleSearchChange={handleSearchChange}
//       />

//       {deleteConfirmation && (
//         <Dialog
//           open={deleteConfirmation}
//           onClose={() => setDeleteConfirmation(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>Are you sure you want to delete this Family Status?</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmation(false)}>
//               Cancel
//             </Button>
//             <Button onClick={() => confirmDeleteStatus(selectedIdForDelete!)} color="secondary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       {open && (
//         <Dialog
//           open={open}
//           onClose={handleClose}
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
//               {currentFamilyStatus?.id ? 'Edit Family Status' : 'Add Family Status'}
//             </DialogTitle>
//           </Box>
//           <DialogContent style={{ padding: '50px 50px' }}>
//             <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
//               <Grid item xs={12} sm={12}>
//                 <TextField
//                   label="Status"
//                   value={currentFamilyStatus?.status || ''}
//                   onChange={(e) =>
//                     setCurrentFamilyStatus(prev => ({
//                       ...(prev || { id: '' }),
//                       status: e.target.value,
//                     }))
//                   }
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
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button
//               style={{
//                 background: 'red',
//                 color: 'white',
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
//               }}
//               onClick={handleSave}
//               disabled={!currentFamilyStatus?.status?.trim()} 
//             >
//               {currentFamilyStatus?.id ? 'Update' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}

//       <Notification />
//     </Container>
//   );
// };

// export default FamilyStatusTable;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container } from '@mui/material';
// import Notification, { notify, notifyDelete } from './TostNotification';
// import Reuse from './Basic/Reuse';
// import TablePopUp from './TablePopUp';
// import {  addFamilyStatus, updateFamilyStatus,  getFamilyStatuses, deleteFamilyStatus } from '../services/api';

// interface FamilyStatus {
//   id: number;
//   status: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const FamilyStatusTable: React.FC = () => {
//   const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
//   const [newFamilyStatus, setNewFamilyStatus] = useState<string | null>('');
//   const [editFamilyStatusId, setEditFamilyStatusId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
//   const [familyStatusToDelete, setFamilyStatusToDelete] = useState<number | null>(null);

//   useEffect(() => {
//     fetchFamilyStatuses();
//   }, []);

//   const fetchFamilyStatuses = async () => {
//     try {
//       const response = await getFamilyStatuses();
//       setFamilyStatuses(response.data);
//     } catch (error) {
//       console.error('Error fetching family statuses:', error);
//     }
//   };

//   const handleDeleteFamilyStatus = async (id: number) => {
//     try {
//       await deleteFamilyStatus(id.toString());
//       notifyDelete('Successfully Deleted');
//       fetchFamilyStatuses();
//     } catch (error) {
//       console.error('Error deleting family status:', error);
//     }
//   };

//   const handleDeleteStatus = (id: number) => {
//     setFamilyStatusToDelete(id);
//     setDeleteConfirmation(true);
//   };

//   const confirmDeleteStatus = async () => {
//     if (familyStatusToDelete !== null) {
//       await handleDeleteFamilyStatus(familyStatusToDelete);
//       setFamilyStatusToDelete(null);
//       setDeleteConfirmation(false);
//     }
//   };

//   const handleAddOrUpdateFamilyStatus = async () => {
//     try {
//       if (editFamilyStatusId) {
//         await updateFamilyStatus(editFamilyStatusId.toString(), { status: newFamilyStatus });
//         notify('Successfully updated');
//       } else {
//         if (newFamilyStatus) {
//           await addFamilyStatus({ status: newFamilyStatus });
//           notify('Family Status Added Successfully');
//         } else {
//           notifyDelete('Please submit all required fields');
//         }
//       }
//       setNewFamilyStatus('');
//       setEditFamilyStatusId(null);
//       setShowPopup(false);
//       fetchFamilyStatuses();
//     } catch (error) {
//       console.error('Error adding/updating family status:', error);
//     }
//   };

//   const handleEditStatus = (status: FamilyStatus) => {
//     setEditFamilyStatusId(status.id);
//     setNewFamilyStatus(status.status);
//     setShowPopup(true);
//   };

//   const clearValues = () => {
//     setEditFamilyStatusId(null);
//     setNewFamilyStatus('');
//     setShowPopup(false);
//   };

//   const columns: ColumnConfig<FamilyStatus>[] = [
//     { field: 'id', headerName: 'ID', sortable: true },
//     { field: 'status', headerName: 'Family Status', sortable: true },
//   ];

//   return (
//     <Container
//       style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         width: '100%',
//         maxWidth: '100vw',
//         boxSizing: 'border-box',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '8px',
//         }}
//       >
//         <Reuse
//           data={familyStatuses}
//           columns={columns}
//           handleSearchChange={(query) => setSearchQuery(query)}
//           handleEdit={handleEditStatus}
//           handleDelete={(id) => handleDeleteStatus(Number(id))}
//           setShowPopup={setShowPopup}
//           idField="id"
//           title="Family Status List"
//         />
//         <TablePopUp
//           setShowPopup={setShowPopup}
//           showPopup={showPopup}
//           clearValues={clearValues}
//           handleAddOrUpdate={handleAddOrUpdateFamilyStatus}
//           EditId={editFamilyStatusId}
//           valueOne={newFamilyStatus}
//           setValueOne={setNewFamilyStatus}
//           labelOne={'Family Status'}
//           addMsg="Add Family Status"
//           editMsg="Edit Family Status"
//           deleteConfirmation={deleteConfirmation}
//           setDeleteConfirmation={setDeleteConfirmation}
//           deletFun={confirmDeleteStatus}
//           deletLabel="Are you sure you want to delete this family status?" setValueTwo={function (_value: string): void {
//             throw new Error('Function not implemented.');
//           } } valueTwo={null} setValueThree={function (_value: string): void {
//             throw new Error('Function not implemented.');
//           } } valueThree={null} setValueFour={function (_value: string): void {
//             throw new Error('Function not implemented.');
//           } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''}        />
//       </div>
//       <Notification />
//     </Container>
//   );
// };

// export default FamilyStatusTable;




import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import {  addFamilyStatus, updateFamilyStatus,  getFamilyStatuses, deleteFamilyStatus } from '../services/api';

interface FamilyStatus {
  id: number;
  status: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const FamilyStatusTable: React.FC = () => {
  const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
  const [newFamilyStatus, setNewFamilyStatus] = useState<string | null>('');
  const [editFamilyStatusId, setEditFamilyStatusId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [familyStatusToDelete, setFamilyStatusToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchFamilyStatuses();
  }, []);

  const fetchFamilyStatuses = async () => {
    try {
      const response = await getFamilyStatuses();
      setFamilyStatuses(response.data);
    } catch (error) {
      console.error('Error fetching family statuses:', error);
    }
  };

  const handleDeleteFamilyStatus = async (id: number) => {
    try {
      await deleteFamilyStatus(id.toString());
      notifyDelete('Successfully Deleted');
      fetchFamilyStatuses();
    } catch (error) {
      console.error('Error deleting family status:', error);
    }
  };

  const handleDeleteStatus = (id: number) => {
    setFamilyStatusToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteStatus = async () => {
    if (familyStatusToDelete !== null) {
      await handleDeleteFamilyStatus(familyStatusToDelete);
      setFamilyStatusToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleAddOrUpdateFamilyStatus = async () => {
    if(!newFamilyStatus?.trim()){
      notifyDelete('Please provide family status')
    }else{
    try {
      if (editFamilyStatusId) {
        await updateFamilyStatus(editFamilyStatusId.toString(), { status: newFamilyStatus , admin_user_id: adminUserID });
        notify('Successfully updated');
      } else {
        if (newFamilyStatus) {
          await addFamilyStatus({ status: newFamilyStatus, admin_user_id: adminUserID ,  });
          notify('Family Status Added Successfully');
        } 
        // else {
        //   notifyDelete('Please submit all required fields');
        // }
      }
      setNewFamilyStatus('');
      setEditFamilyStatusId(null);
      setShowPopup(false);
      fetchFamilyStatuses();
    } catch (error) {
      console.error('Error adding/updating family status:', error);
    }}
  };

  const handleEditStatus = (status: FamilyStatus) => {
    setEditFamilyStatusId(status.id);
    setNewFamilyStatus(status.status);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditFamilyStatusId(null);
    setNewFamilyStatus('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<FamilyStatus>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'status', headerName: 'Family Status', sortable: true },
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
          data={familyStatuses}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditStatus}
          handleDelete={(id) => handleDeleteStatus(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Family Status List"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateFamilyStatus}
          EditId={editFamilyStatusId}
          valueOne={newFamilyStatus}
          setValueOne={setNewFamilyStatus}
          labelOne={'Family Status'}
          addMsg="Add Family Status"
          editMsg="Edit Family Status"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteStatus}
          deletLabel="Are you sure you want to delete this family status?" setValueTwo={function (_value: string): void {
            throw new Error('Function not implemented.');
          } } valueTwo={null} setValueThree={function (_value: string): void {
            throw new Error('Function not implemented.');
          } } valueThree={null} setValueFour={function (_value: string): void {
            throw new Error('Function not implemented.');
          } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''}        />
      </div>
     
    </Container>
  );
};

export default FamilyStatusTable;
