import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Box, Button, TablePagination, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import {
  GetPhotoRequestProfileApi,
  ViewedProfilesProfileApi,
} from '../../services/api';

interface ViewedProfileType {
  req_profileid: string;
  req_profile_name: string;
  req_Profile_img: string;
  req_profile_age: number;
  req_verified: number;
  req_height: string;
  req_star: string;
  req_profession: string;
  req_city: string;
  req_degree: string;
  req_match_score: number;
  req_views: number;
  req_lastvisit: string;
  req_userstatus: string;
  req_horoscope: string;
  req_profile_wishlist: number;
}

const columns = [
  { id: 'req_Profile_img', label: 'Image' },
  { id: 'req_profileid', label: 'Profile ID' },
  { id: 'req_profile_name', label: 'Name' },
  { id: 'req_profile_age', label: 'Age' },
  { id: 'req_verified', label: 'Verified' },
  { id: 'req_height', label: 'Height' },
  { id: 'req_star', label: 'Star' },
  { id: 'req_profession', label: 'Profession' },
  { id: 'req_city', label: 'Location' },
  { id: 'req_degree', label: 'Degree' },
  { id: 'req_match_score', label: 'Matching Score' },
  { id: 'req_views', label: 'Views' },
  { id: 'req_lastvisit', label: 'Last Visit' },
  { id: 'req_userstatus', label: 'User Status' },
];

export default function GetPhotoRequestProfile() {
  const [profileData, setProfileData] = useState<ViewedProfileType[]>([]);
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
        GetPhotoRequestProfileApi,
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      const data = response.data.data.profiles as ViewedProfileType[];
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
  const ClearDate=()=>{
    setFromDate("")
    setToDate("")
    getViewedProfiles(profileId, page, rowsPerPage);
  }
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
            Get Photo Request Profile for Profile ID {profileId}
          </Typography>
         <Box  sx={{display:"flex" ,gap:"5px",marginBottom:"10px"}}>
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
          <Button  variant="contained" onClick={ClearDate} sx={{textTransform:"none"}}>Reset Date</Button>
          </Box>
          <TableContainer sx={{border:"1px solid #E0E0E0"}} component={Paper}>
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
                    key={row.req_profileid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 },whiteSpace: 'nowrap' }}
                  >
                    <TableCell>
                      <img
                        className="rounded-full"
                        src={row.req_Profile_img || 'No_Image_Available'}
                        alt="Profile"
                        width={80}
                      />
                    </TableCell>
                    <TableCell>{row.req_profileid}</TableCell>
                    <TableCell>{row.req_profile_name}</TableCell>
                    <TableCell>{row.req_profile_age}</TableCell>
                    <TableCell>
                      {row.req_verified === 1 ? (
                        <MdVerified className="text-green-600" />
                      ) : (
                        <GoUnverified className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>{row.req_height}</TableCell>
                    <TableCell>{row.req_star}</TableCell>
                    <TableCell>{row.req_profession}</TableCell>
                    <TableCell>{row.req_city}</TableCell>
                    <TableCell>{row.req_degree}</TableCell>
                    <TableCell>{row.req_match_score}</TableCell>
                    <TableCell>{row.req_views}</TableCell>
                    <TableCell>{row.req_lastvisit}</TableCell>
                    <TableCell>{row.req_userstatus}</TableCell>
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
          No Viewed Data
        </Typography>
      )}
    </div>
  );
}
