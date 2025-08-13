// import React, { useEffect, useState } from 'react';

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
//   Typography,
//   Checkbox,
//   FormControlLabel,

// } from '@mui/material';
// import axios from 'axios';
// import { fetchStatePreferences, getExpressIntrest } from '../../../services/api';
// import { Link } from 'react-router-dom';

// interface Column {
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: 'right' | 'left' | 'center';
// }

// interface ExpressInterestData {
//   results: any[];
//   count: number;
// }

// const ExpressIntrest: React.FC = () => {
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//   const [orderBy, setOrderBy] = useState<string>('profile_from_id');
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const [data, setData] = useState<ExpressInterestData>({ results: [], count: 0 });
//   const [search, setSearch] = useState<string>('');

//   const [fromDate, setFromDate] = useState<string>('');
//   const [toDate, setToDate] = useState<string>('');

//   const [states, setStates] = useState<any[]>([]);
//   const [selectedStates, setSelectedStates] = useState<number[]>([]);
//   const [loading, setLoading] = useState<boolean>(true); // State for loading

//   const loadStates = async () => {
//     try {
//       const statesArray = await fetchStatePreferences(); // Call the API fetch function
//       setStates(statesArray);
//     } catch (error) {
//       console.error('Error fetching states:', error);
//     } finally {
//       setLoading(false); // Stop loading after fetching
//     }
//   };

//   useEffect(() => {
//     loadStates();
//   }, []);

//   const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const stateId = parseInt(event.target.value);
//     setSelectedStates((prev) =>
//       prev.includes(stateId) ? prev.filter((id) => id !== stateId) : [...prev, stateId]
//     );
//   };
//   useEffect(() => {
//     fetchData();
//   }, [fromDate, toDate, selectedStates]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await getExpressIntrest(fromDate, toDate, selectedStates);
//       setData(response);
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

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (name === 'fromDate') {
//       setFromDate(value);
//     } else if (name === 'toDate') {
//       setToDate(value);
//     }
//   };

//   const handleSubmit = () => {
//     fetchData(); // Call the API with the selected filters
//   };

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const columns: Column[] = [
//     { id: 'profile_from_id', label: 'From Profile ID', minWidth: 100, align: 'center' },
//     { id: 'profile_from_name', label: 'From Name', minWidth: 150 },
//     { id: 'profile_from_mobile', label: 'From Mobile', minWidth: 150 },
//     { id: 'profile_to_id', label: 'To Profile ID', minWidth: 100 },
//     { id: 'profile_to_name', label: 'To Name', minWidth: 150 },
//     { id: 'profile_to_mobile', label: 'To Mobile', minWidth: 150 },
//     { id: 'to_express_message', label: 'Message', minWidth: 200 },
//     { id: 'req_datetime', label: 'Request Date', minWidth: 150 },
//     { id: 'response_datetime', label: 'Response Date', minWidth: 150 },
//     { id: 'status', label: 'Status', minWidth: 100 },
//   ];

//   // Filter data based on search term
//   const filteredResults = data.results.filter(row =>
//     Object.values(row).some(value =>
//       String(value).toLowerCase().includes(search.toLowerCase())
//     )
//   );

//     function handleDelete(_ContentId: any): void {
//         throw new Error('Function not implemented.');
//     }

//   return (
//     <>
//      <h1 className="text-2xl font-bold mb-4">Express Interest</h1>
//     <Paper className="w-full">
//       <div className="w-full p-2 flex justify-between">
//         <div className="w-full text-right px-2">
//           <TextField
//             label="Search"
//             variant="outlined"
//             margin="normal"
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <div className="flex items-center space-x-2">
//             <TextField
//               label="From Date"
//               type="date"
//               name="fromDate"
//               value={fromDate}
//               onChange={handleDateChange}
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="To Date"
//               type="date"
//               name="toDate"
//               value={toDate}
//               onChange={handleDateChange}
//               InputLabelProps={{ shrink: true }}
//             />
//              <div className="flex flex-wrap p-2">
//       {loading ? ( // Show loading indicator while fetching
//         <CircularProgress />
//       ) : states.length > 0 ? (
//         states.map((state) => (
//           <FormControlLabel
//             key={state.State_Pref_id}
//             control={
//               <Checkbox
//                 value={state.State_Pref_id}
//                 checked={selectedStates.includes(state.State_Pref_id)}
//                 onChange={handleStateChange}
//                 color="primary"
//               />
//             }
//             label={state.State_name}
//           />
//         ))
//       ) : (
//         <Typography>No states available</Typography>
//       )}
//     </div>
//             <Button variant="contained" onClick={handleSubmit}>
//               Submit
//             </Button>
//           </div>
//         </div>

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
//               {/* <TableCell className="!text-red-600 !text-base !text-nowrap !font-semibold">
//                   Actions
//                 </TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={index}>
//                   {columns.map((column) => (
//                     <TableCell key={column.id} align={column.align}>
//                       {row[column.id]}
//                     </TableCell>
//                   ))}
//                      {/* <TableCell>

//                      <Button>
//                        <Link to={`/editProfile?profileId=${row.ProfileId}`}>
//                          Edit
//                        </Link>
//                      </Button>
//                      <Button onClick={() => handleDelete(row.ContentId)}>
//                        Delete
//                      </Button>
//                    </TableCell> */}
//                 </TableRow>
//               ))
//             )}

//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[1,2,5,10, 25, 100]}
//         component="div"
//         count={filteredResults.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//     </>
//   );
// };

// export default ExpressIntrest;




// import React, { useEffect, useState } from 'react';
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
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Box,
// } from '@mui/material';
// import axios from 'axios';
// import {
//   fetchStatePreferences,
//   getExpressIntrest,
// } from '../../../services/api';
// import { Link } from 'react-router-dom';

// interface Column {
//   id: string;
//   label: string;
//   minWidth?: number;
//   align?: 'right' | 'left' | 'center';
// }

// interface ExpressInterestData {
//   results: any[];
//   count: number;
// }

// const ExpressIntrest: React.FC = () => {
//   const [order, setOrder] = useState<'asc' | 'desc'>('asc');
//   const [orderBy, setOrderBy] = useState<string>('profile_from_id');
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const [data, setData] = useState<ExpressInterestData>({
//     results: [],
//     count: 0,
//   });
//   const [search, setSearch] = useState<string>('');

//   const [fromDate, setFromDate] = useState<string>('');
//   const [toDate, setToDate] = useState<string>('');

//   const [states, setStates] = useState<any[]>([]);
//   const [selectedStates, setSelectedStates] = useState<number[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const loadStates = async () => {
//     try {
//       const statesArray = await fetchStatePreferences();
//       setStates(statesArray);
//     } catch (error) {
//       console.error('Error fetching states:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadStates();
//   }, []);

//   const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const stateId = parseInt(event.target.value);
//     setSelectedStates((prev) =>
//       prev.includes(stateId)
//         ? prev.filter((id) => id !== stateId)
//         : [...prev, stateId],
//     );
//   };

//   useEffect(() => {
//     fetchData();
//   }, [fromDate, toDate, selectedStates,page, rowsPerPage]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await getExpressIntrest(
//         fromDate,
//         toDate,
//         selectedStates,
//          page+1,
//         rowsPerPage
       
//       );
//       setData(response);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleRequestSort = (property: string) => {
//   //   const isAsc = orderBy === property && order === 'asc';
//   //   setOrder(isAsc ? 'desc' : 'asc');
//   //   setOrderBy(property);
//   // };
//   const handleRequestSort = (property: string) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//     setPage(0); // Reset page on sort change
//   };
  
//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(event.target.value);
//     setPage(0); // Reset page to 0 when search term changes
//   };

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (name === 'fromDate') {
//       setFromDate(value);
//     } else if (name === 'toDate') {
//       setToDate(value);
//     }
//   };

//   const handleSubmit = () => {
//     fetchData(); // Call the API with the selected filters
//   };

//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const columns: Column[] = [
//     {
//       id: 'profile_from_id',
//       label: 'From Profile ID',
//       minWidth: 100,
//       align: 'center',
//     },
//     { id: 'profile_from_name', label: 'From Name', minWidth: 150 },
//     { id: 'profile_from_mobile', label: 'From Mobile', minWidth: 150 },
//     { id: 'profile_to_id', label: 'To Profile ID', minWidth: 100 },
//     { id: 'profile_to_name', label: 'To Name', minWidth: 150 },
//     { id: 'profile_to_mobile', label: 'To Mobile', minWidth: 150 },
//     { id: 'to_express_message', label: 'Message', minWidth: 200 },
//     { id: 'req_datetime', label: 'Request Date', minWidth: 150 },
//     { id: 'response_datetime', label: 'Response Date', minWidth: 150 },
//     { id: 'status', label: 'Status', minWidth: 100 },
//   ];

//   const descendingComparator = (a: any, b: any, orderBy: string) => {
//     if (b[orderBy] < a[orderBy]) return -1;
//     if (b[orderBy] > a[orderBy]) return 1;
//     return 0;
//   };

//   const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
//     return order === 'desc'
//       ? (a: any, b: any) => descendingComparator(a, b, orderBy)
//       : (a: any, b: any) => -descendingComparator(a, b, orderBy);
//   };

//   const stableSort = (array: any[], comparator: (a: any, b: any) => number) => {
//     const stabilizedThis = array.map(
//       (el, index) => [el, index] as [any, number],
//     );
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) return order;
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
//   };

//   // Filter and sort data based on search term and order
//   const filteredResults = stableSort(
//     data.results.filter((row) =>
//       Object.values(row).some((value) =>
//         String(value).toLowerCase().includes(search.toLowerCase()),
//       ),
//     ),
//     getComparator(order, orderBy),
//   );

//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-4 text-black">Express Interest</h1>
//       <Box className="w-full">
//         <div className="w-full py-2 flex justify-between">
//           <div className="w-full text-right flex justify-between">
//             <div className="flex items-center space-x-2">
//               <TextField
//                 label="From Date"
//                 type="date"
//                 name="fromDate"
//                 value={fromDate}
//                 onChange={handleDateChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//               <TextField
//                 label="To Date"
//                 type="date"
//                 name="toDate"
//                 value={toDate}
//                 onChange={handleDateChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//               <div className="flex flex-wrap p-2">
//                 {loading ? (
//                   <CircularProgress />
//                 ) : states.length > 0 ? (
//                   states.map((state) => (
//                     <FormControlLabel
//                       key={state.State_Pref_id}
//                       control={
//                         <Checkbox
//                           value={state.State_Pref_id}
//                           checked={selectedStates.includes(state.State_Pref_id)}
//                           onChange={handleStateChange}
//                           color="primary"
//                         />
//                       }
//                       label={state.State_name}
//                     />
//                   ))
//                 ) : (
//                   <Typography>No states available</Typography>
//                 )}
//                 <Button variant="contained" onClick={handleSubmit}>
//                   Submit
//                 </Button>
//               </div>
//             </div>
//             <TextField
//               label="Search"
//               variant="outlined"
//               margin="normal"
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </div>
//         </div>

//         <TableContainer
//           sx={{ border: '1px solid #E0E0E0' }}
//           className="bg-white"
//         >
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {columns.map((column, index) => (
//                   <TableCell
//                     sx={{
//                       borderBottom: '1px solid #E0E0E0',

//                       background: '#FFF9C9',
//                       color: '#DC2635',
//                       fontSize: '1rem',
//                       fontWeight: 600,
//                     }}
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     <TableSortLabel
//                       className="!text-red-600 !text-base !text-md text-nowrap font-semibold"
//                       active={orderBy === column.id}
//                       direction={orderBy === column.id ? order : 'asc'}
//                       onClick={() => handleRequestSort(column.id)}
//                     >
//                       {column.label}
//                     </TableSortLabel>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {
//                 data.results
//               // filteredResults
//               //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <TableRow key={index}>
//                     {columns.map((column) => (
//                       <TableCell
//                         sx={{ whiteSpace: 'nowrap' }}
//                         key={column.id}
//                         align={column.align}
//                       >
//                         {row[column.id]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[2,5,10, 25, 50, 100]}
//           component="div"
//           count={data.count-1}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </>
//   );
// };

// export default ExpressIntrest;



import React, { useEffect, useState } from 'react';
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
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';
import axios from 'axios';
import {
  fetchStatePreferences,
  getExpressIntrest,
} from '../../../services/api';
import { Link } from 'react-router-dom';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

interface ExpressInterestData {
  results: any[];
  count: number;
}



const ExpressInterest: React.FC = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("profile_from_id");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [data, setData] = useState<ExpressInterestData>({ results: [], count: 0 });
  const [search, setSearch] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [states, setStates] = useState<any[]>([]);
  const [selectedStates, setSelectedStates] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load state preferences on mount
  useEffect(() => {
    const loadStates = async () => {
      try {
        const statesArray = await fetchStatePreferences();
        setStates(statesArray);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    loadStates();
  }, []);

  // Fetch data whenever filters, pagination, or sorting changes
  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, selectedStates, page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getExpressIntrest(fromDate, toDate, selectedStates, page, rowsPerPage);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1); // Reset page on sort change
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset page on search change
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "fromDate") setFromDate(value);
    if (name === "toDate") setToDate(value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stateId = parseInt(event.target.value);
    setSelectedStates((prev) =>
      prev.includes(stateId) ? prev.filter((id) => id !== stateId) : [...prev, stateId]
    );
  };

  const handleSubmit = () => {
    fetchData();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1); // Adjust for API (1-based indexing)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const columns: Column[] = [
    { id: "profile_from_id", label: "From Profile ID", minWidth: 100, align: "center" },
    { id: "profile_from_name", label: "From Name", minWidth: 150 },
    { id: "profile_from_mobile", label: "From Mobile", minWidth: 150 },
    { id: "profile_to_id", label: "To Profile ID", minWidth: 100 },
    { id: "profile_to_name", label: "To Name", minWidth: 150 },
    { id: "profile_to_mobile", label: "To Mobile", minWidth: 150 },
    { id: "to_express_message", label: "Message", minWidth: 200 },
    { id: "req_datetime", label: "Request Date", minWidth: 150 },
    { id: "response_datetime", label: "Response Date", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 100 },
  ];



  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-black">Express Interests</h1>
      <Box className="w-full">
        <div className="w-full py-2 flex justify-between">
          <div className="w-full text-right flex justify-between">
            <div className="flex items-center space-x-2">
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
              <div className="flex flex-wrap p-2">
                {loading ? (
                  <CircularProgress />
                ) : states.length > 0 ? (
                  states.map((state) => (
                    <FormControlLabel
                      key={state.State_Pref_id}
                      control={
                        <Checkbox
                          value={state.State_Pref_id}
                          checked={selectedStates.includes(state.State_Pref_id)}
                          onChange={handleStateChange}
                          color="primary"
                        />
                      }
                      label={state.State_name}
                    />
                  ))
                ) : (
                  <Typography>No states available</Typography>
                )}
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
            <TextField
              label="Search"
              variant="outlined"
              margin="normal"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <TableContainer
          sx={{ border: '1px solid #E0E0E0' }}
          className="bg-white"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      borderBottom: '1px solid #E0E0E0',

                      background: '#FFF9C9',
                      color: '#DC2635',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
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
              </TableRow>
            </TableHead>
            <TableBody>
              {
              // filteredResults
              //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              data.results
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell
                        sx={{ whiteSpace: 'nowrap' }}
                        key={column.id}
                        align={column.align}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2,5,10, 25, 50, 100]}
          component="div"
          count={data.count}
          rowsPerPage={rowsPerPage}
          page={page-1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default ExpressInterest;
