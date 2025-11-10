// import  { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";

// interface HomepageData {
//   id: number;
//   why_vysyamala: string;
//   youtube_links: string;
//   vysyamala_apps: string;
// }

// const HomePageTable = () => {
//   const [data, setData] = useState<HomepageData[]>([]);
//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState<HomepageData | null>(null);
//   const [formData, setFormData] = useState({
//     why_vysyamala: "",
//     youtube_links: "",
//     vysyamala_apps: "",
//   });

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       const response = await axios.get(
//         " https://app.vysyamala.com/api/homepage/"
//       );
//       setData(response.data);
//     };
//     fetchData();
//   }, []);

//   const handleOpen = (item?: HomepageData) => {
//     if (item) {
//       setEditData(item); // Edit mode
//       setFormData({
//         why_vysyamala: item.why_vysyamala,
//         youtube_links: item.youtube_links,
//         vysyamala_apps: item.vysyamala_apps,
//       });
//     } else {
//       setEditData(null); // Add mode
//       setFormData({
//         why_vysyamala: "",
//         youtube_links: "",
//         vysyamala_apps: "",
//       });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDelete = async (id: number) => {
//     await axios.delete(` https://app.vysyamala.com/api/homepage/${id}`);
//     setData(data.filter((item) => item.id !== id));
//   };

//   const handleSubmit = async () => {
//     if (editData) {
//       // Update existing data
//       await axios.put(
//         ` https://app.vysyamala.com/api/homepage/${editData.id}`,
//         formData
//       );
//       setData(
//         data.map((item) =>
//           item.id === editData.id ? { ...item, ...formData } : item
//         )
//       );
//     } else {
//       // Add new data
//       const response = await axios.post(
//         " https://app.vysyamala.com/api/homepage/",
//         formData
//       );
//       setData([...data, response.data]);
//     }
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* Add Button */}
//       <Button
//         variant="contained"
//         startIcon={<AddIcon />}
//         onClick={() => handleOpen()}
//         style={{ marginBottom: "20px", float: "right" }}
//       >
//         Add New
//       </Button>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Why Vysyamala</TableCell>
//               <TableCell>Youtube Links</TableCell>
//               <TableCell>Vysyamala Apps</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell>{item.id}</TableCell>
//                 <TableCell>{item.why_vysyamala}</TableCell>
//                 <TableCell>{item.youtube_links}</TableCell>
//                 <TableCell>{item.vysyamala_apps}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleOpen(item)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(item.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog for Add/Edit */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{editData ? "Edit Data" : "Add New Data"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Why Vysyamala"
//             fullWidth
//             value={formData.why_vysyamala}
//             onChange={(e) =>
//               setFormData({ ...formData, why_vysyamala: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Youtube Links"
//             fullWidth
//             value={formData.youtube_links}
//             onChange={(e) =>
//               setFormData({ ...formData, youtube_links: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Vysyamala Apps"
//             fullWidth
//             value={formData.vysyamala_apps}
//             onChange={(e) =>
//               setFormData({ ...formData, vysyamala_apps: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit}>
//             {editData ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default HomePageTable;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   Table, TableBody, TableCell, TableContainer, 
//   TableHead, TableRow, Button, IconButton, Paper 
// } from '@mui/material';
// import { Edit, Delete, Add } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// interface HomepageData {
//   id: number;
//   why_vysyamala: string;
//   youtube_links: string;
//   vysyamala_apps: string;
// }

// const HomepageTable: React.FC = () => {
//   const [homepageData, setHomepageData] = useState<HomepageData[]>([]);
// const navigate =useNavigate()
//   // Fetch API data
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(' https://app.vysyamala.com/api/homepage-list/');
//       setHomepageData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle Edit
//   const handleEdit = (id: number) => {
//     console.log('Edit clicked for id:', id);
//     navigate(`/EditHomepageForm/${id}`)
//     // Add logic for editing
//   };

//   // Handle Delete
//   const handleDelete = (id: number) => {
//     console.log('Delete clicked for id:', id);
//     // Add logic for deleting
//   };

//   // Handle Add
//   const handleAdd = () => {
//     console.log('Add clicked');
//     navigate("/AddHomepageForm")
//     // Add logic for adding new entry
//   };

//   return (
//     <div>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<Add />}
//         style={{ float: 'right', margin: '20px' }}
//         onClick={handleAdd}
//       >
//         Add
//       </Button>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Why Vysyamala</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>YouTube Link</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {homepageData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell dangerouslySetInnerHTML={{ __html: row.why_vysyamala }} />
//                 <TableCell>
//                   {/* Extract image from the why_vysyamala text */}
//                   <img 
//                     src={extractImageUrl(row.why_vysyamala)} 
//                     alt="vysyamala" 
//                     style={{ width: '150px', height: '100px' }} 
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <a 
//                     href={row.youtube_links} 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     style={{ color: 'blue', textDecoration: 'underline' }}
//                   >
//                     YouTube Link
//                   </a>
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEdit(row.id)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// // Function to extract image URL from the why_vysyamala text
// const extractImageUrl = (text: string): string => {
//   const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
//   const match = text.match(regex);
//   return match ? match[0] : '';
// };

// export default HomepageTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, IconButton, Paper, Dialog, 
  DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomepageData {
  id: number;
  why_vysyamala: string;
  youtube_links: string;
  vysyamala_apps: string;
}

const HomepageTable: React.FC = () => {
  const [homepageData, setHomepageData] = useState<HomepageData[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch API data
  const fetchData = async () => {
    try {
      const response = await axios.get(' https://app.vysyamala.com/api/homepage-list/');
      setHomepageData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Edit
  const handleEdit = (id: number) => {
    navigate(`/EditHomepageForm/${id}`);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirmation = (id: number) => {
    setSelectedId(id);
    setOpenDeleteDialog(true); // Open confirmation dialog
  };

  // Handle Delete
  const handleDelete = async () => {
    if (selectedId !== null) {
      try {
        await axios.delete(` https://app.vysyamala.com/api/homepage/delete/${selectedId}/`);
        
        // Remove deleted item from the state
        setHomepageData(homepageData.filter((item) => item.id !== selectedId));
        setOpenDeleteDialog(false); // Close dialog after successful deletion

        // Show success message using react-toastify
        toast.success("Deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        console.error('Error deleting data:', error);
        // Show error toast if deletion fails
        toast.error("Failed to delete!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  };

  // Handle Add
  const handleAdd = () => {
    navigate("/AddHomepageForm");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        style={{ float: 'right', margin: '20px' }}
        onClick={handleAdd}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {/* <TableCell>Why Vysyamala</TableCell> */}
             
              <TableCell>YouTube Link</TableCell>
              <TableCell>vysyamala Apps</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homepageData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                {/* <TableCell dangerouslySetInnerHTML={{ __html: row.why_vysyamala }} /> */}
               
                <TableCell>
                  <a 
                    href={row.youtube_links} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    YouTube Link
                  </a>
                </TableCell>
                <TableCell>{row.vysyamala_apps}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteConfirmation(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this entry? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};



export default HomepageTable;
