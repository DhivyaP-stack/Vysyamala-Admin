import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { notifyDelete } from '../TostNotification';

import { successStoryDelete, successStoryList } from '../../services/api';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
interface SuccessStory {
  id: number;
  couple_name: string;
  photo: string;
  date_of_marriage: string;
  status: number;
}

const SuccessStories: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<SuccessStory[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const apiEndpoint = `${successStoryList}`;
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy]);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      let fetchedData = response.data;

      // Sort the data client-side
      if (orderBy && order) {
        fetchedData = fetchedData.sort((a: SuccessStory, b: SuccessStory) => {
          if (
            a[orderBy as keyof SuccessStory] < b[orderBy as keyof SuccessStory]
          ) {
            return order === 'asc' ? -1 : 1;
          }
          if (
            a[orderBy as keyof SuccessStory] > b[orderBy as keyof SuccessStory]
          ) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      setData(fetchedData);
      setTotalCount(fetchedData.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAdd = () => {
    navigate('/AddSuccessStories');
  };

  const handleEdit = (id: number) => {
    navigate(`/EditSuccessStory/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      try {
        const response = await axios.delete(` ${successStoryDelete}${id}/`, {
          data: {
            admin_user_id: adminUserID,  // <-- RAW JSON body
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData((prevData) => prevData.filter((story) => story.id !== id));
        if (response.status >= 200 || response.status <= 299) {
          notifyDelete('Successfully Deleted');
        }
      } catch (error) {
        console.error('Error deleting success story:', error);
      }
    }
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'photo', label: 'Photo' },
    { id: 'couple_name', label: 'Couple Name' },
    { id: 'date_of_marriage', label: 'Date of Marriage' },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Success Stories</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <Button
          style={{ height: '56px', backgroundColor: '#ED1E24' }}
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          <AddIcon />
        </Button>
        <TextField
          label="Search by Couple Name"
          variant="outlined"
          margin="normal"
          value={search}
          onChange={handleSearchChange}
          style={{ width: '250px' }}
        />
      </div>

      <Box className="w-full">
        <TableContainer sx={{ border: '1px solid #E0E0E0' }} className="bg-white">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      borderBottom: '1px solid #E0E0E0', // Applying bottom border

                      background: '#FFF9C9',
                      color: '#DC2635',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                    key={column.id}
                    align="left"
                    style={{ minWidth: 100 }}
                  >
                    <TableSortLabel
                      className="!text-red-600 !text-base !text-md text-nowrap font-semibold"
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    borderBottom: '1px solid #E0E0E0', // Applying bottom border

                    background: '#FFF9C9',
                    color: '#DC2635',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                  className="!text-red-600 !text-base !text-nowrap !font-semibold"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((row) =>
                  row.couple_name.toLowerCase().includes(search.toLowerCase()),
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === 'photo' ? (
                          <img
                            src={row.photo}
                            alt="Couple"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: '50%',
                            }}
                          />
                        ) : (
                          row[column.id as keyof SuccessStory]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        onClick={() => handleEdit(row.id)}
                        style={{ marginRight: 8 }}
                      >
                        <GrEdit
                          style={{
                            fontSize: '25px',
                            color: 'red',
                          }}
                        />
                      </Button>
                      <Button
                        onClick={() => handleDelete(row.id)}
                        style={{ marginRight: 8 }}
                      >
                        <MdDeleteOutline
                          style={{
                            fontSize: '25px',
                            color: 'red',
                          }}
                        />
                      </Button>
                      {/* <Button onClick={() => handleEdit(row.id)} style={{ marginRight: '10px' }}>{<EditIcon/>}Edit</Button>
                    <Button onClick={() => handleDelete(row.id)} color="error">{<DeleteIcon />}Delete</Button> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default SuccessStories;
