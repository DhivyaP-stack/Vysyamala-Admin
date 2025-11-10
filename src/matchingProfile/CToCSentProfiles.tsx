
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


// const API_URL = "https://app.vysyamala.com/api/call_action_sent/";

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

// const CToCSentProfile: React.FC = () => {
//   const [profileData, setProfileData] = useState<ProfileType[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const [totalRecords, setTotalRecords] = useState<number>(0);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get("profileId");

//   // Fetch profiles from API
//   const getProfileListMatch = async (id: string | null, page: number, perPage: number) => {
//     try {
//       const response = await axios.get(API_URL, {
//         params: {
//           profile_id: id,
//           page: page + 1, // API expects 1-based index
//           per_size: perPage,
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
//             rowsPerPageOptions={[1,2,5, 10, 25]}
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

// export default CToCSentProfile;



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

const API_URL = "https://app.vysyamala.com/api/call_action_sent/";

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

const CToCSentProfile: React.FC = () => {
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

export default CToCSentProfile;
