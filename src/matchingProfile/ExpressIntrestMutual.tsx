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

import { ExpressInterestMutualApi } from '../services/api';

interface ExpressInterestProfileType {
  mutint_profileid: string;
  mutint_profile_name: string;
  mutint_Profile_img: string;
  mutint_profile_age: number;
  mutint_verified: number;
  mutint_height: string;
  mutint_star: string;
  mutint_profession: string;
  mutint_city: string;
  mutint_degree: string;
  mutint_match_score: number;
  mutint_views: number;
  mutint_lastvisit: string;
  mutint_userstatus: string;
  mutint_horoscope: string;
  mutint_profile_wishlist: number;
}

const columns = [
  { id: 'mutint_Profile_img', label: 'Image' },
  { id: 'mutint_profileid', label: 'Profile ID' },
  { id: 'mutint_profile_name', label: 'Name' },
  { id: 'mutint_profile_age', label: 'Age' },
  { id: 'mutint_verified', label: 'Verified' },
  { id: 'mutint_height', label: 'Height' },
  { id: 'mutint_star', label: 'Star' },
  { id: 'mutint_profession', label: 'Profession' },
  { id: 'mutint_city', label: 'Location' },
  { id: 'mutint_degree', label: 'Degree' },
  { id: 'mutint_match_score', label: 'Matching Score' },
  { id: 'mutint_views', label: 'Views' },
  { id: 'mutint_lastvisit', label: 'Last Visit' },
  { id: 'mutint_userstatus', label: 'User Status' },
];

export default function ExpressInterestMutualProfiles() {
  const [profileData, setProfileData] = useState<ExpressInterestProfileType[]>(
    [],
  );
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [toDate, setToDate] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');

  const getExpressInterestProfiles = async (
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
        ExpressInterestMutualApi,
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      const data = response.data.data.profiles as ExpressInterestProfileType[];
      setProfileData(data);
      setTotalRecords(response.data.data.total_records);
    } catch (error) {
      console.error('Error fetching express interest profiles:', error);
    }
  };

  useEffect(() => {
    getExpressInterestProfiles(profileId, page, rowsPerPage);
  }, [profileId, page, rowsPerPage, fromDate, toDate]);

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
    getExpressInterestProfiles(profileId, page, rowsPerPage);
  };
  console.log(fromDate, toDate);
  return (
    <div>
      {profileData ? (
        <>
          <Typography
            sx={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Express Interest Mutual Profiles for Profile ID {profileId}
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
          <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="express interest table">
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
                    key={row.mutint_profileid}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TableCell>
                      <img
                        className="rounded-full"
                        src={row.mutint_Profile_img || 'No_Image_Available'}
                        alt="Profile"
                        width={80}
                      />
                    </TableCell>
                    <TableCell>{row.mutint_profileid}</TableCell>
                    <TableCell>{row.mutint_profile_name}</TableCell>
                    <TableCell>{row.mutint_profile_age}</TableCell>
                    <TableCell>
                      {row.mutint_verified === 1 ? (
                        <MdVerified className="text-green-600" />
                      ) : (
                        <GoUnverified className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>{row.mutint_height}</TableCell>
                    <TableCell>{row.mutint_star}</TableCell>
                    <TableCell>{row.mutint_profession}</TableCell>
                    <TableCell>{row.mutint_city}</TableCell>
                    <TableCell>{row.mutint_degree}</TableCell>
                    <TableCell>{row.mutint_match_score}</TableCell>
                    <TableCell>{row.mutint_views}</TableCell>
                    <TableCell>{row.mutint_lastvisit}</TableCell>
                    <TableCell>{row.mutint_userstatus}</TableCell>
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
          No Profiles Found
        </Typography>
      )}
    </div>
  );
}
