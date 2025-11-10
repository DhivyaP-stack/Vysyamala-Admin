// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';
// import { TablePagination, Typography } from '@mui/material';
// import axios from 'axios';
// import No_Image_Available from '../images/No_Image_Available .jpg';
// import { useLocation } from 'react-router-dom';
// import { CToCReceivedProfileApi, matchingProfileApi } from '../services/api';
// import { MdVerified } from 'react-icons/md';
// import { GoUnverified } from 'react-icons/go';

// interface ProfileImage {
//   [key: string]: string;
// }

// export interface State {
//   state_id: string;
//   state_name: string;
// }
// export interface ProfileType {
//   profile_id: string;
//   profile_name: string;
//   profile_dob:string;
//   profile_state:string;
//   profile_city:string;
//   profile_mobile:string;
//   profile_gender:string;
//   profile_planname:String;
//   profile_created_by:string
// }

// const columns = [
//   { id: 'profile_img', label: 'Image' },
//   { id: 'profile_id', label: 'Profile ID' },
//   { id: 'profile_name', label: 'Name' },
//   { id: 'profile_age', label: 'Age' },
//   { id: 'profile_gender', label: 'Gender' },
//   { id: 'height', label: 'Height' },
//   { id: 'weight', label: 'Weight' },
//   { id: 'degree', label: 'Degree' },
//   { id: 'profession', label: 'Profession' },
//   { id: 'location', label: 'Location' },
//   { id: 'star', label: 'Star' },
//   { id: 'matching_score', label: 'Matching Score' },
//   { id: 'verified', label: 'Verified' },
// ];

// export default function CToCReceivedProfile() {

//   const [profileData, setProfileData] = useState<ProfileType[]>([]);

//   const [page, setPage] = useState<number>(0); // Zero-based page index for MUI
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Rows per page
//   const [totalRecords, setTotalRecords] = useState<number>(0); // Total record count
  
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');
 
  
//   // Fetch profiles from the server
//   const getProfileListMatch = async (
//     id: string | null|number,
//     pageNumber: number,
//     perPage: number,
//   ) => {
//     try {
//       const response = await axios.get(`${CToCReceivedProfileApi}`,
//     //      {
//     //     profile_id: id,
//     //     page_number: pageNumber + 1, // Backend expects 1-based page index
//     //     per_page: perPage,
//     //   }
    
//     {
//         params: {
//           profile_id: id,
//           page_number: pageNumber + 1, // Backend expects 1-based page index
//           per_page: perPage,
//         },
//       }

//     );

//       const data = response.data as ProfileType[];
//       setProfileData(data);
//       setTotalRecords(response.data.count); // Update total records for pagination
//     } catch (error) {
//       console.error('Error fetching profile details:', error);
//     }
//   };

//   // Fetch profile list when profileId or page/filter changes
//   useEffect(() => {
//     getProfileListMatch(profileId, page, rowsPerPage);
//   }, [profileId, page, rowsPerPage]);

//   // Handle page change
//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0); // Reset page to the first page when rows per page changes
//   };
  
  
 
//   return (
//     <div>
   
//     {profileData ? (
//       <>

//         <Typography
//           sx={{
//             marginBottom: '20px',
//             color: 'black',
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//           }}
//         >
//           C To C Received Lists For Profile Id {profileId}
//         </Typography>
//       <Paper className="w-full">
//           <TableContainer
//             sx={{ border: '1px solid #E0E0E0' }}
//             component={Paper}
//           >
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       sx={{
//                         borderBottom: '1px solid #E0E0E0',

//                         color: '#ee3448',
//                         fontWeight: 'bold',
//                         fontSize: '1rem',
//                         whiteSpace: 'nowrap',
//                       }}
//                       key={column.id}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                   {/* <TableCell>Action</TableCell> */}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {profileData?.map((row) => (
//                   <TableRow
//                     key={row.profile_id}
//                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                   >
//                     <TableCell>
//                       {row.profile_img &&
//                       Object.values(row.profile_img).length > 0 ? (
//                         <img
//                           className="rounded-full"
//                           src={Object.values(row.profile_img)[0]}
//                           alt="Profile"
//                           width={80}
//                         />
//                       ) : (
//                         <img
//                           className="rounded-full"
//                           src={No_Image_Available}
//                           alt="Profile"
//                           width={80}
//                         />
//                       )}
//                     </TableCell>
//                     <TableCell>{row.profile_id}</TableCell>
//                     <TableCell>{row.profile_name}</TableCell>
//                     <TableCell>{row.profile_age}</TableCell>
//                     <TableCell>{row.profile_gender}</TableCell>
//                     <TableCell>{row.height}</TableCell>
//                     <TableCell>{row.weight || 'N/A'}</TableCell>
//                     <TableCell>{row.degree}</TableCell>
//                     <TableCell>{row.profession}</TableCell>
//                     <TableCell>{row.location}</TableCell>
//                     <TableCell>{row.star}</TableCell>
//                     <TableCell>{row.matching_score}</TableCell>
//                     <TableCell>
//                       {row.verified === 0 ? (
//                         <MdVerified className="text-green-600" />
//                       ) : (
//                         <GoUnverified className="text-red-600" />
//                       )}
//                     </TableCell>
//                     {/* <TableCell>
//                   <Button
//                     onClick={() =>
//                       navigate(`/editProfile?profileId=${row.profile_id}`)
//                     }
//                   >
//                     Edit
//                   </Button>
//                   <Button>Delete</Button>
//                 </TableCell> */}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           </Paper>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25, 100]}
//             component="div"
//             count={totalRecords}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </>
//       ) : (
//         <Typography
//           sx={{
//             marginBottom: '20px',
//             color: 'black',
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//           }}
//         >
//           No Matching Data
//         </Typography>
//       )}
//     </div>
//   );
// }



// import  { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";

// import { useLocation } from "react-router-dom";

// const CToCReceivedProfileApi = "http://192.168.1.12:8000/api/get_ctoc_received_profiles/";

// const ReceivedCallActionProfiles = () => {
//   const [profileData, setProfileData] = useState([]);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');
 

//   useEffect(() => {
//     getProfileListMatch("VY240002", page, rowsPerPage);
//   }, [page, rowsPerPage]);

//   const getProfileListMatch = async (id: string, pageNumber: number, perPage: number) => {
//     try {
//       const response = await axios.get(CToCReceivedProfileApi, {
//         params: {
//           profile_id: id,
//           page_number: pageNumber + 1, // Backend expects 1-based index
//           per_page: perPage,
//         },
//       });

//       const data = response.data.results || [];
//       console.log(data)
//       setProfileData(data);
//       setTotalRecords(response.data.count || 0);
//     } catch (error) {
//       console.error("Error fetching profile details:", error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Photo</TableCell>
//               <TableCell>Profile ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Date of Birth</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>State</TableCell>
//               <TableCell>City</TableCell>
//               <TableCell>Mobile</TableCell>
//               <TableCell>Plan Name</TableCell>
//               <TableCell>Created By</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {profileData.map((row) => (
//               <TableRow key={row.profile_id}>
//                 <TableCell>
//                   <img
//                     className="rounded-full"
//                     src={No_Image_Available}
//                     alt="Profile"
//                     width={80}
//                   />
//                 </TableCell>
//                 <TableCell>{row.profile_id}</TableCell>
//                 <TableCell>{row.profile_name}</TableCell>
//                 <TableCell>{row.profile_dob}</TableCell>
//                 <TableCell>{row.profile_gender}</TableCell>
//                 <TableCell>{row.profile_state}</TableCell>
//                 <TableCell>{row.profile_city}</TableCell>
//                 <TableCell>{row.profile_mobile}</TableCell>
//                 <TableCell>{row.profile_planname}</TableCell>
//                 <TableCell>{row.profile_created_by || "N/A"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={totalRecords}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// };

// export default ReceivedCallActionProfiles;




// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import No_Image_Available from "../images/No_Image_Available.jpg";
// import { MdVerified } from "react-icons/md";
// import { GoUnverified } from "react-icons/go";

// const API_URL = "https://app.vysyamala.com/api/call_action_received/";

// interface ProfileType {
//   profile_id: string;
//   profile_name: string;
//   profile_dob: string;
//   profile_state: string;
//   profile_city: string;
//   profile_mobile: string;
//   profile_gender: string;
//   profile_planname: string;
//   profile_created_by: string | null;
// }

// const columns = [
//   { id: "profile_id", label: "Profile ID" },
//   { id: "profile_name", label: "Name" },
//   { id: "profile_dob", label: "Date of Birth" },
//   { id: "profile_gender", label: "Gender" },
//   { id: "profile_planname", label: "Plan Name" },
//   { id: "profile_city", label: "City" },
//   { id: "profile_state", label: "State" },
//   { id: "profile_mobile", label: "Mobile" },
//   { id: "profile_created_by", label: "Created By" },
// ];

// const CToCReceivedProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<ProfileType[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(5);
//   const [totalRecords, setTotalRecords] = useState<number>(0);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get("profileId");

//   // Fetch profiles from API
//   const getProfileListMatch = async (id: string | null, pageNumber: number, perPage: number) => {
//     try {
//       const response = await axios.get(API_URL, {
//         params: {
//           profile_id: id,
//           page: pageNumber + 1, // API expects 1-based index
//           per_page: perPage,
//         },
//       });

//       setProfileData(response.data.results);
//       setTotalRecords(response.data.count);
//     } catch (error) {
//       console.error("Error fetching profile details:", error);
//     }
//   };

//   // Fetch profiles when component mounts or pagination changes
//   useEffect(() => {
//     if (profileId) {
//       getProfileListMatch(profileId, page, rowsPerPage);
//     }
//   }, [profileId, page, rowsPerPage]);

//   // Handle page change
//   const handleChangePage = (_event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div>
//       <Typography
//         sx={{ marginBottom: "20px", color: "black", fontSize: "1.5rem", fontWeight: "bold" }}
//       >
//         C To C Received Lists For Profile ID: {profileId}
//       </Typography>

//       {profileData.length > 0 ? (
//         <>
//           <Paper className="w-full">
//             <TableContainer sx={{ border: "1px solid #E0E0E0" }} component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="profile table">
//                 <TableHead style={{ background: "#FFF9C9" }}>
//                   <TableRow>
//                     {columns.map((column) => (
//                       <TableCell
//                         sx={{ borderBottom: "1px solid #E0E0E0", color: "#ee3448", fontWeight: "bold", fontSize: "1rem" }}
//                         key={column.id}
//                       >
//                         {column.label}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {profileData.map((row) => (
//                     <TableRow key={row.profile_id}>
//                       <TableCell>{row.profile_id}</TableCell>
//                       <TableCell>{row.profile_name}</TableCell>
//                       <TableCell>{row.profile_dob}</TableCell>
//                       <TableCell>{row.profile_gender}</TableCell>
//                       <TableCell>{row.profile_planname}</TableCell>
//                       <TableCell>{row.profile_city}</TableCell>
//                       <TableCell>{row.profile_state}</TableCell>
//                       <TableCell>{row.profile_mobile}</TableCell>
//                       <TableCell>{row.profile_created_by || "N/A"}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={totalRecords}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </>
//       ) : (
//         <Typography sx={{ color: "black", fontSize: "1.2rem", fontWeight: "bold" }}>
//           No Matching Data
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default CToCReceivedProfile;




import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_URL = "https://app.vysyamala.com/api/call_action_received/";

interface ProfileType {
  profile_id: string;
  profile_name: string;
  profile_dob: string;
  profile_state: string;
  profile_city: string;
  profile_mobile: string;
  profile_gender: string;
  profile_planname: string;
  profile_created_by: string | null;
}

const columns = [
  { id: "profile_id", label: "Profile ID" },
  { id: "profile_name", label: "Name" },
  { id: "profile_dob", label: "Date of Birth" },
  { id: "profile_gender", label: "Gender" },
  { id: "profile_planname", label: "Plan Name" },
  { id: "profile_city", label: "City" },
  { id: "profile_state", label: "State" },
  { id: "profile_mobile", label: "Mobile" },
  { id: "profile_created_by", label: "Created By" },
];

const CToCReceivedProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get("profileId");

  // Fetch profiles from API
  const getProfileListMatch = async (id: string | null, pageNumber: number, pageSize: number) => {
    if (!id) return;
    
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: {
          profile_id: id,
          page: pageNumber + 1, // API expects a 1-based page index
          page_size: pageSize,
        },
      });

      setProfileData(response.data.results || []);
      setTotalRecords(response.data.count || 0);
    } catch (error) {
      console.error("Error fetching profile details:", error);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch profiles when component mounts or pagination changes
  useEffect(() => {
    if (profileId) {
      getProfileListMatch(profileId, page, rowsPerPage);
    }
  }, [profileId, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography sx={{ marginBottom: "20px", color: "black", fontSize: "1.5rem", fontWeight: "bold" }}>
        C To C Received Lists For Profile ID: {profileId}
      </Typography>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography sx={{ color: "red", fontSize: "1.2rem", fontWeight: "bold" }}>{error}</Typography>
      ) : profileData.length > 0 ? (
        <>
          <Paper className="w-full">
            <TableContainer sx={{ border: "1px solid #E0E0E0" }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="profile table">
                <TableHead style={{ background: "#FFF9C9" }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{ borderBottom: "1px solid #E0E0E0", color: "#ee3448", fontWeight: "bold", fontSize: "1rem" }}
                        key={column.id}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {profileData.map((row) => (
                    <TableRow key={row.profile_id}>
                      <TableCell>{row.profile_id}</TableCell>
                      <TableCell>{row.profile_name}</TableCell>
                      <TableCell>{new Date(row.profile_dob).toLocaleDateString()}</TableCell>
                      <TableCell>{row.profile_gender}</TableCell>
                      <TableCell>{row.profile_planname}</TableCell>
                      <TableCell>{row.profile_city}</TableCell>
                      <TableCell>{row.profile_state}</TableCell>
                      <TableCell>{row.profile_mobile}</TableCell>
                      <TableCell>{row.profile_created_by || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography sx={{ color: "black", fontSize: "1.2rem", fontWeight: "bold" }}>
          No Matching Data
        </Typography>
      )}
    </div>
  );
};

export default CToCReceivedProfile;
