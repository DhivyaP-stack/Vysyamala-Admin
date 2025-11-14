// import React, { useEffect, useState } from 'react';
// import {
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Import icons
// import { getProfileHolders, addProfileHolder, updateProfileHolder, deleteProfileHolder } from '../services/api';

// const ProfileHolderTable: React.FC = () => {
//     const [profileHolders, setProfileHolders] = useState<any[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentProfileHolder, setCurrentProfileHolder] = useState<any>(null);

//     useEffect(() => {
//         fetchProfileHolders();
//     }, []);

//     const fetchProfileHolders = async () => {
//         const response = await getProfileHolders();
//         setProfileHolders(response.data);
//     };

//     const handleOpen = (profileHolder: any = null) => {
//         setCurrentProfileHolder(profileHolder);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentProfileHolder(null);
//     };

//     const handleSave = async () => {
//         if (currentProfileHolder.id) {
//             await updateProfileHolder(currentProfileHolder.id, currentProfileHolder);
//         } else {
//             await addProfileHolder(currentProfileHolder);
//         }
//         fetchProfileHolders();
//         handleClose();
//     };

//     const handleDelete = async (id: string) => {
//         await deleteProfileHolder(id);
//         fetchProfileHolders();
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add Profile Holder</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Relation</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {profileHolders.map((profileHolder) => (
//                             <TableRow key={profileHolder.id}>
//                                 <TableCell>{profileHolder.id}</TableCell>
//                                 <TableCell>{profileHolder.name}</TableCell>
//                                 <TableCell>{profileHolder.relation}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(profileHolder)} aria-label="edit">
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(profileHolder.id)} aria-label="delete">
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentProfileHolder?.id ? 'Edit Profile Holder' : 'Add Profile Holder'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentProfileHolder?.name || ''}
//                         onChange={(e) => setCurrentProfileHolder({ ...currentProfileHolder, name: e.target.value })}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Relation"
//                         value={currentProfileHolder?.relation || ''}
//                         onChange={(e) => setCurrentProfileHolder({ ...currentProfileHolder, relation: e.target.value })}
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

// export default ProfileHolderTable;

// import React, { useEffect, useState } from 'react';
// import {
//     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
// } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Import icons
// import { getProfileHolders, addProfileHolder, updateProfileHolder, deleteProfileHolder } from '../services/api';

// const ProfileHolderTable: React.FC = () => {
//     const [profileHolders, setProfileHolders] = useState<any[]>([]);
//     const [open, setOpen] = useState(false);
//     const [currentProfileHolder, setCurrentProfileHolder] = useState<any>(null);

//     useEffect(() => {
//         fetchProfileHolders();
//     }, []);

//     const fetchProfileHolders = async () => {
//         const response = await getProfileHolders();
//         setProfileHolders(response.data);
//     };

//     const handleOpen = (profileHolder: any = null) => {
//         setCurrentProfileHolder(profileHolder);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentProfileHolder(null);
//     };

//     const handleSave = async () => {
//         if (currentProfileHolder.id) {
//             await updateProfileHolder(currentProfileHolder.id, currentProfileHolder);
//         } else {
//             await addProfileHolder(currentProfileHolder);
//         }
//         fetchProfileHolders();
//         handleClose();
//     };

//     const handleDelete = async (id: string) => {
//         await deleteProfileHolder(id);
//         fetchProfileHolders();
//     };

//     return (
//         <Paper>
//             <Button onClick={() => handleOpen()}>Add Profile Holder</Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Relation</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {profileHolders.map((profileHolder) => (
//                             <TableRow key={profileHolder.id}>
//                                 <TableCell>{profileHolder.id}</TableCell>
//                                 <TableCell>{profileHolder.name}</TableCell>
//                                 <TableCell>{profileHolder.relation}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleOpen(profileHolder)} aria-label="edit">
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(profileHolder.id)} aria-label="delete">
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentProfileHolder?.id ? 'Edit Profile Holder' : 'Add Profile Holder'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentProfileHolder?.name || ''}
//                         onChange={(e) => setCurrentProfileHolder({ ...currentProfileHolder, name: e.target.value })}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Relation"
//                         value={currentProfileHolder?.relation || ''}
//                         onChange={(e) => setCurrentProfileHolder({ ...currentProfileHolder, relation: e.target.value })}
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

// export default ProfileHolderTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { addOrUpdateProfileHolder } from '../services/api';

interface ProfileHolder {
  id: number;
  name: string;
  relation: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ProfileHolderTable: React.FC = () => {
  const [profileHolders, setProfileHolders] = useState<ProfileHolder[]>([]);
  const [newProfileHolder, setNewProfileHolder] = useState<
    Partial<ProfileHolder>
  >({});
  const [editProfileHolderId, setEditProfileHolderId] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [profileHolderToDelete, setProfileHolderToDelete] = useState<
    number | null
  >(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchProfileHolders();
  }, []);

  const fetchProfileHolders = async () => {
    try {
      const response = await axios.get(`${addOrUpdateProfileHolder}`);
      setProfileHolders(response.data);
    } catch (error) {
      console.error('Error fetching profile holders:', error);
    }
  };

  const handleDeleteProfileHolder = async (id: number) => {
    try {
      await axios.delete(` ${addOrUpdateProfileHolder}${id}/`, {
        data: {
          admin_user_id: adminUserID,  // <-- RAW JSON body
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      notifyDelete('Successfully Deleted');
      fetchProfileHolders();
    } catch (error) {
      console.error('Error deleting profile holder:', error);
    }
  };

  const handleDeleteStatus = (id: number) => {
    setProfileHolderToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteStatus = async () => {
    if (profileHolderToDelete !== null) {
      await handleDeleteProfileHolder(profileHolderToDelete);
      setProfileHolderToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleAddOrUpdateProfileHolder = async () => {
    try {
      if (editProfileHolderId) {
        await axios.put(
          ` ${addOrUpdateProfileHolder}${editProfileHolderId}/`,
          {
            ...newProfileHolder,
            admin_user_id: adminUserID,
          }
        );
        notify('Successfully updated');
      } else {
        if (newProfileHolder.name && newProfileHolder.relation) {
          await axios.post(`${addOrUpdateProfileHolder}`,
            {
              ...newProfileHolder,
              admin_user_id: adminUserID,
            }
          );
          notify('Profile Holder Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewProfileHolder({});
      setEditProfileHolderId(null);
      setShowPopup(false);
      fetchProfileHolders();
    } catch (error) {
      console.error('Error adding/updating profile holder:', error);
    }
  };

  const handleEditProfileHolder = (profileHolder: ProfileHolder) => {
    setEditProfileHolderId(profileHolder.id);
    setNewProfileHolder(profileHolder);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditProfileHolderId(null);
    setNewProfileHolder({});
    setShowPopup(false);
  };

  const columns: ColumnConfig<ProfileHolder>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'relation', headerName: 'Relation', sortable: true },
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
          data={profileHolders}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditProfileHolder}
          handleDelete={(id) => handleDeleteStatus(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Profile Holder"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateProfileHolder}
          EditId={editProfileHolderId}
          valueOne={newProfileHolder.name || ''}
          setValueOne={(value) =>
            setNewProfileHolder({ ...newProfileHolder, name: value })
          }
          labelOne="Name"
          valueTwo={newProfileHolder.relation || ''}
          setValueTwo={(value) =>
            setNewProfileHolder({ ...newProfileHolder, relation: value })
          }
          labelTwo="Relation"
          addMsg="Add Profile Holder"
          editMsg="Edit Profile Holder"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteStatus}
          deletLabel="Are you sure you want to delete this profile holder?"
          setValueThree={function (_value: string): void {
            throw new Error('Function not implemented.');
          }}
          valueThree={null}
          setValueFour={function (_value: string): void {
            throw new Error('Function not implemented.');
          }}
          valueFour={null}
          LabelThree={''}
          LabelFour={''}
        />
      </div>
    </Container>
  );
};

export default ProfileHolderTable;
