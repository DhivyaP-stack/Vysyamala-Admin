import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification, { notifyDelete } from '../../TostNotification';
import DeleteConfirmationDialog from '../../DeleteConfirmationPopUp';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  fullName: string;
  role: string;
  phoneNumber: string;
  status: string;
}

const AdminTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // State for opening/closing the dialog
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Store selected user ID for deletion
  const [selectedUserName, setSelectedUserName] = useState<string>(''); // Store selected user name for the dialog

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ' https://app.vysyamala.com/api/admin-users/',
        );
        const data = response.data.map((item: any) => ({
          id: item.id,
          username: item.username,
          email: item.email,
          firstName: item.first_name,
          lastName: item.last_name,
          password: item.password,
          fullName: item.full_name,
          role: item.role_id,
          phoneNumber: item.phone_number,
          status: item.status,
        }));
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/EditAdminUserForm/${id}`);
    console.log(`Edit user with id: ${id}`);
  };

  const handleDeleteClick = (id: number, username: string) => {
    setSelectedUserId(id); // Set the user ID to delete
    setSelectedUserName(username); // Set the user name for the dialog
    setOpenDialog(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId === null) return; // Ensure a user is selected

    try {
      let response = await axios.delete(
        ` https://app.vysyamala.com/api/admin-user/delete/${selectedUserId}/`,
      );

      if (response.status >= 200 && response.status <= 299) {
        notifyDelete('Successfully Deleted');
        setUsers(users.filter((user) => user.id !== selectedUserId)); // Update the table after deletion
        console.log(`Deleted user with id: ${selectedUserId}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setOpenDialog(false); // Close the dialog after deletion
    }
  };

  const handleAdd = () => {
    navigate('/AdminUsers');
    console.log('Add new page');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog without deleting
  };

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}
      >
         <Typography
            sx={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
           User Details
          </Typography>
        <Button
          style={{ height: '56px', backgroundColor: '#ED1E24' }}
          variant="contained"
          onClick={handleAdd}
        >
          <AddIcon />
        </Button>
      </div>
      <Paper>
        <TableContainer>
          <Table sx={{ border: '1px solid #E0E0E0' }}>
            <TableHead>
              <TableRow
                sx={{
                  background: '#FFF9C9',

                  color: '#DC2635',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    paddingLeft: '60px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  User Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    paddingLeft: '60px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    paddingLeft: '60px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  Full Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#DC2635',
                    paddingLeft: '60px',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  Role Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textAlign: 'right',
                    paddingRight: '50px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>
                    {user.username}
                  </TableCell>
                  <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>
                    {user.email}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '18px', paddingLeft: '60px' }}
                  >{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>
                    {user.role}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEdit(user.id)}>
                      <GrEdit
                        style={{
                          fontSize: '25px',
                        }}
                      />
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(user.id, user.username)} // Call delete dialog
                    >
                      <MdDeleteOutline
                        style={{
                          fontSize: '25px',
                          color: 'red',
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          itemName={selectedUserName} // Pass selected user name
        />

        <Notification />
      </Paper>
    </>
  );
};

export default AdminTable;
