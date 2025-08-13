import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { matchingProfile } from '../services/api';
import { GrEdit } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
interface Profile {
  profile_id: string;
  profile_name: string;
  profile_img: string;
  profile_age: string;
  profile_gender: string;
  height: string;
  weight: string;
  degree: string;
  profession: string;
  location: string;
  wish_list: number;
}

interface Data {
  profiles: Profile[];
  count: number;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MatchingProfiles: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('profile_id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<Data>({ profiles: [], count: 0 });
  const [commonSearch, setCommonSearch] = useState<string>('');

  const query = useQuery();
  const profileId = query.get('profile_id');

  const apiEndpoint = `${matchingProfile}`;

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, order, orderBy, profileId]);

  const fetchData = async () => {
    try {
      const response = await axios.post(apiEndpoint, {
        page: page + 1,
        page_size: rowsPerPage,
        ordering: order === 'asc' ? orderBy : `-${orderBy}`,
        search: profileId || commonSearch,
        profile_id: profileId || '',
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCommonSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCommonSearch(event.target.value);
    fetchData(); // Fetch data whenever the search input changes
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

  const columns = [
    { id: 'profile_img', label: 'Image' },
    { id: 'profile_id', label: 'Profile ID' },
    { id: 'profile_name', label: 'Name' },
    { id: 'profile_age', label: 'Age' },
    { id: 'profile_gender', label: 'Gender' },
    { id: 'height', label: 'Height' },
    { id: 'weight', label: 'Weight' },
    { id: 'degree', label: 'Degree' },
    { id: 'profession', label: 'Profession' },
    { id: 'location', label: 'Location' },
  ];

  // Filter profiles locally based on commonSearch
  const filteredProfiles = data.profiles.filter((profile) => {
    const searchTerm = commonSearch.toLowerCase();
    return (
      profile.profile_id.toLowerCase().includes(searchTerm) ||
      profile.profile_name.toLowerCase().includes(searchTerm) ||
      profile.profile_age.toLowerCase().includes(searchTerm)
    );
  });

  // Sort profiles locally based on the order and orderBy state
  const sortedProfiles = filteredProfiles.sort((a, b) => {
    const aValue = a[orderBy as keyof Profile];
    const bValue = b[orderBy as keyof Profile];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
      <h1 className="text-2xl text-black font-bold mb-4">
        Search Matching Profile
      </h1>
      <Grid
        item
        xs={12}
        md={5}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <TextField
          label="Common Search (Name/ID/Age)"
          variant="outlined"
          margin="normal"
          size="small"
          value={commonSearch}
          onChange={handleCommonSearchChange}
          style={{ marginTop: '30px', width: '250px', marginRight: '20px' }}
        />
      </Grid>
      <Paper className="w-full">
        <TableContainer className="bg-white">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    sx={{ backgroundColor: '#FBED73' }}
                  >
                    <TableSortLabel
                      className="!text-red-600  !text-base !text-md text-nowrap font-semibold"
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
                    backgroundColor: '#FBED73',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '17px',
                  }}
                  className="!text-red-600 !text-base !text-nowrap !font-semibold "
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProfiles.length > 0 ? (
                sortedProfiles.map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.profile_id}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === 'profile_img' ? (
                          <img
                            src={String(row[column.id as keyof Profile])}
                            alt="Profile"
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: '50%',
                            }}
                          />
                        ) : (
                          row[column.id as keyof Profile]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button>
                        <GrEdit />
                      </Button>
                      <Button>
                        <MdDeleteOutline
                          style={{
                            height: '17px',
                            width: '25px',
                            color: '#ff3333',
                          }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    <Typography variant="h6" color="textSecondary">
                      No data available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default MatchingProfiles;
