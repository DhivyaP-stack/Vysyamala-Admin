import React, { Dispatch, SetStateAction, useState } from 'react';
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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { MdDeleteOutline } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable?: boolean;
}
interface State {
  id: number;
  name: string;
}
interface District {
  id: number;
  name: string;
  state: number;
}
interface BasicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  handleSearchChange: (query: string) => void;
  handleEdit: (item: T) => void;
  handleDelete: (id: any) => void;
  setShowPopup: (show: boolean) => void;
  idField: keyof T;
  title: string;
  districts?: District[];
  newDistrictId?: number | null;
  setNewDistrictId?: Dispatch<SetStateAction<number | null>>;
  states?: State[];
  newStateId?: number | null;
  setNewStateId?: Dispatch<SetStateAction<number | null>>;
}

export default function Reuse<T>({
  data,
  columns,
  handleSearchChange,
  handleEdit,
  handleDelete,
  setShowPopup,
  idField,
  title,
  newDistrictId,
  setNewDistrictId,
  setNewStateId,
  newStateId,
  states,
  districts,
}: BasicTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof T>(columns[0].field);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.field]).toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const sortedData = filteredData.sort((a, b) => {
    const fieldA = String(a[sortField]).toLowerCase();
    const fieldB = String(b[sortField]).toLowerCase();
    if (fieldA < fieldB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };
  const roleId = sessionStorage.getItem('role_id');
  return (
    <>
      <h1 className="text-2xl text-black font-bold mb-4">{title}</h1>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        {roleId === '1' || roleId === '2' ? (
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
        ) : null}
        {(title === 'Districts' || title === 'Cities') && (
          <>
            <FormControl sx={{ width: '30%' }} fullWidth>
              <InputLabel id="state-select-label">Select State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={newStateId || ''}
                label="Select State"
                onChange={(e) =>
                  setNewStateId?.(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <MenuItem value="">
                  <em>All States</em>
                </MenuItem>
                {states?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* District Dropdown to filter cities */}
          </>
        )}

        {title === 'Cities' && (
          <>
            <FormControl sx={{ width: '30%' }} fullWidth>
              <InputLabel id="district-select-label">
                Select District
              </InputLabel>
              <Select
                labelId="district-select-label"
                id="district-select"
                value={newDistrictId || ''}
                label="Select District"
                onChange={(e) =>
                  setNewDistrictId?.(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <MenuItem value="">
                  <em>All Districts</em>
                </MenuItem>
                {districts && districts.length > 0 ? (
                  districts
                    .filter((district) => district.state === newStateId)
                    .map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem disabled>No districts available</MenuItem>
                )}
              </Select>
            </FormControl>
          </>
        )}
        <Box sx={{ display: 'flex' }}>
          {roleId === '1' || roleId === '2' ? (
            <TextField
              type="text"
              onChange={handleSearchInputChange}
              placeholder="Search"
              style={{ marginRight: '10px' }}
              variant="outlined"
            />
          ) : null}

          {roleId === '1' || roleId === '3' ? (
            <Button
              style={{ height: '56px',backgroundColor:"#ED1E24" }}
              variant="contained"
             
              onClick={() => setShowPopup(true)}
            >
              <AddIcon />
            </Button>
          ) : (
            ''
          )}
        </Box>
      </Box>
      <TableContainer sx={{border: '1px solid #E0E0E0',}} component={Paper}>
        {roleId === '1' || roleId === '2' ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
             
                    borderBottom: '1px solid #E0E0E0',
                     background: '#FFF9C9',
                    color: '#DC2635',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                  align="left"
                >
                  S.No
                </TableCell>
                {columns
                  .filter((column) => column.headerName !== 'ID') // Exclude the "ID" column
                  .map((column) => (
                    <TableCell
                      sx={{
                       
                        borderBottom: '1px solid #E0E0E0',
                        background: '#FFF9C9',
                        color: '#DC2635',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                      key={String(column.field)}
                      align="left"
                      onClick={() =>
                        column.sortable && handleSort(column.field)
                      }
                      style={{
                        cursor: column.sortable ? 'pointer' : 'default',
                      }}
                    >
                      {column.headerName}{' '}
                      {sortField === column.field &&
                        (sortDirection === 'asc' ? '▲' : '▼')}
                    </TableCell>
                  ))}
                {roleId === '1' && (
                  <TableCell
                    sx={{
                 
                      borderBottom: '1px solid #E0E0E0',
                  
                      background: '#FFF9C9',
                      color: '#DC2635',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                    align="left"
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow
                  key={String(item[idField])}
                  sx={{
                    height: '30px',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </TableCell>
                  {columns
                    .filter((column) => column.field !== idField) // Exclude the idField column
                    .map((column) => (
                      <TableCell
                        key={String(column.field)}
                        component="th"
                        scope="row"
                      >
                        {String(item[column.field])}
                      </TableCell>
                    ))}
                  {roleId === '1' && (
                    <TableCell align="left">
                      <IconButton onClick={() => handleEdit(item)}>
                        <GrEdit
                          style={{
                            height: '20px',
                          }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item[idField])}>
                        <MdDeleteOutline
                          style={{
                            height: '20px',
                            color: '#ff3333',
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography sx={{ paddingLeft: '30px', minWidth: 650 }}>
            Click plus icon to create new records
          </Typography>
        )}
      </TableContainer>

      {roleId === '1' || roleId === '2' ? (
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      ) : (
        ''
      )}
    </>
  );
}
