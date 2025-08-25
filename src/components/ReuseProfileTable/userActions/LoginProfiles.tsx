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
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface LoginLogsData {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

const getLoginLogs = async (date: string, fromDate: string, toDate: string, page: number, rowsPerPage: number) => {
  const params = new URLSearchParams();

  if (date) params.append('date', date);
  if (fromDate) params.append('from_date', fromDate);
  if (toDate) params.append('to_date', toDate);
  params.append('page', (page + 1).toString());
  params.append('per_page', rowsPerPage.toString());

  const url = `https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/login-logs/?${params.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

const LoginProfiles: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('ProfileId');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<LoginLogsData>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [search, setSearch] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate(); // ✅ hook

  useEffect(() => {
    fetchData();
  }, [date, fromDate, toDate, page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getLoginLogs(date, fromDate, toDate, page, rowsPerPage);
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
    setPage(0);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'date') {
      setDate(value);
    } else if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };

  const handleSubmit = () => {
    setPage(0);
    fetchData();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const formatDateOnly = (dateTimeString: string) => {
    if (!dateTimeString) return '';
    return dateTimeString.split(' ')[0];
  };

  const columns: Column[] = [
    { id: 'ProfileId', label: 'Profile ID', minWidth: 100, align: 'left' },
    { id: 'Profile_name', label: 'Profile Name', minWidth: 150, align: 'left' },
    { id: 'EmailId', label: 'Email ID', minWidth: 200, align: 'left' },
    { id: 'Mobile_no', label: 'Mobile No', minWidth: 130, align: 'left' },
    { id: 'Last_login_date', label: 'Last Login Date', minWidth: 120, align: 'left' },
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
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    ),
    getComparator(order, orderBy),
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-black">Login Profiles</h1>
      <div className="w-full py-2 flex justify-between">
        <div className="w-full text-right flex justify-between">
          <div className="flex items-center space-x-2">
            <TextField
              label="Specific Date"
              type="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
            />
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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredResults.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredResults
                  .slice(0, rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      sx={{ whiteSpace: 'nowrap' }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={
                            column.id === 'ProfileId'
                              ? () => navigate(`/viewProfile?profileId=${row.ProfileId}`)
                              : undefined
                          }
                          sx={
                            column.id === 'ProfileId'
                              ? {
                                  color: 'blue',
                                  cursor: 'pointer',
                                  textDecoration: 'none',
                                  '&:hover': { textDecoration: 'underline' },
                                }
                              : {}
                          }
                        >
                          {column.id === 'Last_login_date'
                            ? formatDateOnly(row[column.id])
                            : row[column.id]}
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

export default LoginProfiles;
