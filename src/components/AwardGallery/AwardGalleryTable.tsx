import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Paper,
  IconButton,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { notify } from '../TostNotification';
import DeleteConfirmationDialog from '../DeleteConfirmationPopUp';
import { awadrDelete, awardList } from '../../services/api';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
interface Award {
  id: number;
  name: string;
  image: string;
  description: string;
  status: number;
}

const AwardsTable: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Award>('name');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAwardId, setSelectedAwardId] = useState<number | null>(null); // Track the selected award ID
  const [selectedAwardName, setSelectedAwardName] = useState<string>(''); // Track the selected award name
  const navigate = useNavigate();
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get<Award[]>(`${awardList}`);
        setAwards(response.data);
      } catch (error) {
        console.error('Error fetching the awards data:', error);
      }
    };
    fetchAwards();
  }, []);

  const handleRequestSort = (property: keyof Award) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAwards = [...awards].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const handleOpenDialog = (id: number, name: string) => {
    setSelectedAwardId(id);
    setSelectedAwardName(name);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAwardId(null);
  };

  const handleDelete = async () => {
    if (selectedAwardId === null) return;
    try {
      const response = await axios.delete(` ${awadrDelete}${selectedAwardId}/`, {
        data: {
          admin_user_id: adminUserID,   // <-- RAW JSON body
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status <= 299) {
        notify('Successfully Deleted');
      }
      setAwards(awards.filter((award) => award.id !== selectedAwardId));
    } catch (error) {
      console.error('Error deleting the award:', error);
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="text-2xl font-bold mb-4">Award Management</h2>
        <Button
          onClick={() => navigate('/AddAward')}
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
      <TableContainer sx={{ border: '1px solid #E0E0E0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  background: '#FFF9C9',

                  borderBottom: '1px solid #E0E0E0',
                }}
              >
                <TableSortLabel
                  sx={{
                    color: '#DC2635', // Explicitly set the color for TableSortLabel
                    '&.Mui-active': {
                      color: '#DC2635', // Color when the label is active
                    },
                    '&:hover': {
                      color: '#DC2635', // Color on hover
                    },
                  }}
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  background: '#FFF9C9',
                  color: '#DC2635',
                  borderBottom: '1px solid #E0E0E0',
                }}
              >
                Image
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  background: '#FFF9C9',
                  color: '#DC2635',
                  borderBottom: '1px solid #E0E0E0',
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  background: '#FFF9C9',
                  color: '#DC2635',
                  borderBottom: '1px solid #E0E0E0',
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  background: '#FFF9C9',
                  color: '#DC2635',
                  borderBottom: '1px solid #E0E0E0',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAwards.map((award) => (
              <TableRow key={award.id}>
                <TableCell>{award.name}</TableCell>
                <TableCell>
                  <img
                    src={award.image}
                    alt={award.name}
                    style={{ width: '50px' }}
                  />
                </TableCell>
                <TableCell
                  dangerouslySetInnerHTML={{ __html: award.description }}
                />
                <TableCell>
                  {award.status === 1 ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/EditAward/${award.id}`)}
                  >
                    <GrEdit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog(award.id, award.name)}
                  >
                    <MdDeleteOutline
                      style={{
                        color: '#ff3333',
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        itemName={selectedAwardName}
      />
    </Box>
  );
};

export default AwardsTable;
