import React, { useEffect, useState } from 'react';

import {

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
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { profileImgApproval } from '../../../services/api';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface ProfileImageApprovalData {
  results: any[];
  count: number;
}

const getProfileImageApproval = async () => {
  const url = `${profileImgApproval}`;
  const response = await axios.get(url);
  return response.data;
};

const ProfileImageApproval: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('profile_from_id');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<ProfileImageApprovalData>({results: [],count: 0,});
  const [search, setSearch] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const navigate = useNavigate();
  const [hoveredProfileId, setHoveredProfileId] = useState(null);


  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getProfileImageApproval();
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0); // Reset page to 0 when search term changes
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };

  const handleSubmit = () => {
    fetchData(); // Call the API with the selected filters
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

  const columns: Column[] = [
    { id: 'profile_id', label: 'Profile ID', minWidth: 150, align: 'center' }, // For profile_id
    {
      id: 'image_url',
      label: 'Profile Image',
      minWidth: 150,
      align: 'center',
      format: (value: string[]) => (
        <img src={value[0]} alt="Profile" width="50" height="50" />
      ),
    }, // Display profile image
  ];

  const descendingComparator = (a: any, b: any, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array: any[], comparator: (a: any, b: any) => number) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const filteredResults = stableSort(
    data.results.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    ),
    getComparator(order, orderBy)
  );

  // // Filter data based on search term
  // const filteredResults = data.results.filter((row) =>
  //   Object.values(row).some((value) =>
  //     String(value).toLowerCase().includes(search.toLowerCase()),
  //   ),
  // );

  function handleDelete(_ContentId: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-black">Profile Image Approval</h1>
      <Box className="w-full">
        <div className="w-full p-2 flex justify-between">
          <div className="w-full text-right px-2">
            <TextField
              label="Search"
              variant="outlined"
              margin="normal"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="flex items-center space-x-2">
              <TextField
                label="From Date"
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="To Date"
                type="date"
                name="toDate"
                value={toDate}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
              />

              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>

        <TableContainer sx={{ border: '1px solid #E0E0E0' }} >
          <Table stickyHeader>
            <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: '#FFF9C9' }}
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
                {/* <TableCell className="!text-red-600 !text-base !text-nowrap !font-semibold">
                  Actions
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                filteredResults
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {/* {row[column.id]} */}
                          {column.id === 'profile_id' ? (
                            <span
                              style={{
                                color: 'blue',
                                textDecoration: hoveredProfileId === row[column.id] ? 'underline' : 'none',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={() => setHoveredProfileId(row[column.id])}
                              onMouseLeave={() => setHoveredProfileId(null)}
                              onClick={() => navigate(`/UploadApprovalProfileImg?profileId=${row[column.id]}`)} 
                            >
                              {row[column.id]}
                            </span>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}

                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default ProfileImageApproval;
