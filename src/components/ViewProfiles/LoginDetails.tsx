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
import { GetPhotoRequestProfileApi, LoginDetailsApi } from '../../services/api';

interface UserProfile {
  ContentId: number;
  ProfileId: string;
  Name: string;
  City: string;
  Email: string;
  LastLoginDate: string; // Use `Date` if you plan to parse it
  Status: number;
}

const columns = [
  { id: 'ProfileId', label: 'Profile Id' },
  { id: 'Name', label: 'Name' },
  { id: 'City', label: 'City' },
  { id: 'Email', label: 'Email' },
  { id: 'LastLoginDate', label: 'LastLoginDate' },
  { id: 'Status', label: 'Status' },
];

export default function LoginDetails() {
  const [profileData, setProfileData] = useState<UserProfile[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');

  const getViewedProfiles = async (pageNumber: number, perPage: number) => {
    try {
      // const params = new URLSearchParams();

      // params.append('page', (pageNumber + 1).toString());
      // params.append('page_size', perPage.toString());
      // params.append('from_date', fromDate);
      // params.append('to_date', toDate);
      const response = await axios.get(LoginDetailsApi, 
        //params.toString()
        {
          params: {
            page: pageNumber + 1,
            page_size:perPage,
          },
        }
    
    );

      const data = response.data.results as UserProfile[];
      setProfileData(data);
      console.log('ddddddddddddddddddddddddd',response.data.results)
      setTotalRecords(response.data.count);
    } catch (error) {
      console.error('Error fetching viewed profiles:', error);
    }
  };

  useEffect(() => {
    getViewedProfiles(page, rowsPerPage);
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
    getViewedProfiles(page, rowsPerPage);
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
            Login Details
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
          <TableContainer
            sx={{ border: '1px solid #E0E0E0' }}
            component={Paper}
          >
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
                {profileData.map((row,index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TableCell>{row.ProfileId}</TableCell>
                    <TableCell>{row.Name}</TableCell>
                    <TableCell>{row.City}</TableCell>

                    <TableCell>{row.Email}</TableCell>
                    <TableCell>{row.LastLoginDate}</TableCell>
                    <TableCell>{row.Status}</TableCell>
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
          No Login Data
        </Typography>
      )}
    </div>
  );
}



// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';
// import { Box, Button, TablePagination, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { LoginDetailsApi } from '../../services/api';

// interface UserProfile {
//   ContentId: number;
//   ProfileId: string;
//   Name: string;
//   City: string;
//   Email: string;
//   LastLoginDate: string;
//   Status: number;
// }

// const columns = [
//   { id: 'ProfileId', label: 'Profile Id' },
//   { id: 'Name', label: 'Name' },
//   { id: 'City', label: 'City' },
//   { id: 'Email', label: 'Email' },
//   { id: 'LastLoginDate', label: 'Last Login Date' },
//   { id: 'Status', label: 'Status' },
// ];

// export default function LoginDetails() {
//   const [profileData, setProfileData] = useState<UserProfile[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const [totalRecords, setTotalRecords] = useState<number>(0);
//   const [fromDate, setFromDate] = useState<string>('');
//   const [toDate, setToDate] = useState<string>('');
  
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');

//   // Fetch login details
//   const getViewedProfiles = async (pageNumber: number, perPage: number) => {
//     try {
//       const response = await axios.get(LoginDetailsApi, {
//         params: {
//           page: pageNumber + 1, // Adjusting for API's 1-based indexing
//           page_size: perPage,
//           from_date: fromDate || undefined,
//           to_date: toDate || undefined,
//         },
//       });

//       setProfileData(response.data.results);
//       setTotalRecords(response.data.count);
//     } catch (error) {
//       console.error('Error fetching viewed profiles:', error);
//     }
//   };

//   useEffect(() => {
//     getViewedProfiles(page, rowsPerPage);
//   }, [profileId, page, rowsPerPage, fromDate, toDate]);

//   // Handle page change
//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   // Handle date input changes
//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (name === 'fromDate') setFromDate(value);
//     if (name === 'toDate') setToDate(value);
//   };

//   // Clear date filters
//   const clearDateFilters = () => {
//     setFromDate('');
//     setToDate('');
//     setPage(0); // Reset pagination to first page
//   };

//   return (
//     <div>
//       <Typography sx={{ marginBottom: '20px', color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>
//         Login Details
//       </Typography>

//       {/* Date Filters */}
//       <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
//         <TextField
//           label="From Date"
//           type="date"
//           name="fromDate"
//           value={fromDate}
//           onChange={handleDateChange}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="To Date"
//           type="date"
//           name="toDate"
//           value={toDate}
//           onChange={handleDateChange}
//           InputLabelProps={{ shrink: true }}
//         />
//         <Button variant="contained" onClick={clearDateFilters} sx={{ textTransform: 'none' }}>
//           Reset Date
//         </Button>
//       </Box>

//       {/* Table */}
//       <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="login details table">
//           <TableHead sx={{ background: '#FFF9C9', padding: '17px' }}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   sx={{
//                     color: '#ee3448',
//                     fontWeight: 'bold',
//                     fontSize: '1rem',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {profileData.length > 0 ? (
//               profileData.map((row) => (
//                 <TableRow key={row.ProfileId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell>{row.ProfileId}</TableCell>
//                   <TableCell>{row.Name}</TableCell>
//                   <TableCell>{row.City}</TableCell>
//                   <TableCell>{row.Email}</TableCell>
//                   <TableCell>{row.LastLoginDate}</TableCell>
//                   <TableCell>{row.Status}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No Login Data Found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25, 50,100]}
//         component="div"
//         count={totalRecords}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// }
