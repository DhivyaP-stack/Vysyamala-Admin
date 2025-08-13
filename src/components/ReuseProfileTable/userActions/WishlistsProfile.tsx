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
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

import { Link } from 'react-router-dom';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface WishlistsProfileData {
  results: any[];
  count: number;
}

const getWishlistsProfile = async (fromDate: string, toDate: string,page:number,rowsPerPage:number) => {
  const params = new URLSearchParams({
    from_date: fromDate,
    to_date: toDate,
    page:(page+1).toString(),
    rowsPerPage:rowsPerPage.toString()
  });

  const url = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/bookmarks/?${params.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

const WishlistsProfile: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('profile_from_id');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<WishlistsProfileData>({
    results: [],
    count: 0,
  });
  const [search, setSearch] = useState<string>('');

  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true); // State for loading

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate,page,rowsPerPage,search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getWishlistsProfile(fromDate, toDate,page,rowsPerPage);
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
    {
      id: 'profile_from_id',
      label: 'Profile From ID',
      minWidth: 150,
      align: 'center',
    },
    { id: 'profile_from_name', label: 'Profile From Name', minWidth: 150 },
    { id: 'profile_from_mobile', label: 'Profile From Mobile', minWidth: 150 },
    { id: 'profile_from_gender', label: 'Profile From Gender', minWidth: 100 },
    { id: 'profile_from_city', label: 'Profile From City', minWidth: 150 },
    { id: 'profile_from_state', label: 'Profile From State', minWidth: 150 },

    { id: 'profile_to_id', label: 'Profile To ID', minWidth: 150 },
    { id: 'profile_to_name', label: 'Profile To Name', minWidth: 150 },
    { id: 'profile_to_mobile', label: 'Profile To Mobile', minWidth: 150 },
    { id: 'profile_to_gender', label: 'Profile To Gender', minWidth: 100 },
    { id: 'profile_to_city', label: 'Profile To City', minWidth: 150 },
    { id: 'profile_to_state', label: 'Profile To State', minWidth: 150 },

    { id: 'marked_datetime', label: 'Marked Date/Time', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 100 },
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
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [any, number],
    );
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
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    ),
    getComparator(order, orderBy),
  );
  // // Filter data based on search term
  // const filteredResults = data.results.filter(row =>
  //   Object.values(row).some(value =>
  //     String(value).toLowerCase().includes(search.toLowerCase())
  //   )
  // );

  function handleDelete(_ContentId: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-black">Wishlist Profiles</h1>
      <div className="w-full py-2 flex justify-between">
        <div className="w-full text-right flex justify-between">
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
          <TextField
            label="Search"
            variant="outlined"
            margin="normal"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Paper className="w-full">
        <TableContainer sx={{ border: '1px solid #E0E0E0' }} className="bg-white">
          <Table  stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      borderBottom: '1px solid #E0E0E0',

                      background: '#FFF9C9',
                      color: '#DC2635',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
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
                // filteredResults
                //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                data.results
                  .map((row, index) => (
                    <TableRow
                      sx={{ whiteSpace: 'nowrap' }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                      {/* <TableCell>
                     
                     <Button>
                       <Link to={`/editProfile?profileId=${row.ProfileId}`}>
                         Edit
                       </Link>
                     </Button>
                     <Button onClick={() => handleDelete(row.ContentId)}>
                       Delete
                     </Button>
                   </TableCell> */}
                    </TableRow>
                  ))
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

export default WishlistsProfile;
