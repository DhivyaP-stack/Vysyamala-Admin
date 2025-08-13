import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface BirthStar {
  id: number;
  star: string;
  tamil_series: string;
  telugu_series: string;
  kannada_series: string;
}

interface BasicTableProps {
  birthStar: BirthStar[];
  handleSearchChange: (query: string) => void;
  handleEdit: (star: BirthStar) => void;
  handleDelete: (id: number) => void;
  setShowPopup: (show: boolean) => void;
}

export default function BasicTable({
  birthStar,
  handleSearchChange,
  handleEdit,
  handleDelete,
  setShowPopup,
}: BasicTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<
    'star' | 'tamil_series' | 'telugu_series' | 'kannada_series'
  >('star');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleSort = (
    field: 'star' | 'tamil_series' | 'telugu_series' | 'kannada_series',
  ) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredBirthStars = birthStar.filter((star) =>
    star.star.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedBirthStars = filteredBirthStars.sort((a, b) => {
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    if (fieldA < fieldB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedBirthStars = sortedBirthStars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Birth Stars
      </Typography>

      <TableContainer component={Paper}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
          }}
        >
          <Box>
            <Select
              value={itemsPerPage}
              onChange={handleSelectChange}
              variant="outlined"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>
          <Box>
            <TextField
              type="text"
              onChange={handleSearchInputChange}
              placeholder="Search birth star"
              style={{ marginRight: '10px' }}
              variant="outlined"
            />

            <Button
            style={{ height:"56px"}}
           
              variant="contained"
              color="primary"
              onClick={() => setShowPopup(true)}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">S.No</TableCell>
              <TableCell
                align="left"
                onClick={() => handleSort('star')}
                style={{ cursor: 'pointer' }}
              >
                Birth Star{' '}
                {sortField === 'star' && (sortDirection === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell
                align="left"
                onClick={() => handleSort('tamil_series')}
                style={{ cursor: 'pointer' }}
              >
                Tamil Series{' '}
                {sortField === 'tamil_series' &&
                  (sortDirection === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell
                align="left"
                onClick={() => handleSort('telugu_series')}
                style={{ cursor: 'pointer' }}
              >
                Telugu Series{' '}
                {sortField === 'telugu_series' &&
                  (sortDirection === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell
                align="left"
                onClick={() => handleSort('kannada_series')}
                style={{ cursor: 'pointer' }}
              >
                Kannada Series{' '}
                {sortField === 'kannada_series' &&
                  (sortDirection === 'asc' ? '▲' : '▼')}
              </TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBirthStars.map((star, index) => (
              <TableRow
                key={star.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </TableCell>
                <TableCell component="th" scope="row">
                  {star.star}
                </TableCell>
                <TableCell align="left">{star.tamil_series}</TableCell>
                <TableCell align="left">{star.telugu_series}</TableCell>
                <TableCell align="left">{star.kannada_series}</TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => handleEdit(star)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(star.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Pagination
          count={Math.ceil(filteredBirthStars.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}
