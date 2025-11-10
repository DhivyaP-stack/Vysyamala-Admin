
// import axios from 'axios';
// import React from 'react';
// import ReUseDataTable from '../ReuseProfileTable';

// interface Column {
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: 'right' | 'left' | 'center';
// }

// // Fetch profiles data function
// const fetchProfilesData = async (search: string, orderBy: string, order: 'asc' | 'desc', rowsPerPage: number, page: number) => {
//   const baseUrl = ` https://app.vysyamala.com/api/newprofile_get/?page_name=7&page=${page}`;
//   const params = new URLSearchParams({
//     page_size: rowsPerPage.toString(),
//     page: page.toString(),
//   });

//   if (search) {
//     params.append('search', search);
//   }

//   const response = await axios.get(`${baseUrl}&${params.toString()}`);
//   return response;
// };

// const columns: Column[] = [
//   { id: 'ProfileId', label: 'Profile ID', minWidth: 100, align: 'center' },
//   { id: 'Gender', label: 'Gender', minWidth: 100 },
//   { id: 'EmailId', label: 'Email', minWidth: 150 },
//   { id: 'MaritalStatus', label: 'Marital Status', minWidth: 100 },
//   { id: 'Profile_dob', label: 'Date of Birth', minWidth: 100 },
//   { id: 'Profile_city', label: 'Profile city', minWidth: 100 },
//   { id: 'complexion_desc', label: 'Complexion', minWidth: 100 },
//   { id: 'country_name', label: 'Country', minWidth: 100 },
//   { id: 'state_name', label: 'State', minWidth: 100 },
//   { id: 'district_name', label: 'District', minWidth: 100 },
//   { id: 'city_name', label: 'City', minWidth: 100 },
// ];

// const NewlyRegistered: React.FC = () => {
//   return (
//     <ReUseDataTable
//       fetchData={fetchProfilesData}
//       columns={columns}
//       editPath={(id: number) => `/admin/edit/${id}`}
//       detailPath={(id: number) => `/Matching-Profiles?profile_id=${id}`}
//     />
//   );
// };

// export default NewlyRegistered;

// import axios from 'axios';
// import React from 'react';
// import ReUseDataTable from '../ReuseProfileTable';

// interface Column {
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: 'right' | 'left' | 'center';
// }

// // Fetch profiles data function
// const fetchProfilesData = async (search: string, orderBy: string, order: 'asc' | 'desc', rowsPerPage: number, page: number,page_name:number) => {
//   const baseUrl = ` https://app.vysyamala.com/api/newprofile_get/?page_name=2&page=${page}`;
//   const params = new URLSearchParams({
//     page_size: rowsPerPage.toString(),
//     page_name: page_name.toString(),
//   });

//   if (search) {
//     params.append('search', search);
//   }

//   const response = await axios.get(`${baseUrl}&${params.toString()}`);
//   return response;
// };

// const columns: Column[] = [
//   { id: 'ProfileId', label: 'Profile ID', minWidth: 100, align: 'center' },
//   { id: 'Gender', label: 'Gender', minWidth: 100 },
//   { id: 'EmailId', label: 'Email', minWidth: 150 },
//   { id: 'MaritalStatus', label: 'Marital Status', minWidth: 100 },
//   { id: 'Profile_dob', label: 'Date of Birth', minWidth: 100 },
//   { id: 'Profile_city', label: 'Profile city', minWidth: 100 },
//   { id: 'complexion_desc', label: 'Complexion', minWidth: 100 },
//   { id: 'country_name', label: 'Country', minWidth: 100 },
//   { id: 'state_name', label: 'State', minWidth: 100 },
//   { id: 'district_name', label: 'District', minWidth: 100 },
//   { id: 'city_name', label: 'City', minWidth: 100 },
// ];

// const NewlyRegistered: React.FC = () => {
//   const rowsPerPage = 10; // Set default rows per page for NewlyRegistered

//   return (
//     <ReUseDataTable
//       fetchData={fetchProfilesData}
//       columns={columns}
//       rowsPerPage={rowsPerPage}
//       editPath={(id: number) => `/admin/edit/${id}`}
//       detailPath={(id: number) => `/Matching-Profiles?profile_id=${id}`}
//     />
//   );
// };

// export default NewlyRegistered;




// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableSortLabel,
//   TextField,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import axios from 'axios';
// import { baseUrl } from '../../../services/api';

// // Function to fetch data from the API
// export const getNewlyRegistered = async (
//   search: string,
//   orderBy: string,
//   order: 'asc' | 'desc',
//   rowsPerPage: number,
//   page: number,
//   page_name: number // Accept page_name as a parameter
// ) => {
  
  
//   // Construct the URL with query parameters
//   const params = new URLSearchParams({
//     page_size: rowsPerPage.toString(),
//     page: page.toString(),
//     page_name: page_name.toString(), // Pass the page_name parameter
//   });

//   if (search) {
//     params.append('search', search);
//   }
  
//   const url = `${baseUrl}?${params.toString()}`;
//   const response = await axios.get(url);
//   return response;
// };

// interface Column {
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: 'right' | 'left' | 'center';
// }

// const columns: Column[] = [
//   { id: 'ProfileId', label: 'Profile ID', minWidth: 100, align: 'center' },
//   { id: 'Gender', label: 'Gender', minWidth: 100 },
//   { id: 'EmailId', label: 'Email', minWidth: 150 },
//   { id: 'MaritalStatus', label: 'Marital Status', minWidth: 100 },
//   { id: 'Profile_dob', label: 'Date of Birth', minWidth: 100 },
//   { id: 'Profile_city', label: 'Profile city', minWidth: 100 },
//   { id: 'complexion_desc', label: 'Complexion', minWidth: 100 },
//   { id: 'country_name', label: 'Country', minWidth: 100 },
//   { id: 'state_name', label: 'State', minWidth: 100 },
//   { id: 'district_name', label: 'District', minWidth: 100 },
//   { id: 'city_name', label: 'City', minWidth: 100 },
// ];

// const NewlyRegistered: React.FC = () => {
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//   const [orderBy, setOrderBy] = useState<string>('ProfileId');
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const [data, setData] = useState<{ results: any[]; count: number }>({ results: [], count: 0 });
//   const [search, setSearch] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   // Here you can define a value for page_name
//   const pageNameValue = 7; // Change this to the desired page name value

//   useEffect(() => {
//     fetchData();
//   }, [page, rowsPerPage, order, orderBy, search]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await getNewlyRegistered(search, orderBy, order, rowsPerPage, page + 1, pageNameValue); // Pass pageNameValue
//       setData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestSort = (property: string) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(event.target.value);
//     setPage(0); // Reset page to 0 when search term changes
//   };

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleDelete = async (ContentId: number) => {
//     if (!ContentId) {
//       console.error('Error: Missing ID for the row to delete');
//       return;
//     }

//     const confirmed = window.confirm('Are you sure you want to delete this item?');
//     if (!confirmed) return;

//     try {
//       await axios.delete(` https://app.vysyamala.com/api/logindetails/${ContentId}/`);
//       fetchData(); // Refresh the data after deletion
//     } catch (error) {
//       console.error('Error deleting data:', error);
//     }
//   };

//   return (
//     <Paper className="w-full">
//       <div className="w-full text-right px-2">
//         <TextField
//           label="Search"
//           variant="outlined"
//           margin="normal"
//           value={search}
//           onChange={handleSearchChange}
//         />
//       </div>

//       <TableContainer className="bg-white">
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
//                   <TableSortLabel
//                     className="!text-red-600 !text-base !text-md text-nowrap font-semibold"
//                     active={orderBy === column.id}
//                     direction={orderBy === column.id ? order : 'asc'}
//                     onClick={() => handleRequestSort(column.id)}
//                   >
//                     {column.label}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//               <TableCell className="!text-red-600 !text-base !text-nowrap !font-semibold">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length + 1} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : (
//               data.results.map((row, index) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                   {columns.map((column) => {
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.id === 'ProfileId' ? (
//                           <Link to={`/Matching-Profiles?profile_id=${value}`} style={{ color: 'blue', textDecoration: 'underline' }}>
//                             {value}
//                           </Link>
//                         ) : (
//                           value
//                         )}
//                       </TableCell>
//                     );
//                   })}
//                   <TableCell>
//                     <Button component={Link} to={`/admin/edit/${row.ContentId}`}>
//                       Edit
//                     </Button>
//                     <Button onClick={() => handleDelete(row.ContentId)}>Delete</Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={data.count}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// };

// export default NewlyRegistered;

import React from 'react';
import ProbsProfiletable from '../ProbsProfileTable';



const NewlyRegisteredProfiles: React.FC = () => {
  return <ProbsProfiletable   pageNameValue={0} heading={'New Profiles'} />; // Pass the pageNameValue prop here
};

export default NewlyRegisteredProfiles;
