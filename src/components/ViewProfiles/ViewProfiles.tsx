import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { TablePagination, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
// import No_Image_Available from './images/No_Image_Available.jpg';
import { useLocation } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { ViewedProfilesProfileApi } from '../../services/api';

interface ViewedProfileType {
  visited_profileid: string;
  visited_profile_name: string;
  visited_Profile_img: string;
  visited_profile_age: number;
  visited_verified: number;
  visited_height: string;
  visited_star: string;
  visited_profession: string;
  visited_city: string;
  visited_degree: string;
  visited_match_score: number;
  visited_views: number;
  visited_lastvisit: string;
  visited_userstatus: string;
  visited_horoscope: string;
  visited_profile_wishlist: number;
}

const columns = [
  { id: 'visited_Profile_img', label: 'Image' },
  { id: 'visited_profileid', label: 'Profile ID' },
  { id: 'visited_profile_name', label: 'Name' },
  { id: 'visited_profile_age', label: 'Age' },
  { id: 'visited_verified', label: 'Verified' },
  { id: 'visited_height', label: 'Height' },
  { id: 'visited_star', label: 'Star' },
  { id: 'visited_profession', label: 'Profession' },
  { id: 'visited_city', label: 'Location' },
  { id: 'visited_degree', label: 'Degree' },
  { id: 'visited_match_score', label: 'Matching Score' },
  { id: 'visited_views', label: 'Views' },
  { id: 'visited_lastvisit', label: 'Last Visit' },
  { id: 'visited_userstatus', label: 'User Status' },
];

export default function ViewedProfilesById() {
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
      //   const response = await axios.post('http://192.168.1.18:8000/api/Viewed_profiles/', {
      //     profile_id: id,
      //     page_number: pageNumber + 1,
      //     per_page: perPage,
      //   });
      // const params = new URLSearchParams();
      // params.append('profile_id', id || '');
      // params.append('page_number', (pageNumber + 1).toString());
      // params.append('per_page', perPage.toString());
      // params.append('from_date', fromDate);
      // params.append('to_date', toDate);

      const response = await axios.post(
        ViewedProfilesProfileApi,
        {
          profile_id: id,
          page_number: pageNumber + 1, // Backend expects 1-based page index
          per_page: perPage,
        }
        // params.toString(),
        // {
        //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // },
      );
      const data = response.data.data.profiles as ViewedProfileType[];
      setProfileData(data);
      console.log("111111111111111",response.data.data.total_records)
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
  
  return (
    <div>
      {profileData ? (
        <>
          <Typography
            sx={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '1.5rem',
              fontWeight:"bold",
            }}
          >
            Viewed Profiles for Profile ID {profileId}
          </Typography>
         <Box sx={{display:"flex" ,gap:"5px",marginBottom:"10px"}}>
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
            sx={{ textTransform: 'none'}}
          >
            Reset Date
          </Button>
         </Box>
          <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ padding: '17px' }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        background: '#FFF9C9',
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
                {profileData.map((row,index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TableCell>
                      <img
                        className="rounded-full"
                        src={row.visited_Profile_img || 'No_Image_Available'}
                        alt="Profile"
                        width={80}
                      />
                    </TableCell>
                    <TableCell>{row.visited_profileid}</TableCell>
                    <TableCell>{row.visited_profile_name}</TableCell>
                    <TableCell>{row.visited_profile_age}</TableCell>
                    <TableCell>
                      {row.visited_verified === 1 ? (
                        <MdVerified className="text-green-600" />
                      ) : (
                        <GoUnverified className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>{row.visited_height}</TableCell>
                    <TableCell>{row.visited_star}</TableCell>
                    <TableCell>{row.visited_profession}</TableCell>
                    <TableCell>{row.visited_city}</TableCell>
                    <TableCell>{row.visited_degree}</TableCell>
                    <TableCell>{row.visited_match_score}</TableCell>
                    <TableCell>{row.visited_views}</TableCell>
                    <TableCell>{row.visited_lastvisit}</TableCell>
                    <TableCell>{row.visited_userstatus}</TableCell>
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
