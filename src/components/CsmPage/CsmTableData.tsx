import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Notification, { notifyDelete } from '../TostNotification';
import { cmsDeleteData, cmsFetchData } from '../../services/api';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
interface Page {
  id: number;
  page_name: string;
  status: string;
}

const PageList: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const navigate = useNavigate();
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get<Page[]>(`${cmsFetchData}`);
        setPages(response.data);
        console.log('getRequestOfTableData:', response.data);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchPages();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/EditCsmData/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this page?',
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(` ${cmsDeleteData}${id}/`, {
          data: {
            admin_user_id: adminUserID,   // <-- RAW JSON body
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status >= 200 || response.status <= 299) {
          notifyDelete('Successfully Deleted');
        }
        console.log(`Deleted page with id: ${id}`, response.data);
        // Refresh the page list after deletion
        setPages(pages.filter((page) => page.id !== id));
      } catch (error) {
        console.error('There was an error deleting the page!', error);
      }
    }
  };

  const handleAdd = async () => {
    navigate('/AddCsmData');
    console.log('Add new page');
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
          CMS List
        </Typography>
        <Button
          onClick={handleAdd}
          variant="contained"
          style={{
            float: 'right',
            margin: '10px 10px 10px 20px',
            height: '56px',
            backgroundColor: '#ED1E24',
          }}
        >
          <AddIcon />
        </Button>
      </Box>

      <TableContainer sx={{ borderBottom: '1px solid #E0E0E0' }}>
        <Box>
          <Table sx={{ border: '1px solid #E0E0E0' }}>
            <TableHead>
              <TableRow sx={{ background: '#FFF9C9' }}>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    paddingLeft: '30px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  Page Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#DC2635',
                    borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  // sx={{ fontWeight: 'bold', fontSize: '18px' }}
                  // align="right"
                  sx={{
                    borderBottom: '1px solid #E0E0E0',
                    color: '#DC2635',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textAlign: 'center', // Align text to the right
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell sx={{ fontSize: '18px', paddingLeft: '30px' }}>
                    {page.id}
                  </TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>
                    {page.page_name}
                  </TableCell>
                  <TableCell sx={{ fontSize: '18px' }}>{page.status}</TableCell>
                  <TableCell align="center">
                    <div>
                      <Button onClick={() => handleEdit(page.id)}>
                        <GrEdit
                          style={{
                            fontSize: '18px',
                          }}
                        />
                      </Button>
                      <Button onClick={() => handleDelete(page.id)}>
                        <MdDeleteOutline
                          style={{
                            fontSize: '20px',
                            color: 'red',
                          }}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <Notification />
    </Box>
  );
};

export default PageList;
