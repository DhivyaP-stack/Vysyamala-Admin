import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { TablePagination, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Profile {
  ContentId: number;
  ProfileId: string;
  Profile_name: string;
  Age: number;
  Profile_city: string;
  highest_education: string;
  profession: string;
  anual_income: string;
  suya_gothram: string;
  birthstar_name: string;
  status: string;
}
const columns = [
  { id: 'ProfileId', label: 'Profile Id' },
  { id: 'Profile_name', label: 'Name' },
  { id: 'Age', label: 'Age' },
  { id: 'Profile_city', label: 'City' },
  { id: 'highest_education', label: 'Highest Education' },
  { id: 'profession', label: 'Profession' },
  { id: 'anual_income', label: 'Annual income' },
  { id: 'suya_gothram', label: 'Suya Gothram' },
  { id: 'birthstar_name', label: 'Birthstar Name' },
  { id: 'status', label: 'Status' },
];

export default function ProfileSentTo() {
  const [profileData, setProfileData] = useState<Profile[]>([]);
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
      const params = new URLSearchParams();

      params.append('page_number', (pageNumber + 1).toString());
      params.append('per_page', perPage.toString());
      params.append('from_date', fromDate);
      params.append('to_date', toDate);

      const response = await axios.post(
        `http://192.168.1.16:8000/api/profile-send-to/${profileId}/`,
        params.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const dataObject = response.data.data;

      // Use Object.entries() to include both keys and values
      //   const dataArray = Object.entries(dataObject).map(([key, value]) => ({
      //     key, // This is the key
      //     value, // This is the value
      //   }));

      console.log(dataObject, 'Transformed data with keys and values');

      setProfileData(dataObject); // Set state with the array including keys and values
      setTotalRecords(response.data.count); // Set total records
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
            Profile Sent
          </Typography>
          \
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
                {profileData.map((row) => (
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TableCell>{row.ProfileId}</TableCell>
                    <TableCell>{row.Profile_name}</TableCell>
                    <TableCell>{row.Age}</TableCell>
                    <TableCell>{row.Profile_city}</TableCell>
                    <TableCell>{row.highest_education}</TableCell>
                    <TableCell>{row.profession}</TableCell>
                    <TableCell>{row.anual_income}</TableCell>
                    <TableCell>{row.suya_gothram}</TableCell>
                    <TableCell>{row.birthstar_name}</TableCell>
                    <TableCell>{row.status}</TableCell>
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
          No Records Available
        </Typography>
      )}
    </div>
  );
}
