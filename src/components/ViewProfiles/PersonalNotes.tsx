import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import {
  PersonalNotesProfileApi,
  VysyaAssistProfileApi,
} from '../../services/api';

interface NotesProfileType {
  notes_profileid: string;
  notes_profile_name: string;
  notes_Profile_img: string;
  notes_profile_age: number;
  notes_details: string;
  notes_datetime: string;
  notes_verified: number;
  notes_height: string;
  notes_star: string;
  notes_profession: string;
  notes_city: string;
  notes_degree: string;
  notes_match_score: number;
  notes_views: number;
  notes_lastvisit: string;
  notes_userstatus: string;
  notes_horoscope: string;
  notes_profile_wishlist: number;
}

const columns = [
  { id: 'notes_Profile_img', label: 'Image' },
  { id: 'notes_profileid', label: 'Profile ID' },
  { id: 'notes_profile_name', label: 'Name' },
  { id: 'notes_profile_age', label: 'Age' },
  { id: 'notes_details', label: 'Details' },
  { id: 'notes_verified', label: 'Verified' },
  { id: 'notes_height', label: 'Height' },
  { id: 'notes_star', label: 'Star' },
  { id: 'notes_profession', label: 'Profession' },
  { id: 'notes_city', label: 'Location' },
  { id: 'notes_degree', label: 'Degree' },
  { id: 'notes_match_score', label: 'Matching Score' },
  { id: 'notes_views', label: 'Views' },
  { id: 'notes_lastvisit', label: 'Last Visit' },
  { id: 'notes_userstatus', label: 'User Status' },
];

export default function PersonalNotes() {
  const [profileData, setProfileData] = useState<NotesProfileType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');

  const getViewedProfiles = async (
    id: string | null,
    pageNumber: number,
    perPage: number,
  ) => {
    try {
      const params = new URLSearchParams();
      params.append('profile_id', id || '');
      params.append('page_number', (pageNumber + 1).toString());
      params.append('per_page', perPage.toString());
      params.append('from_date', fromDate);
      params.append('to_date', toDate);

      const response = await axios.post(
        PersonalNotesProfileApi,
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      const data = response.data.data.profiles as NotesProfileType[];
      setProfileData(data);
      setTotalRecords(response.data.data.total_records);
    } catch (error) {
      console.error('Error fetching viewed profiles:', error);
    }
  };

  useEffect(() => {
    getViewedProfiles(profileId, page, rowsPerPage);
  }, [profileId, page, rowsPerPage, toDate, fromDate]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };
  const ClearDate = () => {
    setFromDate('');
    setToDate('');
    getViewedProfiles(profileId, page, rowsPerPage);
  };
  console.log(fromDate, toDate);
  return (
    <div>
      {profileData.length > 0 ? (
        <>
          <Typography
            sx={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Personal Notes for Profile ID {profileId}
          </Typography>
          <Box sx={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
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
            <Button
              variant="contained"
              onClick={ClearDate}
              sx={{ textTransform: 'none' }}
            >
              Reset Date
            </Button>
          </Box>
          <TableContainer sx={{border: '1px solid #E0E0E0',}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        color: '#ee3448',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                      }}
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {profileData.map((row) => (
                  <TableRow
                    key={row.notes_profileid}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TableCell>
                      <img
                        className="rounded-full"
                        src={row.notes_Profile_img || 'No_Image_Available'}
                        alt="Profile"
                        width={80}
                      />
                    </TableCell>
                    <TableCell>{row.notes_profileid}</TableCell>
                    <TableCell>{row.notes_profile_name}</TableCell>
                    <TableCell>{row.notes_profile_age}</TableCell>
                    <TableCell>{row.notes_details}</TableCell>
                    <TableCell>
                      {row.notes_verified === 1 ? (
                        <MdVerified className="text-green-600" />
                      ) : (
                        <GoUnverified className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>{row.notes_height}</TableCell>
                    <TableCell>{row.notes_star}</TableCell>
                    <TableCell>{row.notes_profession}</TableCell>
                    <TableCell>{row.notes_city}</TableCell>
                    <TableCell>{row.notes_degree}</TableCell>
                    <TableCell>{row.notes_match_score}</TableCell>
                    <TableCell>{row.notes_views}</TableCell>
                    <TableCell>{row.notes_lastvisit}</TableCell>
                    <TableCell>{row.notes_userstatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography
          sx={{
            marginBottom: '20px',
            color: 'black',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          No Notes Data
        </Typography>
      )}
    </div>
  );
}
