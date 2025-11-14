import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface DataTableProps {
  fetchData: (search: string, orderBy: string, order: 'asc' | 'desc', rowsPerPage: number, page: number) => Promise<any>;
  columns: Column[];
  initialRowsPerPage?: number;
  initialOrderBy?: string;
  initialOrder?: 'asc' | 'desc';
  searchPlaceholder?: string;
  editPath: (id: number) => string; // Function to generate edit path
  detailPath: (id: any) => string; // Function to generate detail path
}

const ReUseDataTable: React.FC<DataTableProps> = ({
  fetchData,
  columns,
  initialRowsPerPage = 10,
  initialOrderBy = 'ProfileId',
  initialOrder = 'asc',
  searchPlaceholder = 'Search...',
  editPath,
  detailPath,
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder);
  const [orderBy, setOrderBy] = useState<string>(initialOrderBy);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [data, setData] = useState<{ results: any[]; count: number }>({ results: [], count: 0 });
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDataFromApi();
  }, [page, rowsPerPage, order, orderBy, search]);

  const fetchDataFromApi = async () => {
    setLoading(true);
    try {
      const response = await fetchData(search, orderBy, order, rowsPerPage, page + 1);
      setData(response.data);
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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (ContentId: number) => {
    if (!ContentId) {
      console.error('Error: Missing ID for the row to delete');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this item?');
    const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');
    if (!confirmed) return;

    try {
      await axios.delete(` https://app.vysyamala.com/api/logindetails/${ContentId}/`, {
        data: {
          admin_user_id: adminUserID,  // <-- RAW JSON body
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchDataFromApi(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Paper className="w-full">
      <div className="w-full text-right px-2">
        <TextField
          label={searchPlaceholder}
          variant="outlined"
          margin="normal"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <TableContainer className="bg-white">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
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
              <TableCell className="!text-red-600 !text-base !text-nowrap !font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.results.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'ProfileId' ? (
                          <Link to={detailPath(value)} style={{ color: 'blue', textDecoration: 'underline' }}>
                            {value}
                          </Link>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Button component={Link} to={editPath(row.ContentId)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.ContentId)}>Delete</Button>
                  </TableCell>
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
  );
};

export default ReUseDataTable;



